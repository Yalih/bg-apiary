import { describe, expect, it } from 'vitest';
import { applyInspectionToHive, buildEvent, buildFeeding, buildNote, closeTasksForAction, getNextActionAfterInspection, validateFeedingForm, validateInspectionForm, validateNoteForm } from '../logic/actions';
import { demoState } from '../data/demoData';

describe('actions', () => {
  const hive = demoState.hives[0];

  it('validates inspection form', () => {
    expect(validateInspectionForm({
      date: '',
      queenSeen: true,
      eggs: true,
      larvae: true,
      cappedBrood: true,
      cells: 0,
      strength: 5,
      mood: 'normalna',
      foodLevel: 'średni',
      frameCount: 6,
      summary: ''
    })).toContain('Data przeglądu jest wymagana.');
  });

  it('updates hive after inspection', () => {
    const next = applyInspectionToHive(hive, {
      date: '2026-07-02',
      queenSeen: true,
      eggs: true,
      larvae: true,
      cappedBrood: true,
      cells: 1,
      strength: 7,
      mood: 'spokojna',
      foodLevel: 'dobry',
      frameCount: 8,
      summary: ''
    });

    expect(next.lastInspectionAt).toBe('2026-07-02');
    expect(next.frameCount).toBe(8);
    expect(next.nextAction).toContain('mateczniki');
  });

  it('validates feeding and builds feeding', () => {
    expect(validateFeedingForm({ date: '2026-07-02', type: 'Syrop 1:1', amountLiters: 1, unit: 'l', reason: 'Rozwój', note: '' })).toEqual([]);
    expect(buildFeeding('hive-1', { date: '2026-07-02', type: 'Syrop 1:1', amountLiters: 1, unit: 'l', reason: 'Rozwój', note: '' }).hiveId).toBe('hive-1');
  });

  it('validates and builds note', () => {
    expect(validateNoteForm({ date: '2026-07-02', text: '' })).toContain('Treść notatki jest wymagana.');
    expect(buildNote('hive-1', { date: '2026-07-02', text: 'Sprawdzić rodzinę.' }).text).toBe('Sprawdzić rodzinę.');
  });

  it('builds timeline event', () => {
    expect(buildEvent('hive-1', '2026-07-02', 'note', 'Dodano notatkę', 'Treść').type).toBe('note');
  });

  it('creates note event with note type', () => {
    const event = buildEvent('hive-1', '2026-07-02', 'note', 'Dodano notatkę', 'Treść notatki');
    expect(event.title).toBe('Dodano notatkę');
    expect(event.details).toBe('Treść notatki');
  });

  it('closes matching action tasks', () => {
    const tasks = closeTasksForAction(demoState.tasks, 'hive-1', 'inspection');
    expect(tasks.find(task => task.id === 'task-4')?.status).toBe('done');
  });

  it('suggests feeding when food is low', () => {
    expect(getNextActionAfterInspection({
      date: '2026-07-02',
      queenSeen: true,
      eggs: true,
      larvae: true,
      cappedBrood: true,
      cells: 0,
      strength: 6,
      mood: 'spokojna',
      foodLevel: 'niski',
      frameCount: 7,
      summary: ''
    })).toBe('Podać pokarm');
  });
});
