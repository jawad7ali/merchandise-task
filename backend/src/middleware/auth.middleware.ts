/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/config';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const { verify } = jwt;


/**
 * This function checks if the user is authenticated.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object that will be used to send the HTTP response.
 * @param {NextFunction} next - The next function that will be called if the user is authenticated.
 * @returns {Response} Returns an HTTP response with a 401 status code if the user is not authenticated.
 * Otherwise, it calls the next function.
 * @throws {Error} Throws an error if the token is invalid.
 * 
 */
const isAuth = (req: Request, res: Response, next: NextFunction) => {

  const authHeader = req.headers?.authorization;

  if (!authHeader || !authHeader?.startsWith('Bearer ')) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' });
  }

  const token: string | undefined = authHeader.split(' ')[1];

  if (!token) return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' });
  // console.log(config.jwt.access_token.secret, 'token');

  verify(token, config.jwt.access_token.secret,
    (err: unknown,
      payload: JwtPayload) => {
      if (err) return res.status(httpStatus.FORBIDDEN).json({ message: 'Forbidden' });
      req.payload = payload;
      next();
    }
  );
};

export default isAuth;