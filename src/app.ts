import express, { Application, Request, Response } from 'express';
import { runDatabaseMigrations } from './libs/database.js';
import { HttpError } from './models/http-errors.js';
import { errorHandler } from './middlewares/error-handler.js';
import { exampleRouter } from './routers/example-router.js';
import { rpcRouter } from './routers/rpc-router.js';

export const initApplication = async (): Promise<Application> => {
  console.log('Running database migrations');
  await runDatabaseMigrations();

  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  app.get('/', async (req: Request, res: Response) => {
    res.json({ status: 'ok' });
  });

  app.use('/examples', exampleRouter);
  app.use('/rpc', rpcRouter);

  app.use(() => {
    throw HttpError.resourceNotFound;
  });

  app.use(errorHandler);

  return app;
};
