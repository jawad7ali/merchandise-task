import * as dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

dotenv.config({
  path: path.resolve(__dirname, '../../.env')
});

const envSchema = Joi.object().keys({
  NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
  PORT: Joi.string().required().default('4000'),
  SERVER_URL: Joi.string().required(),
  CORS_ORIGIN: Joi.string().required().default('*'),
  ACCESS_TOKEN_SECRET: Joi.string().min(8).required(),
  ACCESS_TOKEN_EXPIRE: Joi.string().required().default('20m'),
  REFRESH_TOKEN_SECRET: Joi.string().min(8).required(),
  REFRESH_TOKEN_EXPIRE: Joi.string().required().default('1d'),
  REFRESH_TOKEN_COOKIE_NAME: Joi.string().required().default('jid'),
});

const { value: validatedEnv, error } = envSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env, { abortEarly: false, stripUnknown: true });

if (error) {
  throw new Error(
    `Environment variable validation error: \n${error.details
      .map((detail) => detail.message)
      .join('\n')}`
  );
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
} as const;

export default config;