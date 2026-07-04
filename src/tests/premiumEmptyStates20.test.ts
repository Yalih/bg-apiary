import { describe, expect, it } from 'vitest';
import { PREMIUM_POLISH_EMPTY_ACTIONS } from '../logic/premiumPolish20';

describe('Premium empty states 2.0', () => {
  it('uses actions instead of useless messages', () => {
    expect(PREMIUM_POLISH_EMPTY_ACTIONS).toContain('Dodaj pierwszy ul');
    PREMIUM_POLISH_EMPTY_ACTIONS.forEach(action => expect(action).not.toContain('Brak danych'));
  });
});
