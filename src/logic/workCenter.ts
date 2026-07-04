import type { Apiary, ApiaryState, Priority, Task, WorkCategory } from '../models/apiary';
import { getOpenTasks, isTaskDueToday, isTaskOverdue, normalizeTask } from './tasks';

export function getWorkCategory(task: Task): WorkCategory {
  if (task.workCategory) return task.workCategory;
  if (task.type === 'inspection') return 'inspection';
  if (task.type === 'feeding') return 'feeding';
  if (task.type === 'queen') return 'queen';
  if (task.type === 'expansion') return 'expansion';
  if (task.type === 'treatment') return 'treatment';
  if (task.type === 'harvest') return 'harvest';
  if (task.type === 'wintering') return 'wintering';
  if (task.type === 'note') return 'note';
  return 'other';
}

export function workCategoryLabel(category: WorkCategory): string {
  return {
    inspection: 'Przeglądy',
    feeding: 'Karmienie',
    queen: 'Matki',
    expansion: 'Poszerzanie',
    treatment: 'Leczenie',
    harvest: 'Miodobranie',
    wintering: 'Zimowla',
    split: 'Odkłady',
    note: 'Notatki',
    other: 'Inne'
  }[category];
}

export function workCategoryIcon(category: WorkCategory): string {
  return {
    inspection: '🔍',
    feeding: '🍯',
    queen: '👑',
    expansion: '➕',
    treatment: '🧪',
    harvest: '🍯',
    wintering: '❄️',
    split: '🐝',
    note: '📝',
    other: '✅'
  }[category];
}

export interface WorkGroup {
  category: WorkCategory;
  label: string;
  icon: string;
  tasks: Task[];
}

export function groupTasksByWorkCategory(tasks: Task[]): WorkGroup[] {
  const open = getOpenTasks(tasks.map(normalizeTask));
  const categories: WorkCategory[] = ['inspection', 'feeding', 'queen', 'expansion', 'treatment', 'harvest', 'wintering', 'split', 'note', 'other'];
  return categories
    .map(category => ({
      category,
      label: workCategoryLabel(category),
      icon: workCategoryIcon(category),
      tasks: open.filter(task => getWorkCategory(task) === category)
    }))
    .filter(group => group.tasks.length > 0);
}

export function groupTasksByApiary(tasks: Task[], apiaries: Apiary[]): { apiary: Apiary; tasks: Task[] }[] {
  return apiaries
    .map(apiary => ({ apiary, tasks: tasks.filter(task => task.apiaryId === apiary.id) }))
    .filter(group => group.tasks.length > 0);
}

export function filterTasksByPriority(tasks: Task[], priority: Priority | 'all'): Task[] {
  if (priority === 'all') return tasks;
  return tasks.filter(task => task.priority === priority);
}

export function getWorkBuckets(tasks: Task[]) {
  const open = getOpenTasks(tasks.map(normalizeTask));
  return {
    overdue: open.filter(task => isTaskOverdue(task)),
    today: open.filter(task => !isTaskOverdue(task) && isTaskDueToday(task)),
    next: open.filter(task => !isTaskOverdue(task) && !isTaskDueToday(task)),
    urgent: open.filter(task => task.priority === 'urgent' || task.priority === 'high')
  };
}
