import type { RequestHandler } from 'express';

export const notImplemented = (resource: string): RequestHandler => (_req, res) => {
  res.status(501).json({
    message: `${resource} API is planned for Sprint 3.x and is not implemented yet`,
    status: 'not_implemented'
  });
};
