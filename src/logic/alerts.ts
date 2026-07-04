import type { ApiaryState, Hive } from '../models/apiary';
import { getHiveCondition, getConditionLabel } from './hiveStatus';
import { getUrgentTasks } from './tasks';
import { daysBetween } from './date';

export interface AlertItem {
  id: string;
  hiveId: string;
  title: string;
  details: string;
  level: 'ok' | 'watch' | 'urgent';
}

export function buildAlertCenter(state: ApiaryState, now = new Date()): AlertItem[] {
  const alerts: AlertItem[] = [];

  for (const hive of state.hives) {
    const condition = getHiveCondition(hive, state.tasks, now);
    const days = daysBetween(hive.lastInspectionAt, now);

    if (condition !== 'ok') {
      alerts.push({
        id: `alert-status-${hive.id}`,
        hiveId: hive.id,
        title: `${hive.name}: ${getConditionLabel(condition)}`,
        details: `Ostatni przegląd: ${days} dni temu. Następne działanie: ${hive.nextAction}`,
        level: condition === 'urgent' ? 'urgent' : 'watch'
      });
    }

    if (hive.queen.year <= now.getFullYear() - 3) {
      alerts.push({
        id: `alert-queen-${hive.id}`,
        hiveId: hive.id,
        title: `${hive.name}: starsza matka`,
        details: `Matka rocznik ${hive.queen.year}. Warto rozważyć wymianę.`,
        level: 'watch'
      });
    }
  }

  for (const task of getUrgentTasks(state.tasks, now)) {
    alerts.push({
      id: `alert-task-${task.id}`,
      hiveId: task.hiveId,
      title: task.title,
      details: `Termin: ${task.dueDate}. Priorytet: ${task.priority}.`,
      level: task.priority === 'urgent' || task.priority === 'high' ? 'urgent' : 'watch'
    });
  }

  return alerts;
}

export function getHiveAlertLevel(hive: Hive, state: ApiaryState, now = new Date()): AlertItem['level'] {
  const alerts = buildAlertCenter(state, now).filter(alert => alert.hiveId === hive.id);
  if (alerts.some(alert => alert.level === 'urgent')) return 'urgent';
  if (alerts.length > 0) return 'watch';
  return 'ok';
}
