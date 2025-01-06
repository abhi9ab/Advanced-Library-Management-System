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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const validators_1 = require("../models/validators");
class AuthController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validatedData = validators_1.userSchema.parse(req.body);
                const user = yield auth_service_1.AuthService.register(validatedData);
                res.status(201).json({
                    message: 'Registration successful. Please verify your email.',
                    user: { id: user.id, email: user.email, name: user.name }
                });
            }
            catch (error) {
                res.status(400).json({ message: 'Registration failed', error });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validatedData = validators_1.loginSchema.parse(req.body);
                const { token, user } = yield auth_service_1.AuthService.login(validatedData);
                res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
            }
            catch (error) {
                res.status(401).json({ message: 'Login failed', error });
            }
        });
    }
}
exports.AuthController = AuthController;
