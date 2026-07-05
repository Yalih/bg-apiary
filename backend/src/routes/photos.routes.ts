import { Router } from 'express';
import { notImplemented } from '../controllers/notImplementedController.js';

export const photosRouter = Router();
photosRouter.all('/', notImplemented('photos'));
photosRouter.all('/:id', notImplemented('photos'));
