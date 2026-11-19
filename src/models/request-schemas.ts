import { z } from 'zod';

export const Schema = {
  listExamples: z
    .object({
      limit: z.coerce.number().int().min(1).optional().default(50),
      skip: z.coerce.number().int().min(0).optional().default(0),
      before: z.coerce.date().optional(),
      after: z.coerce.date().optional()
    })
    .strict(),

  upsertExample: z
    .object({
      name: z.string().min(3).max(50)
    })
    .strict()
};
