import { Router } from 'express';
import authRoutes from './auth.routes';
import bookRoutes from './book.routes';
import categoryRoutes from './category.routes';
import authorRoutes from './author.routes';
import borrowRoutes from './borrow.routes';
import analyticsRoutes from './analytics.routes';
import transactionsRoutes from './transaction.routes';
import paymentRoutes from './payment.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/books', bookRoutes);
router.use('/categories', categoryRoutes);
router.use('/authors', authorRoutes);
router.use('/borrow', borrowRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/transactions', transactionsRoutes);
router.use('/payments', paymentRoutes);

export default router;