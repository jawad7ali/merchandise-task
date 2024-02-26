"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xssMiddleware = void 0;
const sanitize_util_1 = require("../utils/sanitize.util");
const xssMiddleware = (options) => {
    return (req, _res, next) => {
        req.body = (0, sanitize_util_1.sanitize)(req.body, options);
        req.query = (0, sanitize_util_1.sanitize)(req.query, options);
        req.params = (0, sanitize_util_1.sanitize)(req.params, options);
        next();
    };
};
exports.xssMiddleware = xssMiddleware;
//# sourceMappingURL=xss.middleware.js.map