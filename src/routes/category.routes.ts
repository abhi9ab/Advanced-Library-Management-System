import { Router } from 'express';
import { createController, getAllController } from '../controllers/category.controller';
import { authenticateToken, isAdmin } from '../middlewares/auth';

const router = Router();

router.post('/', authenticateToken, isAdmin, createController);
router.get('/', authenticateToken, getAllController);

export default router;