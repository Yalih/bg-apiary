import { describe, expect, it } from 'vitest';
import { UX_FIELD_MODE } from '../logic/uxRefresh20';

describe('hive details UX Refresh 2.0', () => {
  it('keeps hive details suitable for field use', () => {
    expect(UX_FIELD_MODE.reducedText).toBe(true);
    expect(UX_FIELD_MODE.largeButtons).toBe(true);
  });
});
