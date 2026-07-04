import { describe, expect, it } from 'vitest';
import { createEmptyState } from '../storage/emptyState';
import { createBackup } from '../logic/backup';
import { getVersionLabel } from '../logic/version20';

describe('final backup version 2.0', () => {
  it('uses unified final version labels', () => {
    expect(getVersionLabel()).toBe('2.0 FINAL');
    expect(createBackup(createEmptyState()).version).toBe('2.0 FINAL');
  });
});
