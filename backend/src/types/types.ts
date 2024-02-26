import type { NextFunction, Request, Response } from 'express';
import type { DeepPartial } from 'utility-types';
import type { IFilterXSSOptions } from 'xss';

export interface IItem {
  id: number;
  name?: string | undefined;
  price?: number | undefined;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IItemUpdate {
  name?: string | undefined;
  price?: number | undefined;
  updatedAt?: Date;
}

export interface ItemCreationRequest {
  name: string;
  price: number;
}

export interface ItemUpdateRequest {
  name?: string; // Optional because updates may not include all fields
  price?: number;
}
  
  // Add more types as needed
  
export interface User {
    id?: number;
    fullName: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserTokens {
  userId: string;
  refreshToken: string;
}

export interface UserSignUpCredentials {
  fullName: string;
  username: string;
  password: string;
}

// Extending the Express Request to include our custom body types
export interface TypedRequestBody<T> extends Express.Request {
  body: T;
}

export type UserLoginCredentials = UserSignUpCredentials;

  
  // More strictly typed Express.Request type
export type TypedRequest<
  ReqBody = Record<string, unknown>,
  QueryString = Record<string, unknown>
> = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  DeepPartial<ReqBody>,
  DeepPartial<QueryString>
  >;

  export type Sanitized<T> = T extends (...args: unknown[]) => unknown
  ? T // if T is a function, return it as is
  : T extends object
  ? {
      readonly [K in keyof T]: Sanitized<T[K]>;
    }
  : T;

export type SanitizeOptions = IFilterXSSOptions & {
  whiteList?: IFilterXSSOptions['whiteList'];
};

export type ExpressMiddleware<
  ReqBody = Record<string, unknown>,
  Res = Record<string, unknown>,
  QueryString = Record<string, unknown>
> = (
  req: TypedRequest<ReqBody, QueryString>,
  res: Response<Res>,
  next: NextFunction
) => Promise<void> | void;

export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> &
    Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];