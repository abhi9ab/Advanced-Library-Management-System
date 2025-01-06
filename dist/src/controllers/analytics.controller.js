"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsController = void 0;
const analytics_service_1 = require("../services/analytics.service");
class AnalyticsController {
    static getMostBorrowedBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit } = req.query;
                const books = yield analytics_service_1.AnalyticsService.getMostBorrowedBooks(Number(limit) || 10);
                res.json(books);
            }
            catch (error) {
                res.status(400).json({ message: 'Failed to get analytics', error });
            }
        });
    }
    static getMonthlyReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { year, month } = req.params;
                const report = yield analytics_service_1.AnalyticsService.getMonthlyReport(Number(year), Number(month));
                res.json(report);
            }
            catch (error) {
                res.status(400).json({ message: 'Failed to generate report', error });
            }
        });
    }
}
exports.AnalyticsController = AnalyticsController;
