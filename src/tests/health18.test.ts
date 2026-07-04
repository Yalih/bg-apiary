import { describe, expect, it } from 'vitest';
import { calculateInfestationPercent, createVarroaMeasurement, getHealthRiskLevel, riskLabel } from '../logic/health';

describe('health 1.8', () => {
  it('calculates varroa infestation for sugar/alcohol tests', () => {
    expect(calculateInfestationPercent('cukier_puder', 9, 300)).toBe(3);
    expect(getHealthRiskLevel('cukier_puder', 3)).toBe('wysokie');
    expect(riskLabel('wysokie')).toBe('Wysokie ryzyko');
  });

  it('creates varroa measurement with risk', () => {
    const measurement = createVarroaMeasurement({
      hiveId: 'h1',
      date: '2026-07-01',
      method: 'alkohol',
      miteCount: 12,
      beesSampleCount: 300,
      notes: ''
    });
    expect(measurement.infestationPercent).toBe(4);
    expect(measurement.riskLevel).toBe('wysokie');
  });
});
