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
exports.restore = exports.softDelete = exports.getById = exports.update = exports.search = exports.create = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const create = (input) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.create = create;
const search = (query) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.search = search;
const update = (id, input) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.books.update({
        where: { id },
        data: {
            isbn: input.isbn,
            title: input.title,
            copiesAvailable: input.copiesAvailable,
            totalCopies: input.totalCopies,
            authors: {
                deleteMany: {},
                create: input.authors.map(authorId => ({
                    author: { connect: { id: authorId } }
                }))
            },
            categories: {
                deleteMany: {},
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
exports.update = update;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.books.findUnique({
        where: {
            id,
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
exports.getById = getById;
const softDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.books.update({
        where: { id },
        data: {
            deletedAt: new Date(),
            copiesAvailable: 0
        }
    });
});
exports.softDelete = softDelete;
const restore = (id) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.restore = restore;
