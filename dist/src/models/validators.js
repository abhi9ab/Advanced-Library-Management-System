"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.bookSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string().min(2)
});
exports.bookSchema = zod_1.z.object({
    isbn: zod_1.z.string().min(10),
    title: zod_1.z.string().min(1),
    copiesAvailable: zod_1.z.number().min(0),
    totalCopies: zod_1.z.number().min(1),
    authors: zod_1.z.array(zod_1.z.string().uuid()),
    categories: zod_1.z.array(zod_1.z.string().uuid())
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
