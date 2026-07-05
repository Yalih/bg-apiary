import type { ErrorRequestHandler } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ZodError } from 'zod';
import { logger } from '../logger/logger.js';

type HttpError = Error & { statusCode?: number };

export const errorHandler: ErrorRequestHandler = (error: HttpError, _req, res, _next) => {
  if (error instanceof ZodError) {
    return res.status(400).json({ message: 'Validation error', issues: error.issues });
  }

  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'Unique constraint violation', meta: error.meta });
    }
    if (error.code === 'P2003') {
      return res.status(400).json({ message: 'Invalid relation reference', meta: error.meta });
    }
  }

  if (error.statusCode) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  logger.error({ error }, 'Unhandled request error');
  return res.status(500).json({ message: 'Internal server error' });
};
