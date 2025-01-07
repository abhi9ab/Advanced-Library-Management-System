import { Request, Response } from 'express';
import prisma from '../../config/prisma';
import { z } from 'zod';

const authorSchema = z.object({
  name: z.string().min(1)
});

export const createController = async (req: Request, res: Response) => {
  try {
    const validatedData = authorSchema.parse(req.body);
    const author = await prisma.author.create({
      data: validatedData
    });
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create author', error });
  }
}

export const getAllController = async (req: Request, res: Response) => {
  try {
    const authors = await prisma.author.findMany();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch authors', error });
  }
}
