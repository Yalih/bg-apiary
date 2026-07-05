import { Router } from 'express';
import { notImplemented } from '../controllers/notImplementedController.js';

export const treatmentsRouter = Router();
treatmentsRouter.all('/', notImplemented('treatments'));
treatmentsRouter.all('/:id', notImplemented('treatments'));
