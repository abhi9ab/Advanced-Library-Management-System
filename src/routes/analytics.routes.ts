import { Router } from 'express';
import { AnalyticsController } from '../controllers/analytics.controller';
import { authenticateToken, isAdmin } from '../middlewares/auth';

const router = Router();

router.get('/most-borrowed', authenticateToken, isAdmin, AnalyticsController.getMostBorrowedBooks);
router.get('/monthly-report/:year/:month', authenticateToken, isAdmin, AnalyticsController.getMonthlyReport);

export default router;