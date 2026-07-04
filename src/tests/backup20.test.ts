import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { createBackup, restoreBackup } from '../logic/backup';
import { createCloudUserProfile } from '../logic/auth20';

describe('backup 2.0', () => {
  it('keeps 2.0 platform data in backup', () => {
    const backup = createBackup({ ...demoState, cloudProfile: createCloudUserProfile('a@b.pl', 'A'), syncQueue: [], auditLog: [], dataVersions: [], recommendations20: [], predictions: [], photoAnalyses: [] });
    const restored = restoreBackup(backup);
    expect(backup.version).toBe('2.0 FINAL');
    expect(restored.cloudProfile?.email).toBe('a@b.pl');
    expect(restored.syncQueue).toEqual([]);
    expect(restored.auditLog).toEqual([]);
  });
});
