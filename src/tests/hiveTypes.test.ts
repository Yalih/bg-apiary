import { describe, expect, it } from 'vitest';
import { HIVE_TYPES } from '../data/hiveTypes';

describe('hive types', () => {
  it('contains required hive types from project assumptions', () => {
    expect(HIVE_TYPES).toContain('Warszawski Poszerzany');
    expect(HIVE_TYPES).toContain('Dadant Burnat');
    expect(HIVE_TYPES).toContain('Dadant Łysoń');
  });
});
