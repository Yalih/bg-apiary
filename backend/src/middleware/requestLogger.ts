import { createRequire } from 'node:module';
import { logger } from '../logger/logger.js';

const require = createRequire(import.meta.url);
const pinoHttp = require('pino-http') as any;

export const requestLogger = pinoHttp({ logger });
