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
exports.returnBookController = exports.borrowBookController = void 0;
const borrow_service_1 = require("../services/borrow.service");
const borrowBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.body;
        const userId = req.user.userId;
        const borrowedBook = yield (0, borrow_service_1.borrowBook)(userId, bookId);
        res.status(201).json(borrowedBook);
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to borrow book', error });
    }
});
exports.borrowBookController = borrowBookController;
const returnBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { borrowId } = req.params;
        const returnedBook = yield (0, borrow_service_1.returnBook)(borrowId);
        res.json(returnedBook);
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to return book', error });
    }
});
exports.returnBookController = returnBookController;
