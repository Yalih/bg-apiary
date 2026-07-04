import { describe, expect, it } from 'vitest';
import { getHiveCondition } from '../logic/hiveStatus';
import { demoState } from '../data/demoData';

describe('getHiveCondition', () => {
  it('marks a hive with urgent task as urgent', () => {
    const hive = demoState.hives.find(item => item.id === 'hive-3')!;
    expect(getHiveCondition(hive, demoState.tasks, new Date('2026-07-02T12:00:00'))).toBe('urgent');
  });

  it('marks strong hive without urgent task as ok or attention based on dates', () => {
    const hive = demoState.hives.find(item => item.id === 'hive-2')!;
    const tasks = demoState.tasks.filter(task => task.hiveId !== hive.id);
    expect(getHiveCondition(hive, tasks, new Date('2026-07-02T12:00:00'))).toBe('ok');
  });
});
