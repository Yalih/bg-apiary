import { describe, expect, it } from 'vitest';
import { BG_APIARY_NAV } from '../logic/bgApiaryPremium20';

describe('Premium bottom nav 2.0', () => {
  it('uses Polish premium navigation', () => {
    expect(BG_APIARY_NAV).toEqual(['Pulpit', 'Ule', '+', 'Plan', 'Więcej']);
  });
});
