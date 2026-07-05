import { Router } from 'express';
import { notImplemented } from '../controllers/notImplementedController.js';

export const hivesRouter = Router();
hivesRouter.all('/', notImplemented('hives'));
hivesRouter.all('/:id', notImplemented('hives'));
