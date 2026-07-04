import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { buildApiaryReport, buildGlobalReport, buildHiveReport } from '../logic/reports';

describe('reports 0.9', () => {
  it('builds global report', () => {
    expect(buildGlobalReport(demoState)).toContain('Raport BgApiary');
  });

  it('builds hive report', () => {
    const hive = demoState.hives[0];
    expect(buildHiveReport(demoState, hive)).toContain(hive.name);
  });

  it('builds apiary report', () => {
    expect(buildApiaryReport(demoState, demoState.apiaries[0].id)).toContain('Raport pasieki');
  });
});
