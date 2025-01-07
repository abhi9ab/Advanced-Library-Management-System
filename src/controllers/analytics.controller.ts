import { Request, Response } from 'express';
import { getMonthlyReport, getMostBorrowedBooks } from '../services/analytics.service';

export const getMostBorrowedBooksController = async (req: Request, res: Response) => {
  try {
    const { limit } = req.query;
    const books = await getMostBorrowedBooks(Number(limit) || 10);
    res.json(books);
  } catch (error) {
    res.status(400).json({ message: 'Failed to get analytics', error });
  }
};

export const getMonthlyReportController = async (req: Request, res: Response) => {
  try {
    const { year, month } = req.params;
    const report = await getMonthlyReport(
      Number(year),
      Number(month)
    );
    res.json(report);
  } catch (error) {
    res.status(400).json({ message: 'Failed to generate report', error });
  }
};
