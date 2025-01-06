import { Router } from 'express';
import { BookController } from '../controllers/book.controller';
import { authenticateToken, isAdmin } from '../middlewares/auth';
import { cacheMiddleware } from '../../config/redis';

const router = Router();

router.post('/', authenticateToken, isAdmin, BookController.create);
router.get('/search', authenticateToken, cacheMiddleware('books:search', 1800), BookController.search);
router.delete('/:id', authenticateToken, isAdmin, BookController.softDelete);
router.patch('/:id/restore', authenticateToken, isAdmin, BookController.restore);

export default router;