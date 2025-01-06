import { Request, Response, NextFunction } from 'express';
import { BookService } from '../services/book.service';
import { bookSchema } from '../models/validators';

export class BookController {
  static async create(req: Request, res: Response) {
    try {
      const validatedData = bookSchema.parse(req.body);
      const book = await BookService.create(validatedData);
      res.status(201).json(book);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create book', error });
    }
  }

  static async search(req: Request, res: Response) {
    try {
      const { query } = req.query;
      if (typeof query !== 'string') {
        throw new Error('Invalid query parameter');
      }
      const books = await BookService.search(query);
      res.json(books);
    } catch (error) {
      res.status(400).json({ message: 'Search failed', error });
    }
  }

  static async softDelete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await BookService.softDelete(id);
      res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Failed to delete book', error });
    }
  }

  static async restore(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const book = await BookService.restore(id);
      res.status(200).json(book);
    } catch (error) {
      res.status(400).json({ message: 'Failed to restore book', error });
    }
  }
}