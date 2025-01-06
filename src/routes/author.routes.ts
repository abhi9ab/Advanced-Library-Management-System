import { Router } from 'express';
import { AuthorController } from '../controllers/author.controller';
import { authenticateToken, isAdmin } from '../middlewares/auth';

const router = Router();

router.post('/', authenticateToken, isAdmin, AuthorController.create);
router.get('/', authenticateToken, AuthorController.getAll);

export default router;