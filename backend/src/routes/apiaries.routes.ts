import { Router } from 'express';
import { getApiaries, postApiary } from '../controllers/apiaryController.js';

export const apiariesRouter = Router();
apiariesRouter.get('/', getApiaries);
apiariesRouter.post('/', postApiary);
