import { Request, Response } from 'express';
import { AnalyticsService } from '../services/analytics.service';

export class AnalyticsController {
  static async getMostBorrowedBooks(req: Request, res: Response) {
    try {
      const { limit } = req.query;
      const books = await AnalyticsService.getMostBorrowedBooks(Number(limit) || 10);
      res.json(books);
    } catch (error) {
      res.status(400).json({ message: 'Failed to get analytics', error });
    }
  }

  static async getMonthlyReport(req: Request, res: Response) {
    try {
      const { year, month } = req.params;
      const report = await AnalyticsService.getMonthlyReport(
        Number(year),
        Number(month)
      );
      res.json(report);
    } catch (error) {
      res.status(400).json({ message: 'Failed to generate report', error });
    }
  }
}