import { Router } from 'express';
import { notImplemented } from '../controllers/notImplementedController.js';

export const feedingsRouter = Router();
feedingsRouter.all('/', notImplemented('feedings'));
feedingsRouter.all('/:id', notImplemented('feedings'));
