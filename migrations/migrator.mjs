import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

const MIGRATION_LOCK_ID = 0x4d49_4752;
const MIGRATION_LOCK_RETRY_MS = 100;
const MIGRATION_LOCK_TIMEOUT_MS = 300_000;

const acquireMigrationLock = async (client) => {
  const timeoutAt = Date.now() + MIGRATION_LOCK_TIMEOUT_MS;

  while (Date.now() < timeoutAt) {
    const result = await client.query(
      'SELECT pg_try_advisory_lock($1) AS acquired',
      [MIGRATION_LOCK_ID]
    );

    if (result.rows[0]?.acquired) {
      return;
    }

    await new Promise((resolve) =>
      setTimeout(resolve, MIGRATION_LOCK_RETRY_MS)
    );
  }

  throw new Error('Timed out waiting for the migration lock');
};

export const runMigrationsWithLock = async (writerPool) => {
  const client = await writerPool.connect();

  try {
    await acquireMigrationLock(client);

    try {
      const migrationDatabase = drizzle({ client });

      await migrate(migrationDatabase, {
        migrationsFolder: './migrations'
      });
    } finally {
      await client.query('SELECT pg_advisory_unlock($1)', [MIGRATION_LOCK_ID]);
    }
  } finally {
    client.release(true);
  }
};
