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
exports.cacheMiddleware = exports.redisClient = void 0;
const redis_1 = require("redis");
exports.redisClient = (0, redis_1.createClient)({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});
exports.redisClient.connect().catch(console.error);
const cacheMiddleware = (key, expiresIn = 3600) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const cached = yield exports.redisClient.get(key);
            if (cached) {
                return res.json(JSON.parse(cached));
            }
            res.originalJson = res.json;
            res.json = (data) => __awaiter(void 0, void 0, void 0, function* () {
                yield exports.redisClient.setEx(key, expiresIn, JSON.stringify(data));
                res.originalJson(data);
            });
            next();
        }
        catch (error) {
            next();
        }
    });
};
exports.cacheMiddleware = cacheMiddleware;
