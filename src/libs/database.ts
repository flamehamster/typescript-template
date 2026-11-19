import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { withReplicas } from 'drizzle-orm/pg-core';

import {
  PG_DATABASE,
  PG_HOST,
  PG_PASSWORD,
  PG_PORT,
  PG_READ_HOST,
  PG_READ_PASSWORD,
  PG_READ_PORT,
  PG_READ_USER,
  PG_USER
} from '../config.js';
import { runMigrationsWithLock } from '../../migrations/migrator.mjs';

const writerPool = new Pool({
  database: PG_DATABASE,
  host: PG_HOST,
  port: PG_PORT,
  user: PG_USER,
  password: PG_PASSWORD,
  max: 10,
  connectionTimeoutMillis: 10_000,
  idleTimeoutMillis: 0
});

const writer = drizzle({
  client: writerPool
});

const readerPool = new Pool({
  database: PG_DATABASE,
  host: PG_READ_HOST,
  port: PG_READ_PORT,
  user: PG_READ_USER,
  password: PG_READ_PASSWORD,
  max: 10,
  connectionTimeoutMillis: 10_000,
  idleTimeoutMillis: 0
});

const reader = drizzle({
  client: readerPool
});

export const runDatabaseMigrations = async () => {
  await runMigrationsWithLock(writerPool);
};

export const checkDatabaseConnections = async () => {
  await writer.execute('SELECT 1');
  await reader.execute('SELECT 1');
};

export const database = withReplicas(writer, [reader]);
