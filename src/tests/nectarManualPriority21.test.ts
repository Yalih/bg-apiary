import { describe, expect, it } from 'vitest';
import { getCurrentNectarFlow } from '../logic/nectarAccuracy21';

describe('manual nectar priority 2.1', () => {
  it('uses manually entered apiary nectar first', () => {
    const apiary = { id: 'a1', name: 'Pasieka', nectarFlow: 'facelia' } as any;
    const flow = getCurrentNectarFlow({ apiaries: [apiary], hives: [], tasks: [] } as any, apiary, null, new Date('2026-01-01'));
    expect(flow.name).toBe('facelia');
    expect(flow.source).toBe('manual');
  });
});
