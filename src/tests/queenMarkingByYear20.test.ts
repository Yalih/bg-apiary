import { describe, expect, it } from 'vitest';
import { getQueenMarkingByYear } from '../logic/queenMarking20';

describe('queen marking by year 2.0', () => {
  it('uses international queen marking colors by year ending', () => {
    expect(getQueenMarkingByYear(2021).color).toBe('biała');
    expect(getQueenMarkingByYear(2022).color).toBe('żółta');
    expect(getQueenMarkingByYear(2023).color).toBe('czerwona');
    expect(getQueenMarkingByYear(2024).color).toBe('zielona');
    expect(getQueenMarkingByYear(2025).color).toBe('niebieska');
    expect(getQueenMarkingByYear(2026).color).toBe('biała');
    expect(getQueenMarkingByYear(2027).color).toBe('żółta');
    expect(getQueenMarkingByYear(2028).color).toBe('czerwona');
    expect(getQueenMarkingByYear(2029).color).toBe('zielona');
    expect(getQueenMarkingByYear(2030).color).toBe('niebieska');
  });
});
