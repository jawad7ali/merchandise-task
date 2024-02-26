"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const winston_1 = require("winston");
const logger = (0, winston_1.createLogger)({
    level: config_1.default.node_env === 'production' ? 'info' : 'debug',
    format: winston_1.format.combine(winston_1.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }), winston_1.format.errors({ stack: true }), winston_1.format.splat(), winston_1.format.json(), winston_1.format.printf(({ timestamp, level, message, stack }) => {
        return `${timestamp} [${level.toUpperCase()}] ${message} ${stack ? `\n${stack}` : ''}`;
    })),
    transports: [
        new winston_1.transports.Console({
            stderrLevels: ['error']
        }),
        new winston_1.transports.File({
            filename: 'logs/error.log',
            level: 'error'
        }),
        new winston_1.transports.File({ filename: 'logs/combined.log' })
    ]
});
exports.default = logger;
//# sourceMappingURL=logger.middleware.js.map