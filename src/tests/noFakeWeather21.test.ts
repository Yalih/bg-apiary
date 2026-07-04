import { describe, expect, it } from 'vitest';
import { buildMissingLocationWeather } from '../logic/weatherAccuracy21';

describe('no fake weather 2.1', () => {
  it('does not pretend real weather when apiary has no location', () => {
    const result = buildMissingLocationWeather({ id: 'a1', name: 'Pasieka' } as any);
    expect(result.source).toBe('missing-location');
    expect(result.recommendation).toContain('Dodaj lokalizację pasieki');
    expect(result.temperatureC).toBeUndefined();
  });
});
