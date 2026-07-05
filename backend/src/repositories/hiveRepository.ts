import { prisma } from '../database/prisma.js';
import type { CreateHiveInput } from '../validators/hive.validators.js';

export async function listHives() {
  return prisma.hive.findMany({
    where: { deletedAt: null },
    orderBy: [{ apiary: { name: 'asc' } }, { hiveNumber: 'asc' }],
    include: {
      apiary: { select: { id: true, name: true } },
      _count: { select: { inspections: true, notes: true, tasks: true } }
    }
  });
}

export async function createHive(input: CreateHiveInput) {
  return prisma.hive.create({
    data: {
      apiaryId: input.apiaryId,
      hiveNumber: input.hiveNumber,
      hiveType: input.hiveType,
      status: input.status ?? 'ACTIVE',
      frameCount: input.frameCount
    }
  });
}
