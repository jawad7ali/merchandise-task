"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const v1_1 = require("./routes/v1");
const auth_middleware_1 = __importDefault(require("./middleware/auth.middleware"));
const errorHandler_middleware_1 = require("./middleware/errorHandler.middleware");
const config_1 = __importDefault(require("./config/config"));
const authLimiter_middleware_1 = __importDefault(require("./middleware/authLimiter.middleware"));
const xss_middleware_1 = require("./middleware/xss.middleware");
const path_1 = __importDefault(require("path"));
const compressFilter_util_1 = __importDefault(require("./utils/compressFilter.util"));
const logger_middleware_1 = __importDefault(require("./middleware/logger.middleware"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, xss_middleware_1.xssMiddleware)());
app.use((0, cookie_parser_1.default)());
app.use((0, compression_1.default)({ filter: compressFilter_util_1.default }));
app.use((0, cors_1.default)({
    origin: String(config_1.default.cors.cors_origin).split('|'),
    credentials: true
}));
if (config_1.default.node_env === 'production') {
    app.use('/api/v1/auth', authLimiter_middleware_1.default);
}
app.use('/api/v1/auth', v1_1.userRoutes);
app.use('/api/v1/items', auth_middleware_1.default, v1_1.itemRoutes);
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path_1.default.join(__dirname, 'views', '404.html'));
    }
    else if (req.accepts('json')) {
        res.json({ error: '404 Not Found' });
    }
    else {
        res.type('txt').send('404 Not Found');
    }
});
app.use(errorHandler_middleware_1.errorHandler);
app.listen(Number(config_1.default.server.port), () => {
    logger_middleware_1.default.log('info', `Server is running on Port: ${config_1.default.server.port}`);
});
//# sourceMappingURL=index.js.map