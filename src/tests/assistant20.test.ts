import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { buildColonyRanking, buildDailyPriority, buildHiveAIProfile, scoreColony } from '../logic/assistant20';

describe('assistant 2.0', () => {
  it('builds AI profile, score and ranking', () => {
    const hive = demoState.hives[0];
    const profile = buildHiveAIProfile(demoState, hive.id);
    const score = scoreColony(profile);
    const ranking = buildColonyRanking(demoState);
    expect(profile.hiveId).toBe(hive.id);
    expect(score.score).toBeGreaterThanOrEqual(0);
    expect(ranking.length).toBe(demoState.hives.length);
  });

  it('builds daily priority', () => {
    expect(buildDailyPriority(demoState)?.title).toBeDefined();
  });
});
