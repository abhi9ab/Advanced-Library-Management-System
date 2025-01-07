import { Router } from 'express';
import { getMostBorrowedBooksController, getMonthlyReportController } from '../controllers/analytics.controller';
import { authenticateToken, isAdmin } from '../middlewares/auth';

const router = Router();

router.get('/most-borrowed', authenticateToken, isAdmin, getMostBorrowedBooksController);
router.get('/monthly-report/:year/:month', authenticateToken, isAdmin, getMonthlyReportController);

export default router;