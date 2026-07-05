declare module '@prisma/client' {
  export class PrismaClient {
    constructor(options?: unknown);
    $disconnect(): Promise<void>;
    $queryRaw: any;
    user: any;
    apiary: any;
    hive: any;
    queen: any;
    inspection: any;
    feeding: any;
    treatment: any;
    task: any;
    note: any;
    photo: any;
    syncEvent: any;
    auditLog: any;
  }
}
