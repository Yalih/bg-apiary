import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import jwt from '@fastify/jwt';
import rateLimit from '@fastify/rate-limit';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import type { FastifyInstance } from 'fastify';
import { env } from './env';

export async function registerPlugins(app: FastifyInstance) {
  const origins = env.corsOrigin.split(',').map((item) => item.trim()).filter(Boolean);

  await app.register(helmet);
  await app.register(cors, {
    origin: (origin, callback) => {
      if (!origin || origins.includes(origin) || origins.includes('*')) {
        callback(null, true);
        return;
      }
      callback(new Error(`Origin not allowed: ${origin}`), false);
    },
    credentials: true,
  });
  await app.register(rateLimit, { max: 200, timeWindow: '1 minute' });
  await app.register(jwt, { secret: env.jwtSecret });

  await app.register(swagger, {
    openapi: {
      info: {
        title: 'BG Apiary API',
        version: env.appVersion,
        description: 'API for BG Apiary 1.0 Production',
      },
      servers: [{ url: '/api/v1' }],
    },
  });
  await app.register(swaggerUi, { routePrefix: '/api/docs' });

  app.decorate('authenticate', async (request, reply) => {
    try {
      const decoded = await request.jwtVerify<{ sub: string; email: string; name: string }>();
      request.authUser = { id: decoded.sub, email: decoded.email, name: decoded.name };
    } catch {
      reply.code(401).send({ message: 'Unauthorized' });
    }
  });
}
