import { describe, expect, it } from 'vitest';
import { simplifyRecommendation } from '../logic/uxRefresh20';

describe('assistant UX Refresh 2.0', () => {
  it('shortens long assistant recommendations', () => {
    const long = 'x'.repeat(200);
    expect(simplifyRecommendation(long).length).toBeLessThanOrEqual(120);
    expect(simplifyRecommendation('Krótko')).toBe('Krótko');
  });
});
