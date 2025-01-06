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
}