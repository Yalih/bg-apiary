import { describe, expect, it } from 'vitest';
import { buildAlertCenter, getHiveAlertLevel } from '../logic/alerts';
import { demoState } from '../data/demoData';

describe('alert center 0.8', () => {
  it('builds alerts from hives and tasks', () => {
    const alerts = buildAlertCenter(demoState, new Date('2026-07-02T12:00:00'));
    expect(alerts.length).toBeGreaterThan(0);
  });

  it('returns hive alert level', () => {
    const level = getHiveAlertLevel(demoState.hives[2], demoState, new Date('2026-07-02T12:00:00'));
    expect(['ok', 'watch', 'urgent']).toContain(level);
  });
});
