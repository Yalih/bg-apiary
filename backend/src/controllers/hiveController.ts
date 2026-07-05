import type { RequestHandler } from 'express';
import { hiveService } from '../services/index.js';
import { createHiveSchema } from '../validators/index.js';

export const getHives: RequestHandler = async (_req, res, next) => {
  try {
    const hives = await hiveService.listHives();
    res.json({ data: hives });
  } catch (error) {
    next(error);
  }
};

export const postHive: RequestHandler = async (req, res, next) => {
  try {
    const input = createHiveSchema.parse(req.body);
    const hive = await hiveService.createHive(input);
    res.status(201).json({ data: hive });
  } catch (error) {
    next(error);
  }
};
