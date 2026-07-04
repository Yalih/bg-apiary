import { describe, expect, it } from 'vitest';
import { getQueenThoraxDotPosition } from '../logic/hiveDetailsIconPolish21';
import { getQueenDot } from '../logic/assetManager21';

describe('Queen thorax dot polish 2.1', () => {
  it('places dynamic queen dot on thorax by year', () => {
    expect(getQueenThoraxDotPosition()).toEqual({ left: '50%', top: '43%' });
    expect(getQueenDot(2029).asset).toContain('/queen/dots/green.svg');
    expect(getQueenDot(2030).asset).toContain('/queen/dots/blue.svg');
  });
});
