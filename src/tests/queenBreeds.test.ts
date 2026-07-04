import { describe, expect, it } from 'vitest';
import { getAvailableQueenLines } from '../data/queenBreeds';

describe('queen lines', () => {
  it('returns Buckfast lines for Buckfast breed', () => {
    expect(getAvailableQueenLines('Buckfast')).toContain('B54');
    expect(getAvailableQueenLines('Buckfast')).toContain('Elgon');
  });

  it('returns Carnica/Krainka lines', () => {
    expect(getAvailableQueenLines('Krainka')).toContain('Sklenar G10');
    expect(getAvailableQueenLines('Carnica')).toContain('Nieska');
  });
});
