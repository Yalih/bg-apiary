import { describe, expect, it } from 'vitest';
import { createPhotoAnalysis } from '../logic/assistant20';

describe('photo metadata 2.0', () => {
  it('creates AI-ready photo metadata', () => {
    const analysis = createPhotoAnalysis('p1', 'h1', ['ramki', 'matka', 'czerw', 'miod']);
    expect(analysis.queenVisible).toBe(true);
    expect(analysis.broodVisible).toBe(true);
    expect(analysis.honeyVisible).toBe(true);
  });
});
