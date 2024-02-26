"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.signupSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signupSchema = {
    body: joi_1.default.object().keys({
        fullName: joi_1.default.string().required().min(2),
        password: joi_1.default.string().required().min(6),
        username: joi_1.default.string().required().min(2)
    })
};
exports.loginSchema = {
    body: joi_1.default.object().keys({
        username: joi_1.default.string().required().min(2),
        password: joi_1.default.string().required()
    })
};
//# sourceMappingURL=auth.validation.js.map