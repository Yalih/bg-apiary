import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { analyzeApiary, analyzeHive, analyzeHiveRisk, buildHiveRecommendations, recommendationToTask } from '../logic/assistant';

describe('assistant 1.0', () => {
  it('analyzes hive risk', () => {
    const hive = demoState.hives.find(item => item.id === 'hive-5')!;
    const risk = analyzeHiveRisk(demoState, hive, new Date('2026-07-02T12:00:00'));
    expect(['medium', 'high', 'critical']).toContain(risk.level);
    expect(risk.reasons.length).toBeGreaterThan(0);
  });

  it('creates feeding recommendation for low food hive', () => {
    const hive = demoState.hives.find(item => item.id === 'hive-5')!;
    const recommendations = buildHiveRecommendations(demoState, hive, new Date('2026-07-02T12:00:00'));
    expect(recommendations.some(item => item.targetAction === 'feeding')).toBe(true);
  });

  it('analyzes full hive', () => {
    const hive = demoState.hives[0];
    const analysis = analyzeHive(demoState, hive, new Date('2026-07-02T12:00:00'));
    expect(analysis.hive.id).toBe(hive.id);
    expect(analysis.queen.details.length).toBeGreaterThan(0);
    expect(analysis.development.details.length).toBeGreaterThan(0);
  });

  it('analyzes whole apiary', () => {
    const summary = analyzeApiary(demoState, new Date('2026-07-02T12:00:00'));
    expect(summary.recommendations.length).toBeGreaterThan(0);
    expect(['stable', 'watch', 'risk']).toContain(summary.health);
  });

  it('turns recommendation into task', () => {
    const hive = demoState.hives.find(item => item.id === 'hive-5')!;
    const recommendation = buildHiveRecommendations(demoState, hive, new Date('2026-07-02T12:00:00'))[0];
    const task = recommendationToTask(recommendation, demoState);
    expect(task.hiveId).toBe(hive.id);
    expect(task.status).toBe('open');
  });
});
