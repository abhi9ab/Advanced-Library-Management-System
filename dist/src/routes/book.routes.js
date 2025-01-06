"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = require("../controllers/book.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post('/', auth_1.authenticateToken, auth_1.isAdmin, book_controller_1.BookController.create);
router.get('/search', auth_1.authenticateToken, book_controller_1.BookController.search);
exports.default = router;
