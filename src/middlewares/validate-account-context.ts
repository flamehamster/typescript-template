import { Buffer } from 'node:buffer';
import type { RequestHandler } from 'express';
import { z } from 'zod';
import { HttpError } from '../models/http-errors.js';

const accountContextSchema = z.object({
  account_id: z.uuid()
});

export type AccountContext = z.infer<typeof accountContextSchema>;

export const validateAccountContext: RequestHandler = (req, res, next) => {
  const header = req.get('Account-Context');
  if (!header) {
    throw HttpError.invalidRequest;
  }

  try {
    const json = Buffer.from(header, 'base64url').toString('utf8');
    res.locals.account = accountContextSchema.parse(JSON.parse(json));
  } catch {
    throw HttpError.invalidRequest;
  }

  next();
};
