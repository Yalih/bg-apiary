import { describe, expect, it } from 'vitest';
import { createEmptyState } from '../storage/emptyState';
import { migrateLocalStorageToCloudReady } from '../logic/sync20';

describe('migration 1.9 to 2.0 RC', () => {
  it('adds 2.0 collections without touching existing data', () => {
    const oldState = { ...createEmptyState(), syncQueue: undefined, syncHistory: undefined, syncConflicts: undefined } as any;
    const migrated = migrateLocalStorageToCloudReady(oldState);
    expect(migrated.apiaries).toEqual(oldState.apiaries);
    expect(migrated.syncQueue).toEqual([]);
    expect(migrated.syncConflicts).toEqual([]);
  });
});
