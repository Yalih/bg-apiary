import { describe, expect, it } from 'vitest';
import { detectConflict, resolveConflict } from '../logic/sync20';

describe('conflicts 2.0', () => {
  it('detects and resolves conflicts', () => {
    const conflict = detectConflict('hive', 'h1', { strength: 8 }, { strength: 7 });
    const resolved = resolveConflict(conflict, 'merge');
    expect(conflict.entityType).toBe('hive');
    expect(resolved.resolution).toBe('merge');
    expect(resolved.resolvedAt).toBeDefined();
  });
});
