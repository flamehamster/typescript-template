import type { Pool } from 'pg';

export const runMigrationsWithLock: (writerPool: Pool) => Promise<void>;
