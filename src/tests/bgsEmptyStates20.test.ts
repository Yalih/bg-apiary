import { describe, expect, it } from 'vitest';
import { BGS_EMPTY_ACTIONS } from '../logic/bgsTheme20';

describe('BGS empty states 2.0', () => {
  it('uses action-based empty states', () => {
    expect(BGS_EMPTY_ACTIONS.apiaries).toBe('Dodaj pierwszą pasiekę');
    expect(BGS_EMPTY_ACTIONS.hives).toBe('Dodaj pierwszy ul');
    expect(BGS_EMPTY_ACTIONS.tasks).toBe('Dodaj zadanie');
    expect(BGS_EMPTY_ACTIONS.backup).toBe('Importuj kopię zapasową');
  });
});
