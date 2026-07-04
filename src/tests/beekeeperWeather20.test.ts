import { describe, expect, it } from 'vitest';
import { evaluateBeekeeperWeather } from '../logic/weather20';

describe('Beekeeper weather logic 2.0', () => {
  it('warns against rain and strong wind', () => {
    expect(evaluateBeekeeperWeather({ temperatureC: 20, precipitationMm: 1, windKmh: 8, humidityPercent: 70, uvIndex: 3, cloudCoverPercent: 60 }).recommendation).toBe('Lepiej odłożyć prace');
    expect(evaluateBeekeeperWeather({ temperatureC: 20, precipitationMm: 0, windKmh: 35, humidityPercent: 70, uvIndex: 3, cloudCoverPercent: 60 }).status).toBe('niezalecane');
  });
});
