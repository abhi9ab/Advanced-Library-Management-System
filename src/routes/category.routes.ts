import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { authenticateToken, isAdmin } from '../middlewares/auth';

const router = Router();

router.post('/', authenticateToken, isAdmin, CategoryController.create);
router.get('/', authenticateToken, CategoryController.getAll);

export default router;