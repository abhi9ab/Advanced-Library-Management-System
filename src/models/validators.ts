import { z } from 'zod';

export const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(2)
});

export const bookSchema = z.object({
    isbn: z.string().min(10),
    title: z.string().min(1),
    copiesAvailable: z.number().min(0),
    totalCopies: z.number().min(1),
    authors: z.array(z.string().uuid()),
    categories: z.array(z.string().uuid())
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
});