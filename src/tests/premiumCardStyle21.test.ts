import { describe, expect, it } from 'vitest';
import { premiumCardStyle } from '../logic/premiumVisualSystem21';

describe('BgApiary 2.1 Premium card style', () => {
  it('uses one shared premium card style', () => {
    expect(premiumCardStyle.radius).toBe('28px');
    expect(premiumCardStyle.background).toBe('#FFFFFF');
    expect(premiumCardStyle.border).toContain('rgba(15, 61, 46');
  });
});
