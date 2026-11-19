import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../models/http-errors.js';
import { IS_LOCAL } from '../config.js';

export const errorHandler = (
  // oxlint-disable-next-line typescript/no-explicit-any
  error: any,
  _req: Request,
  res: Response,
  // oxlint-disable-next-line eslint/no-unused-vars
  _next: NextFunction
) => {
  if (error instanceof SyntaxError) {
    error = HttpError.invalidRequest;
  }
  if (!error.status_code) {
    error = HttpError.unknownError(error);
  }
  if (error.stack) {
    console.error(
      JSON.stringify({
        status: 'error',
        message: error.message ?? 'Application Error',
        status_code: error.status_code,
        stack: error.stack
      })
    );

    if (!IS_LOCAL) {
      delete error.stack;
    }
  }

  res.status(error.status_code).json(error);
};
