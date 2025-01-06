import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { userSchema, loginSchema } from '../models/validators';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const validatedData = userSchema.parse(req.body);
      const user = await AuthService.register(validatedData);
      res.status(201).json({
        message: 'Registration successful. Please verify your email.',
        user: { id: user.id, email: user.email, name: user.name }
      });
    } catch (error) {
      console.error('Registration Error:', error);
      res.status(400).json({ message: 'Registration failed', error: error instanceof Error ? error.message : error });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const validatedData = loginSchema.parse(req.body);
      const { token, user } = await AuthService.login(validatedData);
      res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
    } catch (error) {
      res.status(401).json({ message: 'Login failed', error });
    }
  }


  static async softDelete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await AuthService.softDelete(id);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Failed to delete user', error });
    }
  }

  static async restore(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await AuthService.restore(id);
      res.status(200).json({
        message: 'User restored successfully',
        user: { id: user.id, email: user.email, role: user.role }
      });
    } catch (error) {
      res.status(400).json({ message: 'Failed to restore user', error });
    }
  }
}