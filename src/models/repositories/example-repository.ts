import { and, desc, eq, lt, gt } from 'drizzle-orm';
import { database } from '../../libs/database.js';
import { Example, examples } from './entities.js';

export const ExampleRepository = {
  insert: async (example: Example) => {
    const [newExample] = await database
      .insert(examples)
      .values(example)
      .returning();

    return newExample as Example;
  },

  select: async (filters: {
    limit: number;
    skip: number;
    before?: Date;
    after?: Date;
  }) => {
    const { limit, skip, before, after } = filters;

    const conditions = [];

    if (before) {
      conditions.push(lt(examples.createdAt, before));
    }

    if (after) {
      conditions.push(gt(examples.createdAt, after));
    }

    const result = await database
      .select()
      .from(examples)
      .where(and(...conditions))
      .orderBy(desc(examples.createdAt))
      .limit(limit + 1)
      .offset(skip);

    const hasMore = result.length > limit;

    return {
      result: result.slice(0, limit),
      hasMore
    };
  },

  selectOneById: async (id: string) => {
    const [example] = await database
      .select()
      .from(examples)
      .where(eq(examples.id, id))
      .limit(1);

    return example;
  },

  updateOneById: async (
    id: string,
    updated: Partial<Pick<Example, 'name'>>
  ) => {
    if (!Object.keys(updated).length) {
      return;
    }

    await database.update(examples).set(updated).where(eq(examples.id, id));
  },

  deleteOneById: async (id: string) => {
    await database.delete(examples).where(eq(examples.id, id));
  }
};
