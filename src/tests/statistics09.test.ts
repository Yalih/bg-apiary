import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { getGlobalStats, getHiveStats, getMostActiveHive } from '../logic/statistics';

describe('statistics 0.9', () => {
  it('counts global statistics', () => {
    const stats = getGlobalStats(demoState);
    expect(stats.hives).toBeGreaterThan(0);
    expect(stats.photos).toBeGreaterThan(0);
  });

  it('counts hive statistics', () => {
    const hive = demoState.hives.find(item => item.id === 'hive-2')!;
    const stats = getHiveStats(demoState, hive);
    expect(stats.inspections).toBeGreaterThan(0);
    expect(stats.averageStrength).toBeGreaterThan(0);
  });

  it('finds most active hive', () => {
    expect(getMostActiveHive(demoState)?.id).toBeTruthy();
  });
});
