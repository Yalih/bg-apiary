import { z } from 'zod';

export const createHiveSchema = z.object({
  apiaryId: z.string().uuid(),
  hiveNumber: z.string().trim().min(1).max(40),
  hiveType: z.string().trim().min(2).max(80),
  status: z.enum(['ACTIVE', 'WEAK', 'WATCH', 'INACTIVE', 'LOST']).optional(),
  frameCount: z.number().int().min(0).max(80).optional()
});

export type CreateHiveInput = z.infer<typeof createHiveSchema>;
