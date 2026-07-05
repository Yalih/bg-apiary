import { Router } from 'express';
import { notImplemented } from '../controllers/notImplementedController.js';

export const apiariesRouter = Router();
apiariesRouter.all('/', notImplemented('apiaries'));
apiariesRouter.all('/:id', notImplemented('apiaries'));
