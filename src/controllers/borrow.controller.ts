import { Request, Response } from 'express';
import { borrowBook, returnBook } from '../services/borrow.service';

export const borrowBookController = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.body;
    const userId = req.user!.userId;
    const borrowedBook = await borrowBook(userId, bookId);
    res.status(201).json(borrowedBook);
  } catch (error) {
    res.status(400).json({ message: 'Failed to borrow book', error });
  }
}

export const returnBookController = async (req: Request, res: Response) => {
  try {
    const { borrowId } = req.params;
    const returnedBook = await returnBook(borrowId);
    res.json(returnedBook);
  } catch (error) {
    res.status(400).json({ message: 'Failed to return book', error });
  }
}