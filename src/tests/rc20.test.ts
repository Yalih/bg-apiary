import { describe, expect, it } from 'vitest';
import { buildRcAuditSummary } from '../logic/rcQuality20';
import { demoState } from '../data/demoData';

describe('RC 2.0', () => {
  it('builds RC audit summary with honest cloud/AI messages', () => {
    const audit = buildRcAuditSummary(demoState);
    expect(audit.ready).toBe(true);
    expect(audit.cloudReadyMessage).toContain('bez podłączonego backendu');
    expect(audit.aiReadyMessage).toContain('bez realnej analizy zdjęć');
  });
});
