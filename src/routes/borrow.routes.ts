import { Router } from 'express';
import { BorrowController } from '../controllers/borrow.controller';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

router.post('/borrow', authenticateToken, BorrowController.borrowBook);
router.post('/return/:borrowId', authenticateToken, BorrowController.returnBook);

export default router;
