import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma'
import { JWTPayload } from '../models/types';

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JWTPayload;

    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
    return;
  }
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user?.role !== 'ADMIN') {
      res.status(403).json({ message: 'Admin access required' });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
    return;
  }
};

export const isEmailVerified = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: req.user?.userId }
    });

    if (!user?.isVerified) {
      return res.status(403).json({ message: 'Please verify your email first' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};