import { describe, expect, it } from 'vitest';
import { normalizeApiaryLocationInput } from '../logic/apiaryLocation21';

describe('gps apiary form 2.1', () => {
  it('normalizes GPS coordinates for apiary location', () => {
    const result = normalizeApiaryLocationInput({ locationName: 'GPS test', latitude: 52.4, longitude: 21.2 });
    expect(result.latitude).toBe(52.4);
    expect(result.longitude).toBe(21.2);
    expect(result.locationName).toBe('GPS test');
  });
});
