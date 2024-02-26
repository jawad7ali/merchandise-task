"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
const joi_1 = __importDefault(require("joi"));
dotenv.config({
    path: path_1.default.resolve(__dirname, '../../.env')
});
const envSchema = joi_1.default.object().keys({
    NODE_ENV: joi_1.default.string().valid('production', 'development', 'test').required(),
    PORT: joi_1.default.string().required().default('4000'),
    SERVER_URL: joi_1.default.string().required(),
    CORS_ORIGIN: joi_1.default.string().required().default('*'),
    ACCESS_TOKEN_SECRET: joi_1.default.string().min(8).required(),
    ACCESS_TOKEN_EXPIRE: joi_1.default.string().required().default('20m'),
    REFRESH_TOKEN_SECRET: joi_1.default.string().min(8).required(),
    REFRESH_TOKEN_EXPIRE: joi_1.default.string().required().default('1d'),
    REFRESH_TOKEN_COOKIE_NAME: joi_1.default.string().required().default('jid'),
});
const { value: validatedEnv, error } = envSchema
    .prefs({ errors: { label: 'key' } })
    .validate(process.env, { abortEarly: false, stripUnknown: true });
if (error) {
    throw new Error(`Environment variable validation error: \n${error.details
        .map((detail) => detail.message)
        .join('\n')}`);
}
const config = {
    node_env: validatedEnv.NODE_ENV,
    server: {
        port: validatedEnv.PORT,
        url: validatedEnv.SERVER_URL
    },
    cors: {
        cors_origin: validatedEnv.CORS_ORIGIN
    },
    jwt: {
        access_token: {
            secret: validatedEnv.ACCESS_TOKEN_SECRET,
            expire: validatedEnv.ACCESS_TOKEN_EXPIRE
        },
        refresh_token: {
            secret: validatedEnv.REFRESH_TOKEN_SECRET,
            expire: validatedEnv.REFRESH_TOKEN_EXPIRE,
            cookie_name: validatedEnv.REFRESH_TOKEN_COOKIE_NAME
        }
    },
};
exports.default = config;
//# sourceMappingURL=config.js.map