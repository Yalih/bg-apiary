import { describe, expect, it } from 'vitest';
import { createEmptyState } from '../storage/emptyState';
import { migrateLocalStorageToCloudReady } from '../logic/sync20';

describe('migration 2.0', () => {
  it('empty state includes 2.0 collections', () => {
    const state = createEmptyState();
    expect(state.syncQueue).toEqual([]);
    expect(state.sharedMembers).toEqual([]);
    expect(state.recommendations20).toEqual([]);
    expect(state.photoAnalyses).toEqual([]);
  });

  it('migrates old state to cloud-ready collections', () => {
    const migrated = migrateLocalStorageToCloudReady({ ...createEmptyState(), syncQueue: undefined, syncHistory: undefined } as any);
    expect(migrated.syncQueue).toEqual([]);
    expect(migrated.syncHistory).toEqual([]);
  });
});
