import { Request, Response } from 'express';
import type { TypedRequest, UserLoginCredentials, UserSignUpCredentials } from '../types/types';
export declare const login: (req: TypedRequest<UserLoginCredentials>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const signUp: (req: TypedRequest<UserSignUpCredentials>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const refreshToken: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
