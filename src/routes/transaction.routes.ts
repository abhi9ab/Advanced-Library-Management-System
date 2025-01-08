import { Router } from 'express';
import { getPendingTransactionsController } from '../controllers/transaction.controller';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

router.get('/pending', authenticateToken, getPendingTransactionsController);

export default router;