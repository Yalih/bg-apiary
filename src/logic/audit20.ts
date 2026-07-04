import type { ApiaryState, AuditAction, AuditLogEntry, DataVersion, SyncEntityType } from '../models/apiary';

export function createAuditLogEntry(input: Omit<AuditLogEntry, 'id' | 'date'>): AuditLogEntry {
  return {
    id: `audit-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    date: new Date().toISOString(),
    ...input
  };
}

export function addAuditLog(state: ApiaryState, entry: AuditLogEntry): ApiaryState {
  return { ...state, auditLog: [entry, ...(state.auditLog ?? [])] };
}

export function auditChange(state: ApiaryState, userId: string, userEmail: string, action: AuditAction, entityType: SyncEntityType, entityId: string, summary: string, before?: unknown, after?: unknown): ApiaryState {
  return addAuditLog(state, createAuditLogEntry({ userId, userEmail, action, entityType, entityId, summary, before, after }));
}

export function createDataVersion(entityType: SyncEntityType, entityId: string, createdBy: string, snapshot: unknown, previousVersions: DataVersion[] = []): DataVersion {
  const last = previousVersions.filter(version => version.entityType === entityType && version.entityId === entityId).sort((a, b) => b.version - a.version)[0];
  return {
    id: `version-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    entityType,
    entityId,
    version: (last?.version ?? 0) + 1,
    createdAt: new Date().toISOString(),
    createdBy,
    snapshot
  };
}

export function addDataVersion(state: ApiaryState, version: DataVersion): ApiaryState {
  return { ...state, dataVersions: [version, ...(state.dataVersions ?? [])] };
}

export function getLatestVersion(versions: DataVersion[], entityType: SyncEntityType, entityId: string): DataVersion | undefined {
  return versions.filter(version => version.entityType === entityType && version.entityId === entityId).sort((a, b) => b.version - a.version)[0];
}
