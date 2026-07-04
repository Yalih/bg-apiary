import { describe, expect, it } from 'vitest';
import { adjustNectarStrengthByWeather } from '../logic/nectarAccuracy21';

describe('nectar weather adjustment 2.1', () => {
  it('reduces nectar strength in bad weather', () => {
    expect(adjustNectarStrengthByWeather('mocny', { source: 'open-meteo', score: 'niezalecane', recommendation: '', temperatureC: 8, precipitationMm: 1, windKmh: 35 } as any)).toBe('średni');
  });
});
