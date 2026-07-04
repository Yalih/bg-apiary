import type { ApiaryState, AuditAction, SyncEntityType } from '../models/apiary';
import { createAuditLogEntry, createDataVersion } from './audit20';

export function recordFinalChange(
  state: ApiaryState,
  userId: string,
  userEmail: string,
  action: AuditAction,
  entityType: SyncEntityType,
  entityId: string,
  summary: string,
  before?: unknown,
  after?: unknown
): ApiaryState {
  const audit = createAuditLogEntry({ userId, userEmail, action, entityType, entityId, summary, before, after });
  const version = createDataVersion(entityType, entityId, userId, after ?? before ?? { entityId }, state.dataVersions ?? []);
  return {
    ...state,
    auditLog: [audit, ...(state.auditLog ?? [])],
    dataVersions: [version, ...(state.dataVersions ?? [])]
  };
}
