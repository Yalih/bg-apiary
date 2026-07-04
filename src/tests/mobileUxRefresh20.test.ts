import { describe, expect, it } from 'vitest';
import { UX_FIELD_MODE, isModernTouchTarget } from '../logic/uxRefresh20';

describe('mobile UX Refresh 2.0', () => {
  it('keeps field mode and touch targets comfortable', () => {
    expect(isModernTouchTarget(44)).toBe(true);
    expect(isModernTouchTarget(32)).toBe(false);
    expect(UX_FIELD_MODE.maxVisibleInfoInFieldMode).toBe(5);
    expect(UX_FIELD_MODE.oneHandFriendly).toBe(true);
  });
});
