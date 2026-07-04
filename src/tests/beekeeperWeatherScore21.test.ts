import { describe, expect, it } from 'vitest';
import { evaluateBeekeeperWeather } from '../logic/weatherAccuracy21';

describe('beekeeper weather score 2.1', () => {
  it('evaluates good, careful and bad inspection conditions', () => {
    expect(evaluateBeekeeperWeather({ temperatureC: 22, precipitationMm: 0, windKmh: 10 }).recommendation).toBe('Dobre warunki do przeglądu');
    expect(evaluateBeekeeperWeather({ temperatureC: 14, precipitationMm: 0, windKmh: 12 }).recommendation).toBe('Można pracować ostrożnie');
    expect(evaluateBeekeeperWeather({ temperatureC: 9, precipitationMm: 0, windKmh: 12 }).recommendation).toBe('Lepiej odłożyć przegląd');
  });
});
