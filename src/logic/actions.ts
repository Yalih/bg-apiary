import type { Feeding, Hive, HiveEvent, HiveNote, Inspection, Task } from '../models/apiary';

export interface InspectionForm {
  date: string;
  queenSeen: boolean;
  eggs: boolean;
  larvae: boolean;
  cappedBrood: boolean;
  cells: number;
  strength: number;
  mood: Hive['mood'];
  foodLevel: Hive['foodLevel'];
  frameCount: number;
  summary: string;
}

export interface FeedingForm {
  date: string;
  type: string;
  amountLiters: number;
  unit: 'l' | 'kg';
  reason: string;
  note: string;
}

export interface NoteForm {
  date: string;
  text: string;
}

export function validateInspectionForm(form: InspectionForm): string[] {
  const errors: string[] = [];
  if (!form.date) errors.push('Data przeglądu jest wymagana.');
  if (form.cells < 0 || form.cells > 20) errors.push('Liczba mateczników musi być w zakresie 0-20.');
  if (form.strength < 0 || form.strength > 10) errors.push('Siła rodziny musi być w zakresie 0-10.');
  if (form.frameCount < 0 || form.frameCount > 30) errors.push('Liczba ramek musi być w zakresie 0-30.');
  return errors;
}

export function validateFeedingForm(form: FeedingForm): string[] {
  const errors: string[] = [];
  if (!form.date) errors.push('Data karmienia jest wymagana.');
  if (!form.type) errors.push('Rodzaj pokarmu jest wymagany.');
  if (form.amountLiters <= 0) errors.push('Ilość musi być większa od 0.');
  return errors;
}

export function validateNoteForm(form: NoteForm): string[] {
  if (!form.text.trim()) return ['Treść notatki jest wymagana.'];
  return [];
}

export function buildBroodText(form: InspectionForm): string {
  const items: string[] = [];
  if (form.eggs) items.push('jaja');
  if (form.larvae) items.push('larwy');
  if (form.cappedBrood) items.push('czerw kryty');
  return items.length ? items.join(', ') : 'brak zaznaczonego czerwiu';
}

export function getNextActionAfterInspection(form: InspectionForm): string {
  if (form.cells > 0) return 'Sprawdzić mateczniki przy następnym przeglądzie';
  if (form.foodLevel === 'niski') return 'Podać pokarm';
  if (form.strength <= 4) return 'Kontrola rozwoju rodziny';
  if (!form.queenSeen && !form.eggs && !form.larvae) return 'Sprawdzić obecność matki';
  return 'Kolejny przegląd według harmonogramu';
}

export function applyInspectionToHive(hive: Hive, form: InspectionForm): Hive {
  return {
    ...hive,
    lastInspectionAt: form.date,
    frameCount: form.frameCount,
    strength: form.strength,
    mood: form.mood,
    foodLevel: form.foodLevel,
    nextAction: getNextActionAfterInspection(form)
  };
}

export function buildInspection(hiveId: string, form: InspectionForm): Inspection {
  return {
    id: `inspection-${Date.now()}`,
    hiveId,
    date: form.date,
    summary: form.summary.trim() || 'Dodano przegląd ula.',
    brood: buildBroodText(form),
    queenSeen: form.queenSeen,
    eggs: form.eggs,
    larvae: form.larvae,
    cappedBrood: form.cappedBrood,
    cells: form.cells,
    strength: form.strength,
    mood: form.mood,
    foodLevel: form.foodLevel,
    frameCount: form.frameCount
  };
}

export function buildFeeding(hiveId: string, form: FeedingForm): Feeding {
  return {
    id: `feeding-${Date.now()}`,
    hiveId,
    date: form.date,
    type: form.type,
    amountLiters: form.amountLiters,
    unit: form.unit,
    reason: form.reason.trim() || 'Brak powodu',
    note: form.note.trim()
  };
}

export function buildNote(hiveId: string, form: NoteForm): HiveNote {
  return {
    id: `note-${Date.now()}`,
    hiveId,
    date: form.date,
    text: form.text.trim()
  };
}

export function buildEvent(hiveId: string, date: string, type: HiveEvent['type'], title: string, details: string): HiveEvent {
  return {
    id: `event-${type}-${Date.now()}`,
    hiveId,
    date,
    type,
    title,
    details
  };
}

export function closeTasksForAction(tasks: Task[], hiveId: string, type: 'inspection' | 'feeding' | 'note'): Task[] {
  return tasks.map(task => {
    if (task.hiveId === hiveId && task.status === 'open' && task.type === type) {
      return { ...task, status: 'done' };
    }
    return task;
  });
}
