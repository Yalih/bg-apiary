import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { buildDailyPriority, buildPredictions20, buildRecommendations20 } from '../logic/assistant20';

describe('assistant dashboard 2.0 RC2', () => {
  it('feeds owner panel with priority, recommendations and predictions', () => {
    expect(buildDailyPriority(demoState)?.title).toBeDefined();
    expect(Array.isArray(buildRecommendations20(demoState))).toBe(true);
    expect(buildPredictions20(demoState).length).toBe(demoState.hives.length);
  });
});
