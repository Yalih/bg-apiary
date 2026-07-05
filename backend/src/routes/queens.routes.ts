import { Router } from 'express';
import { notImplemented } from '../controllers/notImplementedController.js';

export const queensRouter = Router();
queensRouter.all('/', notImplemented('queens'));
queensRouter.all('/:id', notImplemented('queens'));
