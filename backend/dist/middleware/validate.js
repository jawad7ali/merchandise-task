"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const joi_1 = __importDefault(require("joi"));
const validate = (schema) => (req, res, next) => {
    const { error } = joi_1.default.object(schema).validate({
        body: req.body,
        query: req.query,
        params: req.params
    }, { abortEarly: false, stripUnknown: true });
    if (!error) {
        next();
    }
    else {
        const errors = error?.details.map((err) => ({
            field: err.path.join(', '),
            message: err.message
        }));
        res.status(http_status_1.default.BAD_REQUEST).json({ errors });
    }
};
exports.default = validate;
//# sourceMappingURL=validate.js.map