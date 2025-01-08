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
exports.getAllController = exports.createController = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const zod_1 = require("zod");
const authorSchema = zod_1.z.object({
    name: zod_1.z.string().min(1)
});
const createController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = authorSchema.parse(req.body);
        const author = yield prisma_1.default.author.create({
            data: validatedData
        });
        res.status(201).json(author);
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to create author', error });
    }
});
exports.createController = createController;
const getAllController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authors = yield prisma_1.default.author.findMany();
        res.json(authors);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch authors', error });
    }
});
exports.getAllController = getAllController;
