import { describe, expect, it } from 'vitest';
import { buildTaskFromForm, validateTaskForm } from '../logic/taskForms';

describe('task form 0.8', () => {
  it('validates required fields', () => {
    expect(validateTaskForm({
      apiaryId: '',
      hiveId: '',
      type: 'inspection',
      title: '',
      dueDate: '',
      priority: 'medium',
      description: '',
      targetAction: 'inspection'
    }).length).toBeGreaterThan(0);
  });

  it('builds manual task', () => {
    const task = buildTaskFromForm({
      apiaryId: 'apiary-1',
      hiveId: 'hive-1',
      type: 'feeding',
      title: 'Nakarmić',
      dueDate: '2026-07-02',
      priority: 'high',
      description: 'Opis',
      targetAction: 'feeding'
    });

    expect(task.status).toBe('open');
    expect(task.targetAction).toBe('feeding');
  });
});
