import type { ApiaryState, SyncConflict, SyncEntityType, SyncHistoryItem, SyncOperation, SyncQueueItem, SyncStatus } from '../models/apiary';

export function createSyncQueueItem(entityType: SyncEntityType, entityId: string, operation: SyncOperation, payload: unknown): SyncQueueItem {
  return {
    id: `sync-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    entityType,
    entityId,
    operation,
    payload,
    createdAt: new Date().toISOString(),
    status: 'pending',
    retryCount: 0
  };
}

export function enqueueSync(state: ApiaryState, item: SyncQueueItem): ApiaryState {
  return { ...state, syncQueue: [item, ...(state.syncQueue ?? [])] };
}

export function getSyncStatus(state: ApiaryState): SyncStatus {
  if ((state.syncConflicts ?? []).some(conflict => !conflict.resolvedAt)) return 'conflict';
  if ((state.syncQueue ?? []).some(item => item.status === 'pending')) return 'pending';
  if ((state.syncQueue ?? []).some(item => item.status === 'syncing')) return 'syncing';
  if ((state.syncQueue ?? []).some(item => item.status === 'error')) return 'error';
  return 'synced';
}

export function createSyncHistory(state: ApiaryState, status: SyncStatus, message: string): SyncHistoryItem {
  return {
    id: `sync-history-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    date: new Date().toISOString(),
    status,
    changesCount: (state.syncQueue ?? []).length,
    conflictsCount: (state.syncConflicts ?? []).filter(conflict => !conflict.resolvedAt).length,
    message
  };
}

export function detectConflict(entityType: SyncEntityType, entityId: string, localVersion: unknown, remoteVersion: unknown): SyncConflict {
  return {
    id: `sync-conflict-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    entityType,
    entityId,
    localVersion,
    remoteVersion,
    detectedAt: new Date().toISOString()
  };
}

export function resolveConflict(conflict: SyncConflict, resolution: 'local' | 'remote' | 'merge'): SyncConflict {
  return { ...conflict, resolution, resolvedAt: new Date().toISOString() };
}

export function migrateLocalStorageToCloudReady(state: ApiaryState): ApiaryState {
  return {
    ...state,
    syncQueue: state.syncQueue ?? [],
    syncHistory: state.syncHistory ?? [],
    syncConflicts: state.syncConflicts ?? []
  };
}
