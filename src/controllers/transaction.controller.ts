import { Request, Response } from 'express';
import { getPendingTransactions } from '../services/transaction.service';

export const getPendingTransactionsController = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const transactions = await getPendingTransactions(userId);
    res.json(transactions);
  } catch (error) {
    res.status(400).json({ message: 'Failed to get transactions', error });
  }
};