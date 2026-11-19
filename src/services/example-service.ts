import { Request, Response } from 'express';
import { z } from 'zod';
import { Schema } from '../models/request-schemas.js';
import { Example } from '../models/repositories/entities.js';
import { ExampleRepository } from '../models/repositories/example-repository.js';
import { HttpError } from '../models/http-errors.js';

export const ExampleService = {
  listExamples: async (req: Request, res: Response) => {
    const input = res.locals.input as z.infer<typeof Schema.listExamples>;
    const { limit, skip, before, after } = input;

    const { result, hasMore } = await ExampleRepository.select({
      limit,
      skip,
      before,
      after
    });

    const examples = result.map((example) => {
      return {
        id: example.id,
        name: example.name,
        created_at: example.createdAt,
        updated_at: example.updatedAt
      };
    });

    res.json({ examples, has_more: hasMore });
  },

  createExample: async (_req: Request, res: Response) => {
    const input = res.locals.input as z.infer<typeof Schema.upsertExample>;

    const newExample = await ExampleRepository.insert(input as Example);

    res.json({
      id: newExample.id,
      name: newExample.name,
      created_at: newExample.createdAt,
      updated_at: newExample.updatedAt
    });
  },

  updateExample: async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const input = res.locals.input as z.infer<typeof Schema.upsertExample>;

    const example = await ExampleRepository.selectOneById(id);
    if (!example) {
      throw HttpError.exampleNotFound;
    }

    await ExampleRepository.updateOneById(id, input);

    res.status(204).send();
  },

  deleteExample: async (req: Request, res: Response) => {
    const id = req.params.id as string;

    const example = await ExampleRepository.selectOneById(id);
    if (!example) {
      throw HttpError.exampleNotFound;
    }

    await ExampleRepository.deleteOneById(id);

    res.status(204).send();
  }
};
