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
exports.BookService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
class BookService {
    static create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.books.create({
                data: {
                    isbn: input.isbn,
                    title: input.title,
                    copiesAvailable: input.copiesAvailable,
                    totalCopies: input.totalCopies,
                    authors: {
                        create: input.authors.map(authorId => ({
                            author: { connect: { id: authorId } }
                        }))
                    },
                    categories: {
                        create: input.categories.map(categoryId => ({
                            category: { connect: { id: categoryId } }
                        }))
                    }
                },
                include: {
                    authors: {
                        include: { author: true }
                    },
                    categories: {
                        include: { category: true }
                    }
                }
            });
        });
    }
    static search(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.books.findMany({
                where: {
                    OR: [
                        { title: { contains: query, mode: 'insensitive' } },
                        { isbn: { contains: query } },
                        {
                            authors: {
                                some: {
                                    author: {
                                        name: { contains: query, mode: 'insensitive' }
                                    }
                                }
                            }
                        }
                    ],
                    deletedAt: null
                },
                include: {
                    authors: {
                        include: { author: true }
                    },
                    categories: {
                        include: { category: true }
                    }
                }
            });
        });
    }
    static softDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.books.update({
                where: { id },
                data: {
                    deletedAt: new Date(),
                    copiesAvailable: 0
                }
            });
        });
    }
    static restore(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield prisma_1.default.books.findUnique({
                where: { id }
            });
            return prisma_1.default.books.update({
                where: { id },
                data: {
                    deletedAt: null,
                    copiesAvailable: (book === null || book === void 0 ? void 0 : book.totalCopies) || 0
                }
            });
        });
    }
}
exports.BookService = BookService;
