import { describe, expect, it } from 'vitest';
import { buildOpenMeteoUrl, evaluateBeekeeperWeather, getFallbackCoordinates, parseApiaryCoordinates } from '../logic/weather20';

describe('Weather API 2.0', () => {
  it('builds Open-Meteo url without api key', () => {
    const url = buildOpenMeteoUrl({ latitude: 52.2, longitude: 21.0, label: 'test' });
    expect(url).toContain('api.open-meteo.com');
    expect(url).toContain('latitude=52.2');
    expect(url).not.toContain('key=');
  });

  it('parses coordinates or uses fallback', () => {
    expect(parseApiaryCoordinates('52.23, 21.01')?.latitude).toBe(52.23);
    expect(getFallbackCoordinates().label).toContain('zastępcza');
  });

  it('evaluates beekeeper weather', () => {
    expect(evaluateBeekeeperWeather({ temperatureC: 22, precipitationMm: 0, windKmh: 8, humidityPercent: 60, uvIndex: 4, cloudCoverPercent: 20 }).status).toBe('idealnie');
    expect(evaluateBeekeeperWeather({ temperatureC: 8, precipitationMm: 0, windKmh: 8, humidityPercent: 60, uvIndex: 2, cloudCoverPercent: 20 }).status).toBe('niezalecane');
  });
});
