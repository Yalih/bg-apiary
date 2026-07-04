import { describe, expect, it } from 'vitest';
import { shouldShowAdvancedFields } from '../logic/uxRefresh20';

describe('forms UX Refresh 2.0', () => {
  it('hides advanced fields when there are too many visible fields', () => {
    expect(shouldShowAdvancedFields(4)).toBe(false);
    expect(shouldShowAdvancedFields(7)).toBe(true);
  });
});
