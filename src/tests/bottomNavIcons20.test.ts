import { describe, expect, it } from 'vitest';
import { BG_APIARY_NAV } from '../logic/bgApiaryPremium20';

describe('Bottom nav icons 2.0', () => {
  it('keeps expected visible navigation order', () => {
    expect(BG_APIARY_NAV).toEqual(['Pulpit', 'Ule', '+', 'Plan', 'Więcej']);
  });
});
