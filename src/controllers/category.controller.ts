import { Request, Response } from 'express';
import prisma from '../../config/prisma';
import { z } from 'zod';

const categorySchema = z.object({
  name: z.string().min(1)
});

export const createController = async (req: Request, res: Response) => {
  try {
    const validatedData = categorySchema.parse(req.body);
    const category = await prisma.categories.create({
      data: validatedData
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create category', error });
  }
}

export const getAllController = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.categories.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories', error });
  }
}