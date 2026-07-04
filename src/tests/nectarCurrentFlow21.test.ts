import { describe, expect, it } from 'vitest';
import { getCurrentNectarFlow } from '../logic/nectarAccuracy21';

describe('current nectar flow 2.1', () => {
  it('returns active local calendar nectar or honest no-flow message', () => {
    const flow = getCurrentNectarFlow({ apiaries: [], hives: [], tasks: [] } as any, null, null, new Date('2026-06-25'));
    expect(flow.label).toBe('Pożytek wyliczony lokalnie');
    expect(flow.recommendation.length).toBeGreaterThan(5);
  });
});
