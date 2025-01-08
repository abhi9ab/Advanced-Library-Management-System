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
exports.getPendingTransactionsController = void 0;
const transaction_service_1 = require("../services/transaction.service");
const getPendingTransactionsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        const transactions = yield (0, transaction_service_1.getPendingTransactions)(userId);
        res.json(transactions);
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to get transactions', error });
    }
});
exports.getPendingTransactionsController = getPendingTransactionsController;
