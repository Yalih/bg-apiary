import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { buildNotificationCenter } from '../logic/rcQuality20';

describe('notifications integration 2.0 RC2', () => {
  it('builds notifications for owner panel', () => {
    const notifications = buildNotificationCenter(demoState);
    expect(Array.isArray(notifications)).toBe(true);
  });
});
