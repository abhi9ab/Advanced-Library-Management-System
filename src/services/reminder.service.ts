import prisma from '../config/prisma';
import { transporter } from '../config/email';
import schedule from 'node-schedule';

export const checkDueBooks = async () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dueBooks = await prisma.borrowedBooks.findMany({
    where: {
      dueDate: {
        lte: tomorrow
      },
      returnDate: null
    },
    include: {
      user: true,
      book: true
    }
  });

  for (const borrow of dueBooks) {
    await transporter.sendMail({
      to: borrow.user.email,
      subject: 'Book Return Reminder',
      html: `
          <h2>Return Reminder</h2>
          <p>The book "${borrow.book.title}" is due ${borrow.dueDate < new Date() ? 'overdue' : 'tomorrow'
        }.</p>
        `
    });
  }
}

export const scheduleReminders = async () => {
  // Run daily at 9 AM
  schedule.scheduleJob('0 9 * * *', async () => {
    try {
      await checkDueBooks();
    } catch (error) {
      console.error('Reminder scheduling error:', error);
    }
  });
}
