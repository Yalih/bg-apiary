import { Router } from 'express';
import { notImplemented } from '../controllers/notImplementedController.js';

export const authRouter = Router();
authRouter.all('/', notImplemented('auth'));
authRouter.all('/:id', notImplemented('auth'));
