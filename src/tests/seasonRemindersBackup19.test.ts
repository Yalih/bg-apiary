import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { createBackup, restoreBackup } from '../logic/backup';
import { buildSeasonReminders, createSeasonPlan } from '../logic/seasonPlanner';

describe('season reminders and backup 1.9', () => {
  it('creates reminders 30/14/7/1/0 days', () => {
    const plan = createSeasonPlan(2027, 'amatorska', 'produkcja_miodu');
    const reminders = buildSeasonReminders(plan);
    expect(reminders.some(item => item.offsetDays === 30)).toBe(true);
    expect(reminders.some(item => item.offsetDays === 0)).toBe(true);
  });

  it('keeps season plans in backup', () => {
    const plan = createSeasonPlan(2027, 'amatorska', 'produkcja_miodu');
    const backup = createBackup({ ...demoState, seasonPlans: [plan] });
    const restored = restoreBackup(backup);
    expect(backup.version).toBe('2.0 FINAL');
    expect(restored.seasonPlans?.[0].year).toBe(2027);
  });
});
