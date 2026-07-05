import { hiveRepository } from '../repositories/index.js';
import type { CreateHiveInput } from '../validators/hive.validators.js';

export async function listHives() {
  return hiveRepository.listHives();
}

export async function createHive(input: CreateHiveInput) {
  return hiveRepository.createHive(input);
}
