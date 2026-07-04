import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { buildApiaryMap, getHiveMapPosition } from '../logic/apiaryMap';

describe('apiary map 1.1', () => {
  it('creates fallback position from hive number', () => {
    const position = getHiveMapPosition({ ...demoState.hives[0], number: 5 });
    expect(position.row).toBe(2);
    expect(position.column).toBe(1);
  });

  it('builds rows', () => {
    const rows = buildApiaryMap(demoState.hives);
    expect(rows.length).toBeGreaterThan(0);
  });
});
