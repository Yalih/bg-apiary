import { describe, expect, it } from 'vitest';
import { BG_APIARY_NAV } from '../logic/bgApiaryPremium20';

describe('Dashboard premium 2.0', () => {
  it('keeps premium navigation labels', () => {
    expect(BG_APIARY_NAV).toEqual(['Pulpit', 'Ule', '+', 'Plan', 'Więcej']);
  });
});
