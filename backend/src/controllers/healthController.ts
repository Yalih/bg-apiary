import type { RequestHandler } from 'express';
import { prisma } from '../database/prisma.js';

export const healthCheck: RequestHandler = async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      service: 'bg-apiary-backend',
      status: 'ok',
      database: 'connected',
      version: '3.4.0',
      timestamp: new Date().toISOString()
    });
  } catch (_error) {
    res.status(503).json({
      service: 'bg-apiary-backend',
      status: 'degraded',
      database: 'disconnected',
      version: '3.4.0',
      timestamp: new Date().toISOString()
    });
  }
};
