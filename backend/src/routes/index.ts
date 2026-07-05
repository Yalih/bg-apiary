import { Router } from 'express';
import { healthRouter } from './health.routes.js';
import { authRouter } from './auth.routes.js';
import { usersRouter } from './users.routes.js';
import { apiariesRouter } from './apiaries.routes.js';
import { hivesRouter } from './hives.routes.js';
import { queensRouter } from './queens.routes.js';
import { inspectionsRouter } from './inspections.routes.js';
import { tasksRouter } from './tasks.routes.js';
import { notesRouter } from './notes.routes.js';
import { feedingsRouter } from './feedings.routes.js';
import { treatmentsRouter } from './treatments.routes.js';
import { photosRouter } from './photos.routes.js';

export const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/apiaries', apiariesRouter);
apiRouter.use('/hives', hivesRouter);
apiRouter.use('/queens', queensRouter);
apiRouter.use('/inspections', inspectionsRouter);
apiRouter.use('/tasks', tasksRouter);
apiRouter.use('/notes', notesRouter);
apiRouter.use('/feedings', feedingsRouter);
apiRouter.use('/treatments', treatmentsRouter);
apiRouter.use('/photos', photosRouter);
