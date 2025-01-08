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
exports.generateInvoice = exports.payFine = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const payFine = (transactionId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield prisma_1.default.transactions.findUnique({
        where: { id: transactionId }
    });
    if (!transaction || transaction.userId !== userId) {
        throw new Error('Transaction not found');
    }
    if (transaction.status === 'COMPLETED') {
        throw new Error('Transaction already paid');
    }
    return prisma_1.default.transactions.update({
        where: { id: transactionId },
        data: { status: 'COMPLETED' }
    });
});
exports.payFine = payFine;
const generateInvoice = (transactionId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield prisma_1.default.transactions.findUnique({
        where: { id: transactionId },
        include: {
            user: true
        }
    });
    if (!transaction || transaction.userId !== userId) {
        throw new Error('Transaction not found');
    }
    const date = transaction.createdAt.toLocaleDateString();
    const amount = transaction.amount.toFixed(2);
    const status = transaction.status.toLowerCase();
    const statusColor = status === 'completed' ? 'green' : 'red';
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .invoice-header {
          text-align: center;
          margin-bottom: 30px;
        }
        .invoice-details {
          margin-bottom: 30px;
        }
        .status {
          color: ${statusColor};
          text-transform: uppercase;
          font-weight: bold;
        }
        .amount {
          font-size: 24px;
          font-weight: bold;
          margin: 20px 0;
        }
        .footer {
          margin-top: 50px;
          text-align: center;
          font-size: 14px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="invoice-header">
        <h1>Library Fine Invoice</h1>
      </div>
      
      <div class="invoice-details">
        <p><strong>Invoice ID:</strong> ${transaction.id}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>User:</strong> ${transaction.user.name}</p>
        <p><strong>Email:</strong> ${transaction.user.email}</p>
        <p class="amount">Amount Due: $${amount}</p>
        <p><strong>Status:</strong> <span class="status">${status}</span></p>
      </div>
      
      <div class="footer">
        <p>Thank you for using our library services.</p>
        <p>Please pay any outstanding fines to continue borrowing books.</p>
      </div>
    </body>
    </html>
  `;
});
exports.generateInvoice = generateInvoice;
