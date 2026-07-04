import { describe, expect, it } from 'vitest';
import { getHiveIllustrationState } from '../logic/bgsVisual20';

describe('Hive illustration state 2.0', () => {
  it('reacts visually to hive state without changing data', () => {
    expect(getHiveIllustrationState(9)).toBe('strong');
    expect(getHiveIllustrationState(6)).toBe('medium');
    expect(getHiveIllustrationState(2)).toBe('weak');
    expect(getHiveIllustrationState(8, true)).toBe('quarantine');
    expect(getHiveIllustrationState(8, false, true)).toBe('alert');
  });
});
