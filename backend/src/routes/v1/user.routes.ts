import express from 'express';
import * as userController from '../../controllers/user.controller';
import validate from '../../middleware/validate';
import { loginSchema, signupSchema } from '../../validations/auth.validation';

const userRouter = express.Router();

userRouter.post('/login', validate(loginSchema), userController.login);
userRouter.post('/signup', validate(signupSchema), userController.signUp);
userRouter.post('/refresh', userController.refreshToken);

export default userRouter;
