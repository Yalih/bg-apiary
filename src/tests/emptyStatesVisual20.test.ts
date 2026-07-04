import { describe, expect, it } from 'vitest';
import { VISUAL_POLISH_EMPTY_ACTIONS } from '../logic/visualPolish20';

describe('Empty states Visual Polish 2.0', () => {
  it('uses action-based empty states', () => {
    expect(VISUAL_POLISH_EMPTY_ACTIONS).toContain('Dodaj pierwszy ul');
    VISUAL_POLISH_EMPTY_ACTIONS.forEach(action => expect(action).not.toContain('Brak danych'));
  });
});
