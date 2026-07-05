import { Router } from 'express';
import { notImplemented } from '../controllers/notImplementedController.js';

export const tasksRouter = Router();
tasksRouter.all('/', notImplemented('tasks'));
tasksRouter.all('/:id', notImplemented('tasks'));
