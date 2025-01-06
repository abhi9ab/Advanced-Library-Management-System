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
exports.BorrowController = void 0;
const borrow_service_1 = require("../services/borrow.service");
class BorrowController {
    static borrowBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { bookId } = req.body;
                const userId = req.user.userId;
                const borrowedBook = yield borrow_service_1.BorrowService.borrowBook(userId, bookId);
                res.status(201).json(borrowedBook);
            }
            catch (error) {
                res.status(400).json({ message: 'Failed to borrow book', error });
            }
        });
    }
    static returnBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { borrowId } = req.params;
                const returnedBook = yield borrow_service_1.BorrowService.returnBook(borrowId);
                res.json(returnedBook);
            }
            catch (error) {
                res.status(400).json({ message: 'Failed to return book', error });
            }
        });
    }
}
exports.BorrowController = BorrowController;
