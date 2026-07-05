import type { FastifyInstance } from 'fastify';
import { prisma } from '../db';
import { env } from '../env';

export async function systemRoutes(app: FastifyInstance) {
  app.get('/health', async () => {
    await prisma.$queryRaw`SELECT 1`;
    return {
      status: 'ok',
      app: 'BG Apiary API',
      version: env.appVersion,
      time: new Date().toISOString(),
    };
  });

  app.get('/version', async () => ({
    app: 'BG Apiary',
    version: env.appVersion,
    api: 'v1',
  }));
}
