import Fastify from 'fastify';
import { ZodError } from 'zod';
import { prisma } from './db';
import { env } from './env';
import { registerPlugins } from './plugins';
import { registerRoutes } from './routes';

async function main() {
  const app = Fastify({
    logger: {
      level: env.nodeEnv === 'production' ? 'info' : 'debug',
    },
  });

  app.setErrorHandler((error, _request, reply) => {
    if (error instanceof ZodError) {
      reply.code(400).send({ message: 'Validation error', issues: error.issues });
      return;
    }

    app.log.error(error);
    reply.code(500).send({ message: 'Internal server error' });
  });

  await registerPlugins(app);
  await registerRoutes(app);

  const shutdown = async () => {
    app.log.info('Shutting down');
    await app.close();
    await prisma.$disconnect();
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  await app.listen({ port: env.port, host: '0.0.0.0' });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
