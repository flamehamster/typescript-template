import { index, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const examples = pgTable(
  'examples',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date())
  },
  (examples) => ({
    nameIndex: index('ix_examples_name_trgm')
      .using('gin', examples.name.op('gin_trgm_ops'))
      .concurrently(),
    createdAtIndex: index('ix_examples_created_at')
      .on(examples.createdAt.desc())
      .concurrently(),
    updatedAtIndex: index('ix_examples_updated_at')
      .on(examples.updatedAt.desc())
      .concurrently()
  })
);
export type Example = typeof examples.$inferSelect;
