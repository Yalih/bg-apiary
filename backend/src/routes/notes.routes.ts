import { Router } from 'express';
import { notImplemented } from '../controllers/notImplementedController.js';

export const notesRouter = Router();
notesRouter.all('/', notImplemented('notes'));
notesRouter.all('/:id', notImplemented('notes'));
