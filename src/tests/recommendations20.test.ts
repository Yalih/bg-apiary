import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { buildRecommendations20 } from '../logic/assistant20';

describe('recommendations 2.0', () => {
  it('builds rule-based recommendations', () => {
    const recommendations = buildRecommendations20(demoState);
    expect(Array.isArray(recommendations)).toBe(true);
  });
});
