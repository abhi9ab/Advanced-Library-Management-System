import { Router } from 'express';
import { BookController } from '../controllers/book.controller';
import { authenticateToken, isAdmin } from '../middlewares/auth';

const router = Router();

router.post('/', authenticateToken, isAdmin, BookController.create);
router.get('/search', authenticateToken, BookController.search);

export default router;