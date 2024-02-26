"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = require("express-rate-limit");
const authLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    max: 20,
    skipSuccessfulRequests: true
});
exports.default = authLimiter;
//# sourceMappingURL=authLimiter.middleware.js.map