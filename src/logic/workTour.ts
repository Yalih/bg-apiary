import type { ApiaryState, Hive, Task, WorkTourProgress } from '../models/apiary';
import { getOpenTasks, isTaskDueToday, isTaskOverdue, priorityRank } from './tasks';
import { getHiveMapPosition } from './apiaryMap';

export function getTodayTasks(tasks: Task[], now = new Date()): Task[] {
  return getOpenTasks(tasks).filter(task => isTaskDueToday(task, now) || isTaskOverdue(task, now));
}

export function sortHivesForTour(hives: Hive[]): Hive[] {
  return [...hives].sort((a, b) => {
    const pa = getHiveMapPosition(a);
    const pb = getHiveMapPosition(b);
    if (pa.row !== pb.row) return pa.row - pb.row;
    if (pa.column !== pb.column) return pa.column - pb.column;
    return a.number - b.number;
  });
}

export function sortTasksForTour(tasks: Task[], hives: Hive[]): Task[] {
  const hiveOrder = new Map(sortHivesForTour(hives).map((hive, index) => [hive.id, index]));
  return [...tasks].sort((a, b) => {
    const apiaryCompare = a.apiaryId.localeCompare(b.apiaryId);
    if (apiaryCompare !== 0) return apiaryCompare;
    const orderA = hiveOrder.get(a.hiveId) ?? 9999;
    const orderB = hiveOrder.get(b.hiveId) ?? 9999;
    if (orderA !== orderB) return orderA - orderB;
    return priorityRank(b.priority) - priorityRank(a.priority) || a.dueDate.localeCompare(b.dueDate);
  });
}

export function buildTodayTour(state: ApiaryState, apiaryId?: string, now = new Date()): WorkTourProgress {
  const allToday = getTodayTasks(state.tasks, now);
  const tasks = apiaryId ? allToday.filter(task => task.apiaryId === apiaryId) : allToday;
  const ordered = sortTasksForTour(tasks, state.hives);
  const firstTask = ordered[0];
  return {
    id: `tour-${now.toISOString().slice(0, 10)}-${apiaryId ?? 'all'}`,
    date: now.toISOString().slice(0, 10),
    apiaryId,
    taskIds: ordered.map(task => task.id),
    completedTaskIds: [],
    currentHiveId: firstTask?.hiveId,
    startedAt: now.toISOString(),
    updatedAt: now.toISOString()
  };
}

export function getTourProgress(tour: WorkTourProgress): number {
  if (tour.taskIds.length === 0) return 100;
  return Math.round((tour.completedTaskIds.length / tour.taskIds.length) * 100);
}

export function getNextTourTask(tour: WorkTourProgress, tasks: Task[]): Task | undefined {
  return tour.taskIds.map(id => tasks.find(task => task.id === id)).find(task => task && !tour.completedTaskIds.includes(task.id));
}

export function completeTourTask(tour: WorkTourProgress, taskId: string, tasks: Task[]): WorkTourProgress {
  const completed = tour.completedTaskIds.includes(taskId) ? tour.completedTaskIds : [...tour.completedTaskIds, taskId];
  const next = tour.taskIds.map(id => tasks.find(task => task.id === id)).find(task => task && !completed.includes(task.id));
  return {
    ...tour,
    completedTaskIds: completed,
    currentHiveId: next?.hiveId,
    updatedAt: new Date().toISOString()
  };
}

export function batchCompleteTasks(tasks: Task[], taskIds: string[], now = new Date()): Task[] {
  const ids = new Set(taskIds);
  return tasks.map(task => ids.has(task.id) ? {
    ...task,
    status: 'done',
    completedAt: now.toISOString()
  } : task);
}

export function getDailyWorkStats(state: ApiaryState, now = new Date()) {
  const today = now.toISOString().slice(0, 10);
  const openToday = getTodayTasks(state.tasks, now);
  const doneToday = state.tasks.filter(task => task.completedAt?.slice(0, 10) === today);
  return {
    today,
    openToday: openToday.length,
    doneToday: doneToday.length,
    totalToday: openToday.length + doneToday.length,
    progress: openToday.length + doneToday.length === 0 ? 100 : Math.round((doneToday.length / (openToday.length + doneToday.length)) * 100)
  };
}
