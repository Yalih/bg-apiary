import type { FastifyInstance } from 'fastify';
import { authRoutes } from './auth';
import { systemRoutes } from './system';
import { registerCrudRoutes } from './crud';

export async function registerRoutes(app: FastifyInstance) {
  await app.register(async (v1) => {
    await systemRoutes(v1);
    await authRoutes(v1);

    await registerCrudRoutes(v1, { path: 'apiaries', model: 'apiary', schema: 'apiary' });
    await registerCrudRoutes(v1, { path: 'hives', model: 'hive', schema: 'hive' });
    await registerCrudRoutes(v1, { path: 'queens', model: 'queen', schema: 'queen' });
    await registerCrudRoutes(v1, { path: 'inspections', model: 'inspection', schema: 'inspection', touchHiveInspection: true });
    await registerCrudRoutes(v1, { path: 'feedings', model: 'feeding', schema: 'feeding' });
    await registerCrudRoutes(v1, { path: 'treatments', model: 'treatment', schema: 'treatment' });
    await registerCrudRoutes(v1, { path: 'tasks', model: 'task', schema: 'task' });
    await registerCrudRoutes(v1, { path: 'notes', model: 'note', schema: 'note' });
    await registerCrudRoutes(v1, { path: 'photos', model: 'photo', schema: 'photo' });
  }, { prefix: '/api/v1' });
}
