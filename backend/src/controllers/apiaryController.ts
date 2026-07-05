import type { RequestHandler } from 'express';
import { apiaryService } from '../services/index.js';
import { createApiarySchema } from '../validators/index.js';

export const getApiaries: RequestHandler = async (_req, res, next) => {
  try {
    const apiaries = await apiaryService.listApiaries();
    res.json({ data: apiaries });
  } catch (error) {
    next(error);
  }
};

export const postApiary: RequestHandler = async (req, res, next) => {
  try {
    const input = createApiarySchema.parse(req.body);
    const apiary = await apiaryService.createApiary(input);
    res.status(201).json({ data: apiary });
  } catch (error) {
    next(error);
  }
};
