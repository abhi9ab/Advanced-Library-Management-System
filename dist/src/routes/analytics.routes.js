"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analytics_controller_1 = require("../controllers/analytics.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.get('/most-borrowed', auth_1.authenticateToken, auth_1.isAdmin, analytics_controller_1.AnalyticsController.getMostBorrowedBooks);
router.get('/monthly-report/:year/:month', auth_1.authenticateToken, auth_1.isAdmin, analytics_controller_1.AnalyticsController.getMonthlyReport);
exports.default = router;
