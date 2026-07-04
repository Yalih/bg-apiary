import { describe, expect, it } from 'vitest';
import { getOpenTasks } from '../logic/tasks';
import { demoState } from '../data/demoData';

describe('getOpenTasks', () => {
  it('sorts open tasks by priority', () => {
    const tasks = getOpenTasks(demoState.tasks);
    expect(tasks[0].priority).toBe('urgent');
    expect(tasks.every(task => task.status === 'open')).toBe(true);
  });
});
