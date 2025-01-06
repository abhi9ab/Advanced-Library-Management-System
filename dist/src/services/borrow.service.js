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
exports.BorrowService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
class BorrowService {
    static borrowBook(userId, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Start a transaction
            return prisma_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                // Check borrowing limit
                const activeBorrowings = yield tx.borrowedBooks.count({
                    where: {
                        userId,
                        returnDate: null
                    }
                });
                if (activeBorrowings >= 3) {
                    throw new Error('Borrowing limit reached');
                }
                // Check book availability
                const book = yield tx.books.findUnique({
                    where: { id: bookId }
                });
                if (!book || book.copiesAvailable <= 0) {
                    throw new Error('Book not available');
                }
                // Create borrowed book record
                const dueDate = new Date();
                dueDate.setDate(dueDate.getDate() + 14);
                yield tx.books.update({
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
            }));
        });
    }
    static returnBook(borrowId) {
        return __awaiter(this, void 0, void 0, function* () {
            const borrowed = yield prisma_1.default.borrowedBooks.findUnique({
                where: { id: borrowId }
            });
            if (!borrowed) {
                throw new Error('Borrow record not found');
            }
            const today = new Date();
            const dueDate = new Date(borrowed.dueDate);
            let fine = 0;
            if (today > dueDate) {
                const days = Math.ceil((today.getTime() - dueDate.getTime()) / (1000 * 86400));
                fine = days * 1; // $1 per day
            }
            // Start a transaction
            return prisma_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                // Update book availability
                yield tx.books.update({
                    where: { id: borrowed.bookId },
                    data: {
                        copiesAvailable: {
                            increment: 1
                        }
                    }
                });
                // Update borrow record
                const returnedBook = yield tx.borrowedBooks.update({
                    where: { id: borrowId },
                    data: {
                        returnDate: today,
                        fine
                    }
                });
                // Create fine transaction if needed
                if (fine > 0) {
                    yield tx.transactions.create({
                        data: {
                            userId: borrowed.userId,
                            amount: fine,
                            type: 'FINE',
                            status: 'PENDING'
                        }
                    });
                }
                return returnedBook;
            }));
        });
    }
}
exports.BorrowService = BorrowService;
