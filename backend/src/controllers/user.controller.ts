import { Request, Response } from 'express';
import type {
  TypedRequest,
  UserLoginCredentials,
  UserSignUpCredentials,
} from '../types/types';
import httpStatus from 'http-status';
import { addUser, findUserByUsername } from '../models/user.model';
import bcrypt from 'bcrypt';
import config from '../config/config';
import { createAccessToken, createRefreshToken } from '../utils/generateTokens.util';
import { clearRefreshTokenCookieConfig, refreshTokenCookieConfig } from '../config/cookieConfig';
import jwt, { type JwtPayload } from 'jsonwebtoken';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const { verify } = jwt;

/**
 * This function handles the login process for users. It expects a request object with the following properties:
 *
 * @param {TypedRequest<UserLoginCredentials>} req - The request object that includes username and password.
 * @param {Response} res - The response object that will be used to send the HTTP response.
 *
 * @returns {Response} Returns an HTTP response that includes one of the following:
 *   - A 400 BAD REQUEST status code and an error message if the request body is missing any required parameters.
 *   - A 401 UNAUTHORIZED status code if the user email does not exist in the database or the email is not verified or the password is incorrect.
 *   - A 200 OK status code and an access token if the login is successful and a new refresh token is stored in the database and a new refresh token cookie is set.
 *   - A 500 INTERNAL SERVER ERROR status code if there is an error in the server.
 */
export const login = async (
  req: TypedRequest<UserLoginCredentials>,
  res: Response
) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: 'Username and password are required!' });
  }

  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: 'User not found!' });
    }
    const userId = parseInt(user.id!.toString());

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid password!' });
    }
   

    const accessToken = createAccessToken(userId);
    const refreshToken =  createRefreshToken(userId);

    // Assuming your config correctly defines the path, httpOnly, etc., for security
    res.cookie(config.jwt.refresh_token.cookie_name, refreshToken, { httpOnly: true, sameSite: 'strict' });
    console.log({ accessToken, message: 'Login successful' })
    return res.json({
      data: {
        accessToken
      },
      message: 'Login successful'
    });
  } catch (error) {
    console.error(error); // Log the error for server-side debugging
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred during login.' });
  }
};


/**
 * This function handles the signup process for new users. It expects a request object with the following properties:
 *
 * @param {TypedRequest<UserSignUpCredentials>} req - The request object that includes user's username, email, and password.
 * @param {Response} res - The response object that will be used to send the HTTP response.
 *
 * @returns {Response} Returns an HTTP response that includes one of the following:
 *   - A 400 BAD REQUEST status code and an error message if the request body is missing any required parameters.
 *   - A 409 CONFLICT status code if the user email already exists in the database.
 *   - A 201 CREATED status code and a success message if the new user is successfully created and a verification email is sent.
 *   - A 500 INTERNAL SERVER ERROR status code if there is an error in the server.
 */
export const signUp = async (
  req: TypedRequest<UserSignUpCredentials>,
  res: Response
) => {
  const { fullName, username, password } = req.body;

  // Validations are implemented in middleware

  if (!username || !password || !fullName) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: 'User name, full name and password are required!' });
  }
  
  const checkUserName = await findUserByUsername(username);

  if (checkUserName) return res
    .status(httpStatus.CONFLICT)
    .json({ message: 'Username is already in use!' }); // user name is already in db

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await addUser({
      id: Math.floor(Math.random() * 1000),
      fullName,
      username,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(httpStatus.CREATED).json({ message: 'New user created' });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
  }
};


/**
 * This function handles the refresh process for users. It expects a request object with the following properties:
 *
 * @param {Request} req - The request object that includes a cookie with a valid refresh token
 * @param {Response} res - The response object that will be used to send the HTTP response.
 *
 * @returns {Response} Returns an HTTP response that includes one of the following:
 *   - A 401 UNAUTHORIZED status code if the refresh token cookie is undefined
 *   - A 403 FORBIDDEN status code if a refresh token reuse was detected but the token wasn't valid
 *   - A 403 FORBIDDEN status code if a refresh token reuse was detected but the token was valid
 *   - A 403 FORBIDDEN status code if the token wasn't valid
 *   - A 200 OK status code if the token was valid and the user was granted a new refresh and access token
 */
export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken: string | undefined =
    req.cookies[config.jwt.refresh_token.cookie_name];

  if (!refreshToken) return res.status(httpStatus.UNAUTHORIZED)
    .json({ message: 'No refresh token found' });

  // clear refresh cookie
  res.clearCookie(
    config.jwt.refresh_token.cookie_name,
    clearRefreshTokenCookieConfig
  );

  // evaluate jwt
  verify(
    refreshToken,
    config.jwt.refresh_token.secret,
    async (err: unknown, payload: JwtPayload) => {
      if (err) {
        return res.sendStatus(httpStatus.FORBIDDEN);
      }
      const userId = parseInt(payload.userId!.toString());

      // Refresh token was still valid
      const accessToken = createAccessToken(userId);

      const newRefreshToken = createRefreshToken(userId);

      // Creates Secure Cookie with refresh token
      res.cookie(
        config.jwt.refresh_token.cookie_name,
        newRefreshToken,
        refreshTokenCookieConfig
      );

      return res.json({ accessToken });
    }
  );
};