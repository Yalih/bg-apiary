import { describe, expect, it } from 'vitest';
import { getQueenColor } from '../logic/queenColor';

describe('getQueenColor', () => {
  it('returns the official queen marking color cycle by year ending', () => {
    expect(getQueenColor(2026).label).toBe('biały');
    expect(getQueenColor(2025).label).toBe('niebieski');
    expect(getQueenColor(2024).label).toBe('zielony');
    expect(getQueenColor(2023).label).toBe('czerwony');
    expect(getQueenColor(2022).label).toBe('żółty');
    expect(getQueenColor(2021).label).toBe('biały');
    expect(getQueenColor(2020).label).toBe('niebieski');
  });
});
