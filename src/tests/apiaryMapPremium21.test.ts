import { describe, expect, it } from 'vitest';
import { APIARY_MAP_PREMIUM_VERSION, getApiaryMapAttentionMessage21 } from '../logic/apiaryMapPremium21';

describe('apiary map premium 2.1', () => {
  it('defines premium map version and attention message', () => {
    expect(APIARY_MAP_PREMIUM_VERSION).toBe('2.1-apiary-map-polish');
    expect(getApiaryMapAttentionMessage21([], [])).toBe('Wszystkie ule wyglądają spokojnie');
  });
});
