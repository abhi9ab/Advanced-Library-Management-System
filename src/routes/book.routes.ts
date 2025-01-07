import { Router } from 'express';
import { createController, searchController, softDeleteController, restoreController } from '../controllers/book.controller';
import { authenticateToken, isAdmin } from '../middlewares/auth';
import { cacheMiddleware } from '../../config/redis';

const router = Router();

router.post('/', authenticateToken, isAdmin, createController);
router.get('/search', authenticateToken, cacheMiddleware('books:search', 1800), searchController);
router.delete('/:id', authenticateToken, isAdmin, softDeleteController);
router.patch('/:id/restore', authenticateToken, isAdmin, restoreController);

export default router;