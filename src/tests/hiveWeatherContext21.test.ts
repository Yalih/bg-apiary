import { describe, expect, it } from 'vitest';
import { selectApiaryForWeather } from '../logic/weatherAccuracy21';

describe('hive weather context 2.1', () => {
  it('uses apiary of active hive', () => {
    const state = {
      apiaries: [{ id: 'a1', name: 'A1' }, { id: 'a2', name: 'A2' }],
      hives: [{ id: 'h1', apiaryId: 'a2' }],
      tasks: []
    } as any;
    expect(selectApiaryForWeather(state, { hiveId: 'h1' })?.id).toBe('a2');
  });
});
