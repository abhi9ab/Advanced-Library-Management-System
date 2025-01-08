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
exports.getInvoiceController = exports.payFineController = void 0;
const payment_service_1 = require("../services/payment.service");
const payFineController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { transactionId } = req.params;
        const userId = req.user.userId;
        const payment = yield (0, payment_service_1.payFine)(transactionId, userId);
        res.json(payment);
    }
    catch (error) {
        res.status(400).json({ message: 'Payment failed', error });
    }
});
exports.payFineController = payFineController;
const getInvoiceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { transactionId } = req.params;
        const userId = req.user.userId;
        const invoice = yield (0, payment_service_1.generateInvoice)(transactionId, userId);
        res.setHeader('Content-Type', 'text/html');
        res.send(invoice);
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to generate invoice', error });
    }
});
exports.getInvoiceController = getInvoiceController;
