import { describe, expect, it } from 'vitest';
import { isTouchTargetLargeEnough, skeletonRows } from '../logic/rcSupport20';

describe('mobile layout 2.0 RC', () => {
  it('keeps touch targets and skeleton rows sensible', () => {
    expect(isTouchTargetLargeEnough(44)).toBe(true);
    expect(isTouchTargetLargeEnough(32)).toBe(false);
    expect(skeletonRows(4)).toEqual([1, 2, 3, 4]);
  });
});
