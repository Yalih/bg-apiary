import { z } from 'zod';

export const createApiarySchema = z.object({
  ownerId: z.string().uuid().optional(),
  name: z.string().trim().min(2).max(120),
  address: z.string().trim().max(255).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional()
});

export type CreateApiaryInput = z.infer<typeof createApiarySchema>;
