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
exports.CategoryController = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const zod_1 = require("zod");
const categorySchema = zod_1.z.object({
    name: zod_1.z.string().min(1)
});
class CategoryController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validatedData = categorySchema.parse(req.body);
                const category = yield prisma_1.default.categories.create({
                    data: validatedData
                });
                res.status(201).json(category);
            }
            catch (error) {
                res.status(400).json({ message: 'Failed to create category', error });
            }
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield prisma_1.default.categories.findMany();
                res.json(categories);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to fetch categories', error });
            }
        });
    }
}
exports.CategoryController = CategoryController;
