import type { Task } from '../models/apiary';
import { getOpenTasks, isTaskDueToday, isTaskOverdue } from './tasks';

export interface ReminderSummary {
  morning: string;
  evening: string;
  todayCount: number;
  overdueCount: number;
}

export function buildReminderSummary(tasks: Task[], now = new Date()): ReminderSummary {
  const open = getOpenTasks(tasks);
  const todayCount = open.filter(task => isTaskDueToday(task, now)).length;
  const overdueCount = open.filter(task => isTaskOverdue(task, now)).length;

  return {
    todayCount,
    overdueCount,
    morning: `Masz dziś ${todayCount} zadań i ${overdueCount} zaległych.`,
    evening: overdueCount + todayCount > 0
      ? `Zostało ${overdueCount + todayCount} zadań do dopilnowania.`
      : 'Na dziś wszystko wykonane.'
  };
}
