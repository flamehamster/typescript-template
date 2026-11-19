import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { HttpError } from '../models/http-errors.js';

export const validator = (option: ZodSchema | (() => Promise<ZodSchema>)) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const input = req.method === 'GET' ? req.query : req.body;

    const schema = typeof option === 'function' ? await option() : option;
    const result = await schema.safeParseAsync(input);
    if (result.success) {
      res.locals.input = result.data;
      next();
    } else {
      throw HttpError.validationError(result.error.issues);
    }
  };
};
