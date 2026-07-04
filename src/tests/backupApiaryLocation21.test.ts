import { describe, expect, it } from 'vitest';
import { mergeApiaryLocation } from '../logic/apiaryLocation21';

describe('backup apiary location 2.1', () => {
  it('stores location fields directly on apiary for backup compatibility', () => {
    const apiary = { id: 'a1', name: 'A', location: '', description: '', imageEmoji: '' } as any;
    const updated = mergeApiaryLocation(apiary, { locationName: 'Kolno', latitude: 52.4, longitude: 21.2 }) as any;
    expect(updated.locationName).toBe('Kolno');
    expect(updated.latitude).toBe(52.4);
    expect(JSON.stringify(updated)).toContain('longitude');
  });
});
