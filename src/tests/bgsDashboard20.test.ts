import { describe, expect, it } from 'vitest';
import { BGS_NAV_LABELS } from '../logic/bgsTheme20';

describe('BGS Dashboard 2.0', () => {
  it('uses BGS daily-work navigation labels', () => {
    expect(BGS_NAV_LABELS).toEqual(['Pulpit', 'Ule', '+', 'Plan', 'Więcej']);
  });
});
