import { Request, Response, NextFunction } from 'express';
import { create, search, softDelete, restore, update, getById } from '../services/book.service';
import { bookSchema } from '../models/validators';

export const createController = async (req: Request, res: Response) => {
  try {
    const validatedData = bookSchema.parse(req.body);
    const book = await create(validatedData);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create book', error });
  }
}

export const searchController = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    if (typeof query !== 'string') {
      throw new Error('Invalid query parameter');
    }
    const books = await search(query);
    res.json(books);
  } catch (error) {
    res.status(400).json({ message: 'Search failed', error });
  }
}

export const updateController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = bookSchema.parse(req.body);
    const book = await update(id!, validatedData);
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update book', error });
  }
}

export const getByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const book = await getById(id!);
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch book', error });
  }
}

export const softDeleteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await softDelete(id!);
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete book', error });
  }
}

export const restoreController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const book = await restore(id!);
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ message: 'Failed to restore book', error });
  }
}
