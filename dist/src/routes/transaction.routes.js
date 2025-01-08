"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_controller_1 = require("../controllers/transaction.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.get('/pending', auth_1.authenticateToken, transaction_controller_1.getPendingTransactionsController);
exports.default = router;
