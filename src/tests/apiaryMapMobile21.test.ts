import { describe, expect, it } from 'vitest';
import { apiaryMapMobileRules21 } from '../logic/apiaryMapPremium21';

describe('apiary map mobile 2.1', () => {
  it('keeps mobile map rules', () => {
    expect(apiaryMapMobileRules21.minTilePx).toBeGreaterThanOrEqual(88);
    expect(apiaryMapMobileRules21.scrollOnlyMapArea).toBe(true);
    expect(apiaryMapMobileRules21.fullPageHorizontalScroll).toBe(false);
  });
});
