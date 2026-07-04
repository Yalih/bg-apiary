import { describe, expect, it } from 'vitest';
import { buildOpenMeteoUrl } from '../logic/weatherAccuracy21';

describe('open meteo weather 2.1', () => {
  it('builds keyless Open-Meteo URL with required fields', () => {
    const url = buildOpenMeteoUrl({ latitude: 52.4, longitude: 21.1 });
    expect(url).toContain('api.open-meteo.com');
    expect(url).toContain('temperature_2m');
    expect(url).toContain('apparent_temperature');
    expect(url).toContain('wind_gusts_10m');
    expect(url).toContain('uv_index');
    expect(url).toContain('forecast_days=7');
  });
});
