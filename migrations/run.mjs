import { Pool } from 'pg';

import { runMigrationsWithLock } from './migrator.mjs';

const writerPool = new Pool({
  database: String(process.env.PG_DATABASE),
  host: String(process.env.PG_HOST),
  port: Number(process.env.PG_PORT),
  user: String(process.env.PG_USER),
  password: String(process.env.PG_PASSWORD),
  max: 10,
  connectionTimeoutMillis: 10_000,
  idleTimeoutMillis: 0
});

try {
  await runMigrationsWithLock(writerPool);
} finally {
  await writerPool.end();
}
