"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const compressFilter = (req, res) => {
    if (req.headers['x-no-compression']) {
        return false;
    }
    return compression_1.default.filter(req, res);
};
exports.default = compressFilter;
//# sourceMappingURL=compressFilter.util.js.map