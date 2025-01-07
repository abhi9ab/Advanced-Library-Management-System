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
exports.restore = exports.softDelete = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../../config/prisma"));
const email_1 = require("../../config/email");
const register = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcryptjs_1.default.hash(input.password, 10);
    const user = yield prisma_1.default.users.create({
        data: Object.assign(Object.assign({}, input), { password: hashedPassword, role: 'ADMIN' })
    });
    yield (0, email_1.sendVerificationEmail)(user.email);
    return user;
});
exports.register = register;
const login = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.users.findUnique({
        where: { email: input.email }
    });
    if (!user || !user.isActive) {
        throw new Error('Invalid credentials');
    }
    const validPassword = yield bcryptjs_1.default.compare(input.password, user.password);
    if (!validPassword) {
        throw new Error('Invalid credentials');
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return { token, user };
});
exports.login = login;
const softDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.users.update({
        where: { id },
        data: {
            deletedAt: new Date(),
            isActive: false
        }
    });
});
exports.softDelete = softDelete;
const restore = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.users.update({
        where: { id },
        data: {
            deletedAt: null,
            isActive: true
        }
    });
});
exports.restore = restore;
