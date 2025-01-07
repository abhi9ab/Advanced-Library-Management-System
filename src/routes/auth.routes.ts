import { Router } from 'express';
import { verifyEmailController, loginController, registerController, softDeleteController, restoreController } from '../controllers/auth.controller';
import { authenticateToken, isAdmin } from '../middlewares/auth';

const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/verify-email', verifyEmailController);
router.delete('/users/:id', authenticateToken, isAdmin, softDeleteController);
router.patch('/users/:id/restore', authenticateToken, isAdmin, restoreController);

export default router;