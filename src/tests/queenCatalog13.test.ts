import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { buildQueenAcceptanceTasks, buildQueenCatalog, filterQueenCatalog, getQueenAgeMonths } from '../logic/queenCatalog';

describe('queen catalog 1.3', () => {
  it('builds catalog with current queens', () => {
    const catalog = buildQueenCatalog(demoState);
    expect(catalog.length).toBeGreaterThan(0);
    expect(catalog.some(item => item.current)).toBe(true);
  });

  it('filters queens by query', () => {
    const catalog = buildQueenCatalog(demoState);
    const result = filterQueenCatalog(catalog, { query: catalog[0].breed });
    expect(result.length).toBeGreaterThan(0);
  });

  it('calculates age in months', () => {
    expect(getQueenAgeMonths('2026-01-01', new Date('2026-07-01T12:00:00'))).toBe(6);
  });

  it('creates automatic queen acceptance tasks', () => {
    const tasks = buildQueenAcceptanceTasks(demoState.hives[0], '2026-07-01');
    expect(tasks).toHaveLength(4);
    expect(tasks.every(task => task.workCategory === 'queen')).toBe(true);
  });
});
