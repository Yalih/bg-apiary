import { describe, expect, it } from 'vitest';
import { finalPremiumBreakpoints, finalPremiumChecklist, finalPremiumResult, FINAL_PREMIUM_AUDIT_VERSION } from '../logic/finalPremiumAudit21';

describe('BgApiary 2.1 Final Premium Audit', () => {
  it('covers all requested audit areas', () => {
    expect(FINAL_PREMIUM_AUDIT_VERSION).toBe('2.1-final-premium');
    expect(finalPremiumBreakpoints).toEqual([390, 430, 768, 1024]);
    expect(Object.values(finalPremiumChecklist).every(Boolean)).toBe(true);
    expect(finalPremiumResult.status).toBe('gotowe-do-testów-użytkownika');
  });
});
