import type { FastifyInstance, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { prisma } from '../db';
import { schemas, type SchemaKey } from './schemas';

type PrismaModelName = 'apiary' | 'hive' | 'queen' | 'inspection' | 'feeding' | 'treatment' | 'task' | 'note' | 'photo';

type CrudConfig = {
  path: string;
  model: PrismaModelName;
  schema: SchemaKey;
  touchHiveInspection?: boolean;
};

const idSchema = z.object({ id: z.string().uuid() });

function ownerId(request: FastifyRequest) {
  if (!request.authUser?.id) throw new Error('Missing auth user');
  return request.authUser.id;
}

function normalizeDates(data: Record<string, unknown>) {
  const result = { ...data };
  for (const key of ['inspectedAt', 'fedAt', 'treatedAt', 'introducedAt', 'acceptedAt', 'nextCheckAt', 'dueAt']) {
    if (typeof result[key] === 'string' && result[key]) {
      result[key] = new Date(result[key] as string);
    }
  }
  return result;
}

export async function registerCrudRoutes(app: FastifyInstance, config: CrudConfig) {
  const model = (prisma as any)[config.model];
  const createSchema = schemas[config.schema];
  const updateSchema = createSchema.partial();

  app.get(`/${config.path}`, { preHandler: app.authenticate }, async (request) => {
    const query = request.query as { hiveId?: string; apiaryId?: string; status?: string };
    const where: Record<string, unknown> = { ownerId: ownerId(request), deletedAt: null };
    if (query.hiveId) where.hiveId = query.hiveId;
    if (query.apiaryId) where.apiaryId = query.apiaryId;
    if (query.status) where.status = query.status;
    return model.findMany({ where, orderBy: { updatedAt: 'desc' } });
  });

  app.post(`/${config.path}`, { preHandler: app.authenticate }, async (request, reply) => {
    const parsed = createSchema.parse(request.body);
    const data = normalizeDates(parsed as Record<string, unknown>);
    const created = await model.create({ data: { ...data, ownerId: ownerId(request) } });

    if (config.touchHiveInspection && (created as { hiveId?: string }).hiveId) {
      await prisma.hive.updateMany({
        where: { id: (created as { hiveId: string }).hiveId, ownerId: ownerId(request) },
        data: { lastInspectionAt: (created as { inspectedAt?: Date }).inspectedAt ?? new Date() },
      });
    }

    await prisma.auditLog.create({
      data: { ownerId: ownerId(request), action: `${config.path}.create`, entity: config.model, entityId: created.id },
    });

    return reply.code(201).send(created);
  });

  app.get(`/${config.path}/:id`, { preHandler: app.authenticate }, async (request, reply) => {
    const { id } = idSchema.parse(request.params);
    const item = await model.findFirst({ where: { id, ownerId: ownerId(request), deletedAt: null } });
    if (!item) return reply.code(404).send({ message: 'Not found' });
    return item;
  });

  app.patch(`/${config.path}/:id`, { preHandler: app.authenticate }, async (request, reply) => {
    const { id } = idSchema.parse(request.params);
    const parsed = updateSchema.parse(request.body);
    const data = normalizeDates(parsed as Record<string, unknown>);
    const result = await model.updateMany({ where: { id, ownerId: ownerId(request), deletedAt: null }, data });
    if (result.count === 0) return reply.code(404).send({ message: 'Not found' });
    const updated = await model.findFirst({ where: { id, ownerId: ownerId(request) } });
    await prisma.auditLog.create({ data: { ownerId: ownerId(request), action: `${config.path}.update`, entity: config.model, entityId: id } });
    return updated;
  });

  app.delete(`/${config.path}/:id`, { preHandler: app.authenticate }, async (request, reply) => {
    const { id } = idSchema.parse(request.params);
    const result = await model.updateMany({ where: { id, ownerId: ownerId(request), deletedAt: null }, data: { deletedAt: new Date() } });
    if (result.count === 0) return reply.code(404).send({ message: 'Not found' });
    await prisma.auditLog.create({ data: { ownerId: ownerId(request), action: `${config.path}.delete`, entity: config.model, entityId: id } });
    return { ok: true };
  });
}
