import prisma from '../../config/prisma';

export class BorrowService {
  static async borrowBook(userId: string, bookId: string) {
    return prisma.$transaction(async (tx) => {
      const activeBorrowings = await tx.borrowedBooks.count({
        where: {
          userId,
          returnDate: null
        }
      });

      if (activeBorrowings >= 3) {
        throw new Error('Borrowing limit reached');
      }

      const book = await tx.books.findUnique({
        where: { id: bookId }
      });

      if (!book || book.copiesAvailable <= 0) {
        throw new Error('Book not available');
      }

      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 14);

      await tx.books.update({
        where: { id: bookId },
        data: { copiesAvailable: book.copiesAvailable - 1 }
      });

      return tx.borrowedBooks.create({
        data: {
          userId,
          bookId,
          dueDate
        }
      });
    });
  }

  static async returnBook(borrowId: string) {
    const borrowed = await prisma.borrowedBooks.findUnique({
      where: { id: borrowId }
    });

    if (!borrowed) {
      throw new Error('Borrow record not found');
    }

    const today = new Date();
    const dueDate = new Date(borrowed.dueDate);
    let fine = 0;

    if (today > dueDate) {
      const days = Math.ceil(
        (today.getTime() - dueDate.getTime()) / (1000 * 86400)
    );
    fine = days * 1;
  }

  return prisma.$transaction(async (tx) => {
    await tx.books.update({
      where: { id: borrowed.bookId },
      data: {
        copiesAvailable: {
          increment: 1
        }
      }
    });

    const returnedBook = await tx.borrowedBooks.update({
      where: { id: borrowId },
      data: {
        returnDate: today,
        fine
      }
    });

    if (fine > 0) {
      await tx.transactions.create({
        data: {
          userId: borrowed.userId,
          amount: fine,
          type: 'FINE',
          status: 'PENDING'
        }
      });
    }

    return returnedBook;
  });
}
}