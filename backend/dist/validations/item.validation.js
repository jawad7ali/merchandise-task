"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItemPayload = exports.addItemPayload = exports.editPayload = void 0;
const joi_1 = __importDefault(require("joi"));
exports.editPayload = {
    params: joi_1.default.object().keys({
        token: joi_1.default.string().required().min(1)
    })
};
exports.addItemPayload = {
    body: joi_1.default.object().keys({
        name: joi_1.default.string().required().min(1),
        price: joi_1.default.number().required().min(1),
    }),
};
exports.updateItemPayload = {
    body: joi_1.default.object().keys({
        name: joi_1.default.string().required().min(1),
        price: joi_1.default.number().required().min(1),
    }),
};
//# sourceMappingURL=item.validation.js.map