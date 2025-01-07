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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonthlyReport = exports.getMostBorrowedBooks = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const getMostBorrowedBooks = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (limit = 10) {
    return prisma_1.default.books.findMany({
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
});
exports.getMostBorrowedBooks = getMostBorrowedBooks;
const getMonthlyReport = (year, month) => __awaiter(void 0, void 0, void 0, function* () {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const [borrowings, returns, fines, payments] = yield Promise.all([
        prisma_1.default.borrowedBooks.count({
            where: {
                borrowDate: {
                    gte: startDate,
                    lte: endDate
                }
            }
        }),
        prisma_1.default.borrowedBooks.count({
            where: {
                returnDate: {
                    gte: startDate,
                    lte: endDate
                }
            }
        }),
        prisma_1.default.transactions.aggregate({
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
        prisma_1.default.transactions.aggregate({
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
});
exports.getMonthlyReport = getMonthlyReport;
