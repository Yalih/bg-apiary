import { describe, expect, it } from 'vitest';
import { getApiaryCoordinates } from '../logic/weatherAccuracy21';

describe('apiary weather uses own location 2.1', () => {
  it('reads coordinates from selected apiary', () => {
    expect(getApiaryCoordinates({ id: 'a1', name: 'A', location: '', description: '', imageEmoji: '', latitude: 52.4, longitude: 21.2 })).toEqual({ latitude: 52.4, longitude: 21.2 });
  });
});
