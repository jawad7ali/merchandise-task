import Joi from 'joi';
import type { UserSignUpCredentials } from '../types/types';
export declare const signupSchema: {
    body: Joi.ObjectSchema<UserSignUpCredentials>;
};
export declare const loginSchema: {
    body: Joi.ObjectSchema<UserSignUpCredentials>;
};
