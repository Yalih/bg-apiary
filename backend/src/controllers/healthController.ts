import type { RequestHandler } from 'express';

export const healthCheck: RequestHandler = (_req, res) => {
  res.json({
    service: 'bg-apiary-backend',
    status: 'ok',
    version: '3.3.0',
    timestamp: new Date().toISOString()
  });
};
