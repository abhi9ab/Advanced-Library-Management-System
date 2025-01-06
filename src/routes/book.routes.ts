import { Router } from 'express';
import { BookController } from '../controllers/book.controller';
import { authenticateToken, isAdmin } from '../middlewares/auth';

const router = Router();

router.post('/', authenticateToken, isAdmin, BookController.create);
router.get('/search', authenticateToken, BookController.search);
router.delete('/:id', authenticateToken, isAdmin, BookController.softDelete);
router.patch('/:id/restore', authenticateToken, isAdmin, BookController.restore);

export default router;