"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});
const sendVerificationEmail = (email, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const verificationToken = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
    const verificationLink = `http://localhost:${process.env.PORT}/verify-email?token=${verificationToken}`;
    try {
        yield exports.transporter.sendMail({
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
    }
    catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Failed to send verification email');
    }
});
exports.sendVerificationEmail = sendVerificationEmail;
