"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = require("../controllers/book.controller");
const auth_1 = require("../middlewares/auth");
const redis_1 = require("../../config/redis");
const router = (0, express_1.Router)();
// Admin routes
router.post('/', auth_1.authenticateToken, auth_1.isAdmin, book_controller_1.createController);
router.put('/:id', auth_1.authenticateToken, auth_1.isAdmin, book_controller_1.updateController);
router.delete('/:id', auth_1.authenticateToken, auth_1.isAdmin, book_controller_1.softDeleteController);
router.patch('/:id/restore', auth_1.authenticateToken, auth_1.isAdmin, book_controller_1.restoreController);
// Member routes
router.get('/search', auth_1.authenticateToken, (0, redis_1.cacheMiddleware)('books:search', 1800), book_controller_1.searchController);
router.get('/:id', auth_1.authenticateToken, book_controller_1.getByIdController);
exports.default = router;
