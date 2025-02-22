import prisma from '../config/prisma';
import { BookInput } from '../models/types';

export const create = async (input: BookInput) => {
  return prisma.books.create({
    data: {
      isbn: input.isbn,
      title: input.title,
      copiesAvailable: input.copiesAvailable,
      totalCopies: input.totalCopies,
      authors: {
        create: input.authors.map(authorId => ({
          author: { connect: { id: authorId } }
        }))
      },
      categories: {
        create: input.categories.map(categoryId => ({
          category: { connect: { id: categoryId } }
        }))
      }
    },
    include: {
      authors: {
        include: { author: true }
      },
      categories: {
        include: { category: true }
      }
    }
  });
}

export const search = async (query: string) => {
  return prisma.books.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { isbn: { contains: query } },
        {
          authors: {
            some: {
              author: {
                name: { contains: query, mode: 'insensitive' }
              }
            }
          }
        }
      ],
      deletedAt: null
    },
    include: {
      authors: {
        include: { author: true }
      },
      categories: {
        include: { category: true }
      }
    }
  });
}

export const update = async (id: string, input: BookInput) => {
  return prisma.books.update({
    where: { id },
    data: {
      isbn: input.isbn,
      title: input.title,
      copiesAvailable: input.copiesAvailable,
      totalCopies: input.totalCopies,
      authors: {
        deleteMany: {},
        create: input.authors.map(authorId => ({
          author: { connect: { id: authorId } }
        }))
      },
      categories: {
        deleteMany: {},
        create: input.categories.map(categoryId => ({
          category: { connect: { id: categoryId } }
        }))
      }
    },
    include: {
      authors: {
        include: { author: true }
      },
      categories: {
        include: { category: true }
      }
    }
  });
}

export const getById = async (id: string) => {
  return prisma.books.findUnique({
    where: {
      id,
      deletedAt: null
    },
    include: {
      authors: {
        include: { author: true }
      },
      categories: {
        include: { category: true }
      }
    }
  });
}

export const softDelete = async (id: string) => {
  return prisma.books.update({
    where: { id },
    data: {
      deletedAt: new Date(),
      copiesAvailable: 0
    }
  });
}

export const restore = async (id: string) => {
  const book = await prisma.books.findUnique({
    where: { id }
  });

  return prisma.books.update({
    where: { id },
    data: {
      deletedAt: null,
      copiesAvailable: book?.totalCopies || 0
    }
  });
}

