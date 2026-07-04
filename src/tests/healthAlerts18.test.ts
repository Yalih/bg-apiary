import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { buildHealthAlerts, buildHealthReport, createVarroaMeasurement, setHiveQuarantine } from '../logic/health';

describe('health alerts 1.8', () => {
  it('builds health alerts and report', () => {
    const hive = demoState.hives[0];
    const measurement = createVarroaMeasurement({
      hiveId: hive.id,
      date: '2026-07-01',
      method: 'alkohol',
      miteCount: 18,
      beesSampleCount: 300,
      notes: ''
    });
    const state = setHiveQuarantine({ ...demoState, varroaMeasurements: [measurement], treatments: [], hiveQuarantines: [] }, hive.id, 'kwarantanna', 'podejrzenie choroby', '');
    const alerts = buildHealthAlerts(state);
    const report = buildHealthReport(state);
    expect(alerts.length).toBeGreaterThan(0);
    expect(report.highVarroa).toBeGreaterThan(0);
    expect(report.alerts).toBeGreaterThan(0);
  });
});
