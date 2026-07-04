import { describe, expect, it } from 'vitest';
import { LARGE_DATA_PROFILES_20, generateLargeData20, measureRcPerformance } from '../logic/largeData20';
import { buildColonyRanking } from '../logic/assistant20';

describe('performance 2.0 RC', () => {
  it('generates defined large data profiles', () => {
    expect(LARGE_DATA_PROFILES_20).toEqual([10, 50, 100, 250, 500, 1000]);
  });

  it('handles 1000 hives smoke test', () => {
    const state = generateLargeData20(1000);
    const perf = measureRcPerformance(state);
    const ranking = buildColonyRanking(state);
    expect(perf.hives).toBe(1000);
    expect(ranking).toHaveLength(1000);
  });
});
