import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';
import { UserInput, LoginInput } from '../models/types';
import { sendVerificationEmail } from '../config/email';

export const verifyEmail = async (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

    const user = await prisma.users.findUnique({
      where: { id: decoded.userId }
    });

    if (!user || user.isVerified) {
      throw new Error('Invalid verification token or email already verified');
    }

    return prisma.users.update({
      where: { id: decoded.userId },
      data: { isVerified: true }
    });
  } catch (error) {
    throw new Error('Email verification failed');
  }
};

export const register = async (input: UserInput) => {
  const hashedPassword = await bcrypt.hash(input.password, 10);

  const user = await prisma.users.create({
    data: {
      ...input,
      password: hashedPassword,
      role: 'ADMIN'
    }
  });

  await sendVerificationEmail(user.email, user.id);

  return user;
}

export const login = async (input: LoginInput) => {
  const user = await prisma.users.findUnique({
    where: { email: input.email }
  });

  if (!user || !user.isActive) {
    throw new Error('Invalid credentials');
  }

  const validPassword = await bcrypt.compare(input.password, user.password);
  if (!validPassword) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '1d' }
  );

  return { token, user };
}

export const softDelete = async (id: string) => {
  return prisma.users.update({
    where: { id },
    data: {
      deletedAt: new Date(),
      isActive: false
    }
  });
}

export const restore = async (id: string) => {
  return prisma.users.update({
    where: { id },
    data: {
      deletedAt: null,
      isActive: true
    }
  });
}
