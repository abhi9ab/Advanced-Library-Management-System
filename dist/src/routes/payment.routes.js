"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("../controllers/payment.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post('/pay/:transactionId', auth_1.authenticateToken, payment_controller_1.payFineController);
router.get('/invoice/:transactionId', auth_1.authenticateToken, payment_controller_1.getInvoiceController);
exports.default = router;
