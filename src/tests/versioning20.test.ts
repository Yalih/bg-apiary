import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { addDataVersion, createDataVersion, getLatestVersion } from '../logic/audit20';

describe('versioning 2.0', () => {
  it('creates versions and returns latest snapshot', () => {
    const hive = demoState.hives[0];
    const first = createDataVersion('hive', hive.id, 'u1', hive);
    const second = createDataVersion('hive', hive.id, 'u1', { ...hive, strength: 9 }, [first]);
    const state = addDataVersion(demoState, first);
    expect(state.dataVersions).toHaveLength(1);
    expect(second.version).toBe(2);
    expect(getLatestVersion([first, second], 'hive', hive.id)?.version).toBe(2);
  });
});
