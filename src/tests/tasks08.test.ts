import { describe, expect, it } from 'vitest';
import { buildAutomaticTasksAfterFeeding, buildAutomaticTasksAfterInspection, buildSeasonalTasks, getCalendarTasks, getTargetActionForType, getUrgentTasks, normalizeTask } from '../logic/tasks';
import { demoState } from '../data/demoData';

describe('tasks 0.8', () => {
  it('maps task type to target action', () => {
    expect(getTargetActionForType('inspection')).toBe('inspection');
    expect(getTargetActionForType('feeding')).toBe('feeding');
    expect(getTargetActionForType('queen')).toBe('queen_replacement');
  });

  it('groups tasks into calendar days', () => {
    const calendar = getCalendarTasks(demoState.tasks);
    expect(Object.keys(calendar).length).toBeGreaterThan(0);
  });

  it('finds urgent tasks', () => {
    expect(getUrgentTasks(demoState.tasks, new Date('2026-07-02T12:00:00')).length).toBeGreaterThan(0);
  });

  it('creates automatic task after inspection with cells', () => {
    const hive = demoState.hives[2];
    const tasks = buildAutomaticTasksAfterInspection(hive, 1, '2026-07-02');
    expect(tasks.some(task => task.type === 'queen')).toBe(true);
  });

  it('creates automatic task after feeding', () => {
    const hive = demoState.hives[4];
    const tasks = buildAutomaticTasksAfterFeeding(hive, '2026-07-02');
    expect(tasks[0].targetAction).toBe('inspection');
  });

  it('creates seasonal tasks', () => {
    const tasks = buildSeasonalTasks(demoState.hives, new Date('2026-06-15T12:00:00'));
    expect(tasks.length).toBeGreaterThan(0);
  });

  it('normalizes old task fields', () => {
    const task = normalizeTask({ ...demoState.tasks[0], description: undefined as unknown as string });
    expect(task.description).toBe('');
  });
});
