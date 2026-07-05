import { Router } from 'express';
import { notImplemented } from '../controllers/notImplementedController.js';

export const usersRouter = Router();
usersRouter.all('/', notImplemented('users'));
usersRouter.all('/:id', notImplemented('users'));
