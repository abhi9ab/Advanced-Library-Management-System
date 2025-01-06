import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticateToken, isAdmin } from '../middlewares/auth';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.delete('/users/:id', authenticateToken, isAdmin, AuthController.softDelete);
router.patch('/users/:id/restore', authenticateToken, isAdmin, AuthController.restore);

export default router;