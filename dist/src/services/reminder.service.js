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
exports.scheduleReminders = exports.checkDueBooks = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const email_1 = require("../../config/email");
const node_schedule_1 = __importDefault(require("node-schedule"));
const checkDueBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dueBooks = yield prisma_1.default.borrowedBooks.findMany({
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
        yield email_1.transporter.sendMail({
            to: borrow.user.email,
            subject: 'Book Return Reminder',
            html: `
          <h2>Return Reminder</h2>
          <p>The book "${borrow.book.title}" is due ${borrow.dueDate < new Date() ? 'overdue' : 'tomorrow'}.</p>
        `
        });
    }
});
exports.checkDueBooks = checkDueBooks;
const scheduleReminders = () => __awaiter(void 0, void 0, void 0, function* () {
    // Run daily at 9 AM
    node_schedule_1.default.scheduleJob('0 9 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, exports.checkDueBooks)();
        }
        catch (error) {
            console.error('Reminder scheduling error:', error);
        }
    }));
});
exports.scheduleReminders = scheduleReminders;
