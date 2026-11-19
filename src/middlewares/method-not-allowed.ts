import { HttpError } from '../models/http-errors.js';

export const methodNotAllowedMiddleware = async () => {
  throw HttpError.methodNotAllowed;
};
