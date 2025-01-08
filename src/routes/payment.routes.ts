import { Router } from 'express';
import { payFineController, getInvoiceController } from '../controllers/payment.controller';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

router.post('/pay/:transactionId', authenticateToken, payFineController);
router.get('/invoice/:transactionId', authenticateToken, getInvoiceController);

export default router;