import { Router } from 'express';
import { notImplemented } from '../controllers/notImplementedController.js';

export const inspectionsRouter = Router();
inspectionsRouter.all('/', notImplemented('inspections'));
inspectionsRouter.all('/:id', notImplemented('inspections'));
