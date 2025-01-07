"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const borrow_controller_1 = require("../controllers/borrow.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post('/borrow', auth_1.authenticateToken, borrow_controller_1.borrowBookController);
router.post('/return/:borrowId', auth_1.authenticateToken, borrow_controller_1.returnBookController);
exports.default = router;
