"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearRefreshTokenCookieConfig = exports.refreshTokenCookieConfig = void 0;
exports.refreshTokenCookieConfig = {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    maxAge: 24 * 60 * 60 * 1000
};
exports.clearRefreshTokenCookieConfig = {
    httpOnly: true,
    sameSite: 'none',
    secure: true
};
//# sourceMappingURL=cookieConfig.js.map