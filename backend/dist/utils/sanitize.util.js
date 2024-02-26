"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitize = void 0;
const xss_1 = __importDefault(require("xss"));
const sanitize = (data, options) => {
    if (!data) {
        return data;
    }
    if (Array.isArray(data)) {
        const sanitizedArray = data.map((item) => (0, exports.sanitize)(item, options));
        return sanitizedArray;
    }
    if (typeof data === 'object' && data !== null) {
        const sanitizedObject = {};
        for (const [key, value] of Object.entries(data)) {
            sanitizedObject[key] = (0, exports.sanitize)(value, options);
        }
        return sanitizedObject;
    }
    if (typeof data === 'string') {
        const xssOptions = {
            stripIgnoreTagBody: options?.stripIgnoreTagBody ?? false,
            whiteList: options?.whiteList ?? {},
            ...options
        };
        return (0, xss_1.default)(data, xssOptions);
    }
    return data;
};
exports.sanitize = sanitize;
//# sourceMappingURL=sanitize.util.js.map