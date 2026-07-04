import { describe, expect, it } from 'vitest';
import { createEmptyState } from '../storage/emptyState';
import { buildNectarWeatherSummary, getNectarStage } from '../logic/nectarWeather20';
import { fallbackWeather } from '../logic/weather20';

describe('Nectar flow and weather 2.0', () => {
  it('does not pretend global nectar api exists', () => {
    const summary = buildNectarWeatherSummary(createEmptyState(), fallbackWeather(), '2026-07-01');
    expect(summary.stage).toBe('brak');
    expect(summary.recommendation).toContain('kalendarzu');
  });

  it('calculates stage from local nectar calendar', () => {
    const flow = { id: 'n1', apiaryId: 'a1', name: 'Lipa', startDate: '2026-07-01', endDate: '2026-07-20', expectedStrength: 'mocny' as const, notes: '' };
    expect(getNectarStage(flow, '2026-07-10')).toBe('pełnia');
  });
});
