import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../models/http-errors.js';

export const validateId = (resourceId: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params[resourceId] as string;
    const result = await z.string().uuid().safeParseAsync(id);
    if (result.success) {
      next();
    } else {
      throw HttpError.resourceNotFound;
    }
  };
};
