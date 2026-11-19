module.exports = {
  schema: './src/models/repositories/entities.ts',
  out: './migrations',
  dialect: 'postgresql',
  schemaFilter: ['public'],
  dbCredentials: {
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    ssl: false
  }
};
