import { Router } from 'express';
import { getHives, postHive } from '../controllers/hiveController.js';

export const hivesRouter = Router();
hivesRouter.get('/', getHives);
hivesRouter.post('/', postHive);
