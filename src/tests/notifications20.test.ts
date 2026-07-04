import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { buildNotificationCenter } from '../logic/rcQuality20';

describe('notifications 2.0 RC', () => {
  it('builds notification center from existing signals', () => {
    const notifications = buildNotificationCenter(demoState);
    expect(Array.isArray(notifications)).toBe(true);
  });
});
