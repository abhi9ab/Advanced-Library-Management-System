import { Request, Response } from 'express';
import { payFine, generateInvoice } from '../services/payment.service';

export const payFineController = async (req: Request, res: Response) => {
    try {
        const { transactionId } = req.params;
        const userId = req.user!.userId;
        const payment = await payFine(transactionId!, userId);
        res.json(payment);
    } catch (error) {
        res.status(400).json({ message: 'Payment failed', error });
    }
}

export const getInvoiceController = async (req: Request, res: Response) => {
    try {
      const { transactionId } = req.params;
      const userId = req.user!.userId;
      const invoice = await generateInvoice(transactionId!, userId);
      res.setHeader('Content-Type', 'text/html');
      res.send(invoice);
    } catch (error) {
      res.status(400).json({ message: 'Failed to generate invoice', error });
    }
  }