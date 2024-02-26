import type { NextFunction, Request, Response } from 'express';
import { type ObjectSchema } from 'joi';
import type { RequireAtLeastOne } from '../types/types';
type RequestValidationSchema = RequireAtLeastOne<Record<'body' | 'query' | 'params', ObjectSchema>>;
declare const validate: (schema: RequestValidationSchema) => (req: Request, res: Response, next: NextFunction) => void;
export default validate;
