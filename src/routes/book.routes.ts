import { Router } from 'express';
import { createController, searchController, softDeleteController, restoreController, updateController, getByIdController } from '../controllers/book.controller';
import { authenticateToken, isAdmin } from '../middlewares/auth';
import { cacheMiddleware } from '../../config/redis';

const router = Router();

// Admin routes
router.post('/', authenticateToken, isAdmin, createController);
router.put('/:id', authenticateToken, isAdmin, updateController);
router.delete('/:id', authenticateToken, isAdmin, softDeleteController);
router.patch('/:id/restore', authenticateToken, isAdmin, restoreController);

// Member routes
router.get('/search', authenticateToken, cacheMiddleware('books:search', 1800), searchController);
router.get('/:id', authenticateToken, getByIdController);

export default router;