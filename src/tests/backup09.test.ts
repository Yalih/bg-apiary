import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { createBackup, restoreBackup, validateBackup } from '../logic/backup';

describe('backup 0.9', () => {
  it('creates backup with version and roadmap', () => {
    const backup = createBackup(demoState);
    expect(backup.version).toBe('2.0 FINAL');
    expect(backup.roadmap10plus).toContain('Eksport PDF');
  });

  it('validates backup', () => {
    const backup = createBackup(demoState);
    expect(validateBackup(backup)).toBe(true);
    expect(validateBackup({ nope: true })).toBe(false);
  });

  it('restores backup state', () => {
    const backup = createBackup(demoState);
    const restored = restoreBackup(backup);
    expect(restored.hives.length).toBe(demoState.hives.length);
  });
});
