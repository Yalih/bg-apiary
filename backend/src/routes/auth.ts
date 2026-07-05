import type { FastifyInstance } from 'fastify';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '../db';
import { env } from '../env';

const registerSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(180).transform((email) => email.toLowerCase()),
  password: z.string().min(8).max(200),
});

const loginSchema = z.object({
  email: z.string().email().transform((email) => email.toLowerCase()),
  password: z.string().min(1),
});

function publicUser(user: { id: string; email: string; name: string; createdAt: Date }) {
  return { id: user.id, email: user.email, name: user.name, createdAt: user.createdAt };
}

export async function authRoutes(app: FastifyInstance) {
  app.post('/auth/register', async (request, reply) => {
    const input = registerSchema.parse(request.body);
    const exists = await prisma.user.findUnique({ where: { email: input.email } });
    if (exists) {
      return reply.code(409).send({ message: 'Email already exists' });
    }

    const passwordHash = await bcrypt.hash(input.password, 12);
    const user = await prisma.user.create({
      data: { email: input.email, name: input.name, passwordHash },
    });

    const token = app.jwt.sign(
      { email: user.email, name: user.name },
      { sub: user.id, expiresIn: env.jwtExpiresIn },
    );

    await prisma.auditLog.create({ data: { ownerId: user.id, action: 'auth.register', entity: 'user', entityId: user.id } });

    return reply.code(201).send({ token, user: publicUser(user) });
  });

  app.post('/auth/login', async (request, reply) => {
    const input = loginSchema.parse(request.body);
    const user = await prisma.user.findUnique({ where: { email: input.email } });
    if (!user || user.deletedAt) {
      return reply.code(401).send({ message: 'Invalid credentials' });
    }

    const ok = await bcrypt.compare(input.password, user.passwordHash);
    if (!ok) {
      return reply.code(401).send({ message: 'Invalid credentials' });
    }

    const token = app.jwt.sign(
      { email: user.email, name: user.name },
      { sub: user.id, expiresIn: env.jwtExpiresIn },
    );

    await prisma.auditLog.create({ data: { ownerId: user.id, action: 'auth.login', entity: 'user', entityId: user.id } });

    return { token, user: publicUser(user) };
  });

  app.get('/auth/me', { preHandler: app.authenticate }, async (request) => {
    const user = await prisma.user.findUniqueOrThrow({ where: { id: request.authUser!.id } });
    return { user: publicUser(user) };
  });
}
