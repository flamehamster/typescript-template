import GracefulShutdown from 'http-graceful-shutdown';
import { initApplication } from './app.js';
import { PORT } from './config.js';

(async () => {
  const app = await initApplication();
  const server = app.listen(PORT);

  console.log('Server started');

  GracefulShutdown(server, {
    preShutdown: async () => console.log('Shutting down gracefully...'),
    onShutdown: async () => console.log('Shutdown completed.')
  });
})();
