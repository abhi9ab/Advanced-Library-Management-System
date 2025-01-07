import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import prisma from './prisma';

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendVerificationEmail = async (email: string, userId: string) => {

  const verificationToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET!,
    { expiresIn: '24h' }
  );

  const verificationLink = `http://localhost:${process.env.PORT}/verify-email?token=${verificationToken}`;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Verify your email',
      html: `
        <h1>Welcome to the Library Management System</h1>
        <p>Please click the link below to verify your email:</p>
        <a href="${verificationLink}">Verify Email</a>
        <p>This link will expire in 24 hours.</p>
      `
    });

    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
};