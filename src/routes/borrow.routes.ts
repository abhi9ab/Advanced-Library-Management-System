import { Router } from 'express';
import { borrowBookController, returnBookController } from '../controllers/borrow.controller';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

router.post('/borrow', authenticateToken, borrowBookController);
router.post('/return/:borrowId', authenticateToken, returnBookController);

export default router;
