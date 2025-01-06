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
      res.status(400).json({ message: 'Registration failed', error });
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
}