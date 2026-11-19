export const { NODE_ENV, APP_ENV, SERVICE_NAME, PORT } = process.env;

export const IS_LOCAL = NODE_ENV !== 'production';

// Envvars for default database connection
export const PG_DATABASE = String(process.env.PG_DATABASE);
export const PG_HOST = String(process.env.PG_HOST);
export const PG_PORT = Number(process.env.PG_PORT);
export const PG_USER = String(process.env.PG_USER);
export const PG_PASSWORD = String(process.env.PG_PASSWORD);

// Envvars for read replica database connection; defaults to default db connection
export const PG_READ_HOST = process.env.PG_READ_HOST || PG_HOST;
export const PG_READ_PORT = Number(process.env.PG_READ_PORT) || PG_PORT;
export const PG_READ_USER = process.env.PG_READ_USER || PG_USER;
export const PG_READ_PASSWORD = process.env.PG_READ_PASSWORD || PG_PASSWORD;
