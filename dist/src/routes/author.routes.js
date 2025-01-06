"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const author_controller_1 = require("../controllers/author.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post('/', auth_1.authenticateToken, auth_1.isAdmin, author_controller_1.AuthorController.create);
router.get('/', auth_1.authenticateToken, author_controller_1.AuthorController.getAll);
exports.default = router;
