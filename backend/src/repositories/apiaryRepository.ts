import { prisma } from '../database/prisma.js';
import type { CreateApiaryInput } from '../validators/apiary.validators.js';

export async function listApiaries() {
  return prisma.apiary.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: 'desc' },
    include: {
      owner: { select: { id: true, email: true, displayName: true, role: true } },
      _count: { select: { hives: true } }
    }
  });
}

export async function createApiary(input: CreateApiaryInput & { ownerId: string }) {
  return prisma.apiary.create({
    data: {
      ownerId: input.ownerId,
      name: input.name,
      address: input.address,
      latitude: input.latitude,
      longitude: input.longitude
    }
  });
}

export async function findDefaultOwner() {
  return prisma.user.findFirst({
    where: { deletedAt: null },
    orderBy: { createdAt: 'asc' }
  });
}
