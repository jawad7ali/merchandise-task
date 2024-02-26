"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefreshToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const { sign } = jsonwebtoken_1.default;
const createAccessToken = (userId) => {
    return sign({ userID: userId }, config_1.default.jwt.access_token.secret, {
        expiresIn: config_1.default.jwt.access_token.expire
    });
};
exports.createAccessToken = createAccessToken;
const createRefreshToken = (userId) => {
    return sign({ userId }, config_1.default.jwt.refresh_token.secret, {
        expiresIn: config_1.default.jwt.refresh_token.expire
    });
};
exports.createRefreshToken = createRefreshToken;
//# sourceMappingURL=generateTokens.util.js.map