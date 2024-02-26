"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.signUp = exports.login = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config/config"));
const generateTokens_util_1 = require("../utils/generateTokens.util");
const cookieConfig_1 = require("../config/cookieConfig");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { verify } = jsonwebtoken_1.default;
const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(http_status_1.default.BAD_REQUEST).json({ message: 'Username and password are required!' });
    }
    try {
        const user = await (0, user_model_1.findUserByUsername)(username);
        if (!user) {
            return res.status(http_status_1.default.UNAUTHORIZED).json({ message: 'User not found!' });
        }
        const userId = parseInt(user.id.toString());
        const passwordMatch = await bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(http_status_1.default.UNAUTHORIZED).json({ message: 'Invalid password!' });
        }
        const accessToken = (0, generateTokens_util_1.createAccessToken)(userId);
        const refreshToken = (0, generateTokens_util_1.createRefreshToken)(userId);
        res.cookie(config_1.default.jwt.refresh_token.cookie_name, refreshToken, { httpOnly: true, sameSite: 'strict' });
        console.log({ accessToken, message: 'Login successful' });
        return res.json({
            data: {
                accessToken
            },
            message: 'Login successful'
        });
    }
    catch (error) {
        console.error(error);
        return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred during login.' });
    }
};
exports.login = login;
const signUp = async (req, res) => {
    const { fullName, username, password } = req.body;
    if (!username || !password || !fullName) {
        return res
            .status(http_status_1.default.BAD_REQUEST)
            .json({ message: 'User name, full name and password are required!' });
    }
    const checkUserName = await (0, user_model_1.findUserByUsername)(username);
    if (checkUserName)
        return res
            .status(http_status_1.default.CONFLICT)
            .json({ message: 'Username is already in use!' });
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        await (0, user_model_1.addUser)({
            id: Math.floor(Math.random() * 1000),
            fullName,
            username,
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        res.status(http_status_1.default.CREATED).json({ message: 'New user created' });
    }
    catch (err) {
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR);
    }
};
exports.signUp = signUp;
const refreshToken = async (req, res) => {
    const refreshToken = req.cookies[config_1.default.jwt.refresh_token.cookie_name];
    if (!refreshToken)
        return res.status(http_status_1.default.UNAUTHORIZED)
            .json({ message: 'No refresh token found' });
    res.clearCookie(config_1.default.jwt.refresh_token.cookie_name, cookieConfig_1.clearRefreshTokenCookieConfig);
    verify(refreshToken, config_1.default.jwt.refresh_token.secret, async (err, payload) => {
        if (err) {
            return res.sendStatus(http_status_1.default.FORBIDDEN);
        }
        const userId = parseInt(payload.userId.toString());
        const accessToken = (0, generateTokens_util_1.createAccessToken)(userId);
        const newRefreshToken = (0, generateTokens_util_1.createRefreshToken)(userId);
        res.cookie(config_1.default.jwt.refresh_token.cookie_name, newRefreshToken, cookieConfig_1.refreshTokenCookieConfig);
        return res.json({ accessToken });
    });
};
exports.refreshToken = refreshToken;
//# sourceMappingURL=user.controller.js.map