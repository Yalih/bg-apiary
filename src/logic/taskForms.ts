import type { Priority, Task, TaskTargetAction, TaskType, WorkCategory } from '../models/apiary';
import { getTargetActionForType, getWorkCategoryForType } from './tasks';

export interface TaskForm {
  apiaryId: string;
  hiveId: string;
  type: TaskType;
  title: string;
  dueDate: string;
  priority: Priority;
  description: string;
  targetAction: TaskTargetAction;
  workCategory?: WorkCategory;
}

export function validateTaskForm(form: TaskForm): string[] {
  const errors: string[] = [];
  if (!form.apiaryId) errors.push('Pasieka jest wymagana.');
  if (!form.hiveId) errors.push('Ul jest wymagany.');
  if (!form.title.trim()) errors.push('Tytuł zadania jest wymagany.');
  if (!form.dueDate) errors.push('Termin jest wymagany.');
  return errors;
}

export function buildTaskFromForm(form: TaskForm): Task {
  return {
    id: `task-manual-${Date.now()}`,
    hiveId: form.hiveId,
    apiaryId: form.apiaryId,
    title: form.title.trim(),
    dueDate: form.dueDate,
    priority: form.priority,
    status: 'open',
    type: form.type,
    description: form.description.trim(),
    createdAt: new Date().toISOString().slice(0, 10),
    targetAction: form.targetAction || getTargetActionForType(form.type),
    workCategory: form.workCategory ?? getWorkCategoryForType(form.type),
    reminderAt: `${form.dueDate}T07:00`,
    source: 'manual'
  };
}
