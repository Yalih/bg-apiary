import type { Hive, Priority, Task, TaskTargetAction, TaskType, WorkCategory } from '../models/apiary';
import { daysBetween } from './date';

export function getOpenTasks(tasks: Task[]): Task[] {
  return tasks
    .filter(task => task.status === 'open' || task.status === 'in_progress')
    .sort((a, b) => priorityRank(b.priority) - priorityRank(a.priority) || a.dueDate.localeCompare(b.dueDate));
}

export function priorityRank(priority: Priority): number {
  return {
    low: 1,
    medium: 2,
    high: 3,
    urgent: 4
  }[priority];
}

export function getPriorityLabel(priority: Priority): string {
  return {
    low: 'Niskie',
    medium: 'Normalne',
    high: 'Wysokie',
    urgent: 'Krytyczne'
  }[priority];
}

export function getTaskTypeLabel(type: TaskType): string {
  return {
    inspection: 'Przegląd',
    feeding: 'Karmienie',
    queen: 'Kontrola matki',
    treatment: 'Leczenie',
    expansion: 'Poszerzenie',
    harvest: 'Miodobranie',
    wintering: 'Zimowla',
    note: 'Notatka',
    other: 'Inne'
  }[type];
}

export function getTargetActionForType(type: TaskType): TaskTargetAction {
  if (type === 'inspection') return 'inspection';
  if (type === 'feeding') return 'feeding';
  if (type === 'note') return 'note';
  if (type === 'queen') return 'queen_replacement';
  return 'open_hive';
}

export function getWorkCategoryForType(type: TaskType): WorkCategory {
  if (type === 'inspection') return 'inspection';
  if (type === 'feeding') return 'feeding';
  if (type === 'queen') return 'queen';
  if (type === 'expansion') return 'expansion';
  if (type === 'treatment') return 'treatment';
  if (type === 'harvest') return 'harvest';
  if (type === 'wintering') return 'wintering';
  if (type === 'note') return 'note';
  return 'other';
}

export function isTaskOverdue(task: Task, now = new Date()): boolean {
  const due = new Date(`${task.dueDate}T23:59:59`);
  return task.status === 'open' && due.getTime() < now.getTime();
}

export function isTaskDueToday(task: Task, now = new Date()): boolean {
  const today = now.toISOString().slice(0, 10);
  return task.status === 'open' && task.dueDate === today;
}

export function getUrgentTasks(tasks: Task[], now = new Date()): Task[] {
  return getOpenTasks(tasks).filter(task =>
    task.priority === 'urgent' ||
    task.priority === 'high' ||
    isTaskOverdue(task, now) ||
    isTaskDueToday(task, now)
  );
}

export function completeTask(tasks: Task[], taskId: string, now = new Date()): Task[] {
  return tasks.map(task => task.id === taskId ? {
    ...task,
    status: 'done',
    completedAt: now.toISOString()
  } : task);
}

export function getCalendarTasks(tasks: Task[]): Record<string, Task[]> {
  return getOpenTasks(tasks).reduce<Record<string, Task[]>>((acc, task) => {
    acc[task.dueDate] = acc[task.dueDate] ?? [];
    acc[task.dueDate].push(task);
    return acc;
  }, {});
}

export function buildAutomaticTasksAfterInspection(hive: Hive, cells: number, date: string): Task[] {
  const tasks: Task[] = [];
  const baseDate = new Date(`${date}T12:00:00`);

  if (cells > 0) {
    const due = new Date(baseDate);
    due.setDate(due.getDate() + 7);
    tasks.push(buildTask(hive, 'queen', 'Kontrola mateczników', due.toISOString().slice(0, 10), 'high', 'Po przeglądzie wykryto mateczniki.', 'open_hive', 'automatic'));
  }

  if (hive.foodLevel === 'niski') {
    const due = new Date(baseDate);
    due.setDate(due.getDate() + 1);
    tasks.push(buildTask(hive, 'feeding', 'Podać pokarm', due.toISOString().slice(0, 10), 'high', 'Poziom pokarmu oznaczony jako niski.', 'feeding', 'automatic'));
  }

  return tasks;
}

export function buildAutomaticTasksAfterFeeding(hive: Hive, date: string): Task[] {
  const due = new Date(`${date}T12:00:00`);
  due.setDate(due.getDate() + 3);
  return [
    buildTask(hive, 'inspection', 'Sprawdzić pobieranie pokarmu', due.toISOString().slice(0, 10), 'medium', 'Zadanie automatyczne po karmieniu.', 'inspection', 'automatic')
  ];
}

export function buildSeasonalTasks(hives: Hive[], now = new Date()): Task[] {
  const month = now.getMonth() + 1;
  const today = now.toISOString().slice(0, 10);
  const tasks: Task[] = [];

  for (const hive of hives) {
    if (month >= 3 && month <= 5 && hive.strength <= 5) {
      tasks.push(buildTask(hive, 'inspection', 'Wiosenna kontrola rozwoju', today, 'medium', 'Sezonowy harmonogram: sprawdź rozwój słabszej rodziny.', 'inspection', 'seasonal'));
    }

    if (month >= 6 && month <= 7) {
      if (hive.frameCount >= 7) {
        tasks.push(buildTask(hive, 'expansion', 'Sprawdzić miejsce w ulu', today, 'medium', 'Sezonowy harmonogram: szybki rozwój rodziny w pełni sezonu.', 'open_hive', 'seasonal'));
      }
    }

    if (month >= 8 && month <= 9) {
      tasks.push(buildTask(hive, 'wintering', 'Ocenić zapasy do zimowli', today, 'medium', 'Sezonowy harmonogram: przygotowanie do zimy.', 'open_hive', 'seasonal'));
    }
  }

  return tasks;
}

function buildTask(
  hive: Hive,
  type: TaskType,
  title: string,
  dueDate: string,
  priority: Priority,
  description: string,
  targetAction: TaskTargetAction,
  source: Task['source']
): Task {
  return {
    id: `task-${source}-${hive.id}-${type}-${dueDate}`,
    hiveId: hive.id,
    apiaryId: hive.apiaryId,
    title,
    dueDate,
    priority,
    status: 'open',
    type,
    description,
    createdAt: new Date().toISOString().slice(0, 10),
    targetAction,
    workCategory: getWorkCategoryForType(type),
    reminderAt: `${dueDate}T07:00`,
    source
  };
}

export function normalizeTask(task: Task): Task {
  return {
    ...task,
    description: task.description ?? '',
    createdAt: task.createdAt ?? task.dueDate,
    targetAction: task.targetAction ?? getTargetActionForType(task.type),
    workCategory: task.workCategory ?? getWorkCategoryForType(task.type),
    source: task.source ?? 'manual'
  };
}

export function daysUntilTask(task: Task, now = new Date()): number {
  return daysBetween(now.toISOString().slice(0, 10), new Date(`${task.dueDate}T12:00:00`));
}
