import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@bgapiary.local' },
    update: {},
    create: {
      email: 'admin@bgapiary.local',
      passwordHash: 'seed-password-hash-change-before-production',
      displayName: 'BG Apiary Admin',
      role: 'ADMIN'
    }
  });

  const apiary = await prisma.apiary.upsert({
    where: { id: '00000000-0000-4000-8000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-4000-8000-000000000001',
      ownerId: admin.id,
      name: 'Pasieka demo',
      address: 'Środowisko testowe BG Apiary',
      latitude: 52.2297,
      longitude: 21.0122
    }
  });

  await prisma.hive.upsert({
    where: { apiaryId_hiveNumber: { apiaryId: apiary.id, hiveNumber: '1' } },
    update: {},
    create: {
      apiaryId: apiary.id,
      hiveNumber: '1',
      hiveType: 'Warszawski poszerzany',
      status: 'ACTIVE',
      frameCount: 7
    }
  });

  console.log('Seed completed:', { admin: admin.email, apiary: apiary.name });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
