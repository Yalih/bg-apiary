import { apiaryRepository } from '../repositories/index.js';
import type { CreateApiaryInput } from '../validators/apiary.validators.js';

export async function listApiaries() {
  return apiaryRepository.listApiaries();
}

export async function createApiary(input: CreateApiaryInput) {
  let ownerId: string | undefined = input.ownerId;
  if (!ownerId) {
    const defaultOwner = await apiaryRepository.findDefaultOwner();
    if (!defaultOwner) {
      const error = new Error('No user exists. Run prisma seed before creating apiaries without ownerId.');
      (error as Error & { statusCode?: number }).statusCode = 409;
      throw error;
    }
    ownerId = defaultOwner.id;
  }

  return apiaryRepository.createApiary({ ...input, ownerId: ownerId as string });
}
