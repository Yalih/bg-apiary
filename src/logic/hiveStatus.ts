import type { Hive, Task, HiveCondition } from '../models/apiary';
import { daysBetween } from './date';

export function getHiveCondition(hive: Hive, tasks: Task[], now = new Date()): HiveCondition {
  const openTasks = tasks.filter(task => task.hiveId === hive.id && task.status === 'open');
  const hasUrgentTask = openTasks.some(task => task.priority === 'urgent' || task.priority === 'high');
  const daysFromInspection = daysBetween(hive.lastInspectionAt, now);

  if (hasUrgentTask || daysFromInspection >= 12 || hive.foodLevel === 'niski') {
    return 'urgent';
  }

  if (daysFromInspection >= 8 || hive.strength <= 4 || openTasks.length > 0) {
    return 'attention';
  }

  return 'ok';
}

export function getConditionLabel(condition: HiveCondition): string {
  if (condition === 'urgent') return 'Pilne';
  if (condition === 'attention') return 'Wymaga uwagi';
  return 'OK';
}
