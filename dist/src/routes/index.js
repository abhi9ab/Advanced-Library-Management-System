"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const book_routes_1 = __importDefault(require("./book.routes"));
const category_routes_1 = __importDefault(require("./category.routes"));
const author_routes_1 = __importDefault(require("./author.routes"));
const borrow_routes_1 = __importDefault(require("./borrow.routes"));
const analytics_routes_1 = __importDefault(require("./analytics.routes"));
const router = (0, express_1.Router)();
router.use('/auth', auth_routes_1.default);
router.use('/books', book_routes_1.default);
router.use('/categories', category_routes_1.default);
router.use('/authors', author_routes_1.default);
router.use('/borrow', borrow_routes_1.default);
router.use('/analytics', analytics_routes_1.default);
exports.default = router;
