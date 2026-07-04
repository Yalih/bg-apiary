import { describe, expect, it } from 'vitest';
import { apiaryLocationFields21, normalizeApiaryLocationInput } from '../logic/apiaryLocation21';

describe('apiary location fields 2.1', () => {
  it('supports location name, latitude and longitude', () => {
    expect(apiaryLocationFields21).toEqual(['locationName', 'latitude', 'longitude']);
    expect(normalizeApiaryLocationInput({ locationName: 'Kolno', latitude: '52.3' as any, longitude: '21.1' as any })).toEqual({
      locationName: 'Kolno',
      latitude: 52.3,
      longitude: 21.1
    });
  });
});
