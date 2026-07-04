import { describe, expect, it } from 'vitest';
import { createCloudUserProfile } from '../logic/auth20';
import { migrateLocalStorageToCloudReady } from '../logic/sync20';
import { demoState } from '../data/demoData';

describe('cloud-ready 2.0 RC', () => {
  it('is explicit about architecture without backend', () => {
    const profile = createCloudUserProfile('test@example.com', 'Tester');
    const migrated = migrateLocalStorageToCloudReady(demoState);
    expect(profile.passwordResetReady).toBe(true);
    expect(migrated.syncQueue).toEqual([]);
  });
});
