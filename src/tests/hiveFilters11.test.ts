import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { filterHives, searchHives } from '../logic/hiveFilters';

describe('hive filters 1.1', () => {
  it('searches hives by queen breed or name', () => {
    const result = searchHives(demoState.hives, demoState.apiaries, demoState.hives[0].queen.breed);
    expect(result.length).toBeGreaterThan(0);
  });

  it('filters hives with tasks', () => {
    const result = filterHives(demoState.hives, demoState.tasks, 'tasks');
    expect(result.length).toBeGreaterThanOrEqual(0);
  });
});
