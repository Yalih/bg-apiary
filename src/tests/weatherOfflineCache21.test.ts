import { describe, expect, it } from 'vitest';
import { buildOfflineWeatherFromCache } from '../logic/weatherAccuracy21';

describe('weather offline cache 2.1', () => {
  it('shows last cached forecast message', () => {
    const apiary = { id: 'a1', name: 'Pasieka' } as any;
    const cached = { source: 'open-meteo', apiaryId: 'a1', recommendation: 'OK', score: 'idealnie', fetchedAt: '2026-07-03T10:00:00Z' } as any;
    const result = buildOfflineWeatherFromCache(apiary, cached);
    expect(result.source).toBe('offline-cache');
    expect(result.message).toContain('Ostatnia prognoza z');
  });
});
