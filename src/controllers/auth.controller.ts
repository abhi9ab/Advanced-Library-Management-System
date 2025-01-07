import { Request, Response } from 'express';
import { login, register, softDelete, restore, verifyEmail } from '../services/auth.service';
import { userSchema, loginSchema } from '../models/validators';

export const verifyEmailController = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;
    if (!token || typeof token !== 'string') {
      res.status(400).json({ message: 'Invalid verification token' });
      return;
    }

    const user = await verifyEmail(token);
    res.status(200).json({
      message: 'Email verified successfully',
      user: { id: user.id, email: user.email }
    });
  } catch (error) {
    res.status(400).json({ message: 'Email verification failed', error });
  }
};

export const registerController = async (req: Request, res: Response) => {
  try {
    const validatedData = userSchema.parse(req.body);
    const user = await register(validatedData);
    res.status(201).json({
      message: 'Registration successful. Please verify your email.',
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(400).json({ message: 'Registration failed', error: error instanceof Error ? error.message : error });
  }
}

export const loginController = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { token, user } = await login(validatedData);
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    res.status(401).json({ message: 'Login failed', error });
  }
}


export const softDeleteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await softDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete user', error });
  }
}

export const restoreController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await restore(id);
    res.status(200).json({
      message: 'User restored successfully',
      user: { id: user.id, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(400).json({ message: 'Failed to restore user', error });
  }
}
