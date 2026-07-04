import { describe, expect, it } from 'vitest';
import { getApiaryCoordinates, selectApiaryForWeather } from '../logic/weatherAccuracy21';

describe('apiary weather location 2.1', () => {
  it('selects the only apiary automatically and reads coordinates', () => {
    const apiary = { id: 'a1', name: 'Pasieka Kolno', latitude: 52.4, longitude: 21.1 } as any;
    const state = { apiaries: [apiary], hives: [], tasks: [] } as any;
    expect(selectApiaryForWeather(state)?.id).toBe('a1');
    expect(getApiaryCoordinates(apiary)).toEqual({ latitude: 52.4, longitude: 21.1 });
  });
});
