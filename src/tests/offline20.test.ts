import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { createSyncQueueItem, enqueueSync, getSyncStatus } from '../logic/sync20';

describe('offline-first 2.0', () => {
  it('keeps local queue while offline', () => {
    const state = enqueueSync(demoState, createSyncQueueItem('task', 't1', 'create', { title: 'Praca offline' }));
    expect(getSyncStatus(state)).toBe('pending');
    expect(state.syncQueue?.[0].status).toBe('pending');
  });
});
