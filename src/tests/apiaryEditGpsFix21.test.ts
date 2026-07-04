import { describe, expect, it } from 'vitest';
import { mergeApiaryLocation } from '../logic/apiaryLocation21';

describe('apiary edit gps fix 2.1', () => {
  it('updates location on existing apiary without changing model shape', () => {
    const apiary = { id: 'a1', name: 'Pasieka', location: 'Stara', description: '', imageEmoji: '' } as any;
    const updated = mergeApiaryLocation(apiary, { locationName: 'Nowa lokalizacja', latitude: 52.1, longitude: 21.2 }) as any;
    expect(updated.id).toBe('a1');
    expect(updated.locationName).toBe('Nowa lokalizacja');
    expect(updated.latitude).toBe(52.1);
    expect(updated.longitude).toBe(21.2);
  });
});
