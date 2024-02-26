import type { NextFunction, Request, Response } from 'express';
declare const isAuth: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default isAuth;
