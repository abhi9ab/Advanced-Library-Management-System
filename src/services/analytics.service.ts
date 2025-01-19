import prisma from '../config/prisma';

export const getMostBorrowedBooks = async (limit = 10) => {
  return prisma.books.findMany({
    take: limit,
    where: {
      borrowedBooks: {
        some: {}
      }
    },
    include: {
      _count: {
        select: {
          borrowedBooks: true
        }
      },
      authors: {
        include: {
          author: true
        }
      }
    },
    orderBy: {
      borrowedBooks: {
        _count: 'desc'
      }
    }
  });
}

export const getMonthlyReport = async (year: number, month: number) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  const [borrowings, returns, fines, payments] = await Promise.all([
    prisma.borrowedBooks.count({
      where: {
        borrowDate: {
          gte: startDate,
          lte: endDate
        }
      }
    }),
    prisma.borrowedBooks.count({
      where: {
        returnDate: {
          gte: startDate,
          lte: endDate
        }
      }
    }),
    prisma.transactions.aggregate({
      where: {
        type: 'FINE',
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      },
      _sum: {
        amount: true
      }
    }),
    prisma.transactions.aggregate({
      where: {
        type: 'PAYMENT',
        status: 'COMPLETED',
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      },
      _sum: {
        amount: true
      }
    })
  ]);

  return {
    year,
    month,
    totalBorrowings: borrowings,
    totalReturns: returns,
    totalFines: fines._sum.amount || 0,
    totalPayments: payments._sum.amount || 0
  };
}