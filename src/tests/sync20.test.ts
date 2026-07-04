import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { createSyncHistory, createSyncQueueItem, enqueueSync, getSyncStatus, migrateLocalStorageToCloudReady } from '../logic/sync20';

describe('sync 2.0', () => {
  it('queues changes and reports status', () => {
    const item = createSyncQueueItem('hive', 'h1', 'update', { strength: 8 });
    const state = enqueueSync(demoState, item);
    expect(state.syncQueue).toHaveLength(1);
    expect(getSyncStatus(state)).toBe('pending');
    expect(createSyncHistory(state, 'pending', 'test').changesCount).toBe(1);
  });

  it('migrates local storage to cloud-ready state', () => {
    const state = migrateLocalStorageToCloudReady(demoState);
    expect(state.syncQueue).toEqual([]);
    expect(state.syncHistory).toEqual([]);
  });
});
