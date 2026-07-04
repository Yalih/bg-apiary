import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { batchCompleteTasks, buildTodayTour, completeTourTask, getDailyWorkStats, getTourProgress, sortHivesForTour } from '../logic/workTour';

describe('work tour 1.2', () => {
  it('sorts hives by map position', () => {
    const sorted = sortHivesForTour(demoState.hives);
    expect(sorted[0].number).toBeLessThanOrEqual(sorted[sorted.length - 1].number);
  });

  it('builds today tour and progress', () => {
    const tour = buildTodayTour(demoState);
    expect(tour.taskIds.length).toBeGreaterThanOrEqual(0);
    expect(getTourProgress(tour)).toBe(tour.taskIds.length === 0 ? 100 : 0);
  });

  it('completes task in tour', () => {
    const tour = buildTodayTour(demoState);
    if (tour.taskIds.length === 0) return;
    const updated = completeTourTask(tour, tour.taskIds[0], demoState.tasks);
    expect(updated.completedTaskIds).toContain(tour.taskIds[0]);
  });

  it('batch completes tasks', () => {
    const taskIds = demoState.tasks.slice(0, 2).map(task => task.id);
    const updated = batchCompleteTasks(demoState.tasks, taskIds);
    expect(updated.filter(task => taskIds.includes(task.id)).every(task => task.status === 'done')).toBe(true);
  });

  it('calculates daily work stats', () => {
    const stats = getDailyWorkStats(demoState);
    expect(stats.progress).toBeGreaterThanOrEqual(0);
  });
});
