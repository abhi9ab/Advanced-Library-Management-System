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
exports.restoreController = exports.softDeleteController = exports.searchController = exports.createController = void 0;
const book_service_1 = require("../services/book.service");
const validators_1 = require("../models/validators");
const createController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = validators_1.bookSchema.parse(req.body);
        const book = yield (0, book_service_1.create)(validatedData);
        res.status(201).json(book);
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to create book', error });
    }
});
exports.createController = createController;
const searchController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req.query;
        if (typeof query !== 'string') {
            throw new Error('Invalid query parameter');
        }
        const books = yield (0, book_service_1.search)(query);
        res.json(books);
    }
    catch (error) {
        res.status(400).json({ message: 'Search failed', error });
    }
});
exports.searchController = searchController;
const softDeleteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, book_service_1.softDelete)(id);
        res.status(200).json({ message: 'Book deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to delete book', error });
    }
});
exports.softDeleteController = softDeleteController;
const restoreController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const book = yield (0, book_service_1.restore)(id);
        res.status(200).json(book);
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to restore book', error });
    }
});
exports.restoreController = restoreController;
