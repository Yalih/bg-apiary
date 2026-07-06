import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../db';

const paramsSchema = z.object({ id: z.string().uuid() });

function ownerId(request: { authUser?: { id: string } }) {
  if (!request.authUser?.id) throw new Error('Missing auth user');
  return request.authUser.id;
}

export async function hiveTimelineRoutes(app: FastifyInstance) {
  app.get('/hives/:id/timeline', { preHandler: app.authenticate }, async (request, reply) => {
    const { id } = paramsSchema.parse(request.params);
    const userId = ownerId(request);

    const hive = await prisma.hive.findFirst({
      where: { id, ownerId: userId, deletedAt: null },
      include: { apiary: true },
    });

    if (!hive) return reply.code(404).send({ message: 'Hive not found' });

    const [queens, inspections, feedings, treatments, tasks, notes] = await Promise.all([
      prisma.queen.findMany({ where: { hiveId: id, ownerId: userId, deletedAt: null }, orderBy: { updatedAt: 'desc' } }),
      prisma.inspection.findMany({ where: { hiveId: id, ownerId: userId, deletedAt: null }, orderBy: { inspectedAt: 'desc' } }),
      prisma.feeding.findMany({ where: { hiveId: id, ownerId: userId, deletedAt: null }, orderBy: { fedAt: 'desc' } }),
      prisma.treatment.findMany({ where: { hiveId: id, ownerId: userId, deletedAt: null }, orderBy: { treatedAt: 'desc' } }),
      prisma.task.findMany({ where: { hiveId: id, ownerId: userId, deletedAt: null }, orderBy: { updatedAt: 'desc' } }),
      prisma.note.findMany({ where: { hiveId: id, ownerId: userId, deletedAt: null }, orderBy: { createdAt: 'desc' } }),
    ]);

    const timeline = [
      ...inspections.map((item: any) => ({ id: `inspection-${item.id}`, date: item.inspectedAt, type: 'inspection', title: `Przegląd · siła ${item.strength ?? '-'}/10`, detail: item.note })),
      ...feedings.map((item: any) => ({ id: `feeding-${item.id}`, date: item.fedAt, type: 'feeding', title: item.type, detail: `${item.amount ?? ''}${item.unit ?? ''}`.trim() })),
      ...treatments.map((item: any) => ({ id: `treatment-${item.id}`, date: item.treatedAt, type: 'treatment', title: item.product, detail: item.note })),
      ...tasks.map((item: any) => ({ id: `task-${item.id}`, date: item.dueAt ?? item.updatedAt, type: 'task', title: item.title, detail: item.status })),
      ...notes.map((item: any) => ({ id: `note-${item.id}`, date: item.createdAt, type: 'note', title: item.title ?? 'Notatka', detail: item.body })),
      ...queens.map((item: any) => ({ id: `queen-${item.id}`, date: item.updatedAt, type: 'queen', title: item.line ?? item.name ?? 'Matka', detail: item.status })),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return {
      hive,
      summary: {
        inspections: inspections.length,
        feedings: feedings.length,
        treatments: treatments.length,
        tasks: tasks.filter((task: any) => task.status !== 'DONE').length,
        notes: notes.length,
        activeQueen: queens.find((queen: any) => ['ACTIVE', 'ACCEPTED', 'WATCH'].includes(queen.status)) ?? null,
      },
      timeline,
    };
  });
}
