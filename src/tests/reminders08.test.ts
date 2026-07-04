import { describe, expect, it } from 'vitest';
import { buildReminderSummary } from '../logic/reminders';
import { demoState } from '../data/demoData';

describe('reminders 0.8', () => {
  it('creates morning and evening reminder summaries', () => {
    const summary = buildReminderSummary(demoState.tasks, new Date('2026-07-02T12:00:00'));
    expect(summary.morning).toContain('Masz dziś');
    expect(summary.evening.length).toBeGreaterThan(0);
  });
});
