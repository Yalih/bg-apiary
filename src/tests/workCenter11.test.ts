import { describe, expect, it } from 'vitest';
import type { Task } from '../models/apiary';
import { groupTasksByWorkCategory, getWorkBuckets } from '../logic/workCenter';

const baseTask: Task = {
  id: 't1',
  hiveId: 'h1',
  apiaryId: 'a1',
  title: 'Zadanie',
  dueDate: new Date().toISOString().slice(0, 10),
  priority: 'medium',
  status: 'open',
  type: 'inspection',
  workCategory: 'inspection',
  description: '',
  createdAt: new Date().toISOString().slice(0, 10),
  targetAction: 'inspection',
  source: 'manual'
};

describe('work center 1.1', () => {
  it('groups tasks by work category', () => {
    const tasks: Task[] = [
      baseTask,
      { ...baseTask, id: 't2', type: 'feeding', workCategory: 'feeding', targetAction: 'feeding' }
    ];

    const groups = groupTasksByWorkCategory(tasks);
    expect(groups.map(group => group.category)).toContain('inspection');
    expect(groups.map(group => group.category)).toContain('feeding');
  });

  it('builds work buckets', () => {
    const buckets = getWorkBuckets([baseTask]);
    expect(buckets.today).toHaveLength(1);
  });
});
