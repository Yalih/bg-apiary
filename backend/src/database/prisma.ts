import { PrismaClient } from '@prisma/client';
import { logger } from '../logger/logger.js';

export const prisma = new PrismaClient({
  log: [
    { emit: 'event', level: 'error' },
    { emit: 'event', level: 'warn' }
  ]
});

prisma.$on('error', (event: { message: string; target?: string; timestamp: Date }) => {
  logger.error({ event }, 'Prisma error');
});

prisma.$on('warn', (event: { message: string; target?: string; timestamp: Date }) => {
  logger.warn({ event }, 'Prisma warning');
});

export async function connectDatabase(): Promise<void> {
  await prisma.$connect();
  logger.info('Database connected');
}

export async function disconnectDatabase(): Promise<void> {
  await prisma.$disconnect();
  logger.info('Database disconnected');
}
