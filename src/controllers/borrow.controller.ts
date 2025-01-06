import { Request, Response } from 'express';
import { BorrowService } from '../services/borrow.service';

export class BorrowController {
  static async borrowBook(req: Request, res: Response) {
    try {
      const { bookId } = req.body;
      const userId = req.user!.userId;
      const borrowedBook = await BorrowService.borrowBook(userId, bookId);
      res.status(201).json(borrowedBook);
    } catch (error) {
      res.status(400).json({ message: 'Failed to borrow book', error });
    }
  }

  static async returnBook(req: Request, res: Response) {
    try {
      const { borrowId } = req.params;
      const returnedBook = await BorrowService.returnBook(borrowId);
      res.json(returnedBook);
    } catch (error) {
      res.status(400).json({ message: 'Failed to return book', error });
    }
  }
}