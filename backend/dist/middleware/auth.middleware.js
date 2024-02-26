"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const { verify } = jsonwebtoken_1.default;
const isAuth = (req, res, next) => {
    const authHeader = req.headers?.authorization;
    if (!authHeader || !authHeader?.startsWith('Bearer ')) {
        return res.status(http_status_1.default.UNAUTHORIZED).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    if (!token)
        return res.status(http_status_1.default.UNAUTHORIZED).json({ message: 'Unauthorized' });
    verify(token, config_1.default.jwt.access_token.secret, (err, payload) => {
        if (err)
            return res.status(http_status_1.default.FORBIDDEN).json({ message: 'Forbidden' });
        req.payload = payload;
        next();
    });
};
exports.default = isAuth;
//# sourceMappingURL=auth.middleware.js.map