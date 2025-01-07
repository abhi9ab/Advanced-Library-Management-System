import { Router } from 'express';
import { getAllController, createController } from '../controllers/author.controller';
import { authenticateToken, isAdmin } from '../middlewares/auth';

const router = Router();

router.post('/', authenticateToken, isAdmin, createController);
router.get('/', authenticateToken, getAllController);

export default router;