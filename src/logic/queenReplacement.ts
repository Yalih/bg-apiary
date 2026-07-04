import type { DecisionEvent, Hive, HiveEvent, Queen, QueenHistoryEntry, QueenStatus } from '../models/apiary';

export interface QueenReplacementForm {
  date: string;
  reason: string;
  breed: string;
  line: string;
  year: number;
  introducedAt: string;
  origin: string;
  status: QueenStatus;
  marked: boolean;
  clippedWing: boolean;
  note: string;
  checkDate?: string;
}

export function validateQueenReplacementForm(form: QueenReplacementForm): string[] {
  const errors: string[] = [];
  if (!form.date) errors.push('Podaj datę wymiany.');
  if (!form.reason.trim()) errors.push('Podaj powód wymiany.');
  if (!form.breed.trim()) errors.push('Podaj rasę matki.');
  if (!form.line.trim()) errors.push('Podaj linię matki.');
  if (!form.introducedAt) errors.push('Podaj datę poddania matki.');
  if (!form.year || form.year < 2000) errors.push('Podaj poprawny rok matki.');
  return errors;
}

export function replaceQueen(hive: Hive, form: QueenReplacementForm): Hive {
  const oldQueen = hive.queen;
  const historyEntry: QueenHistoryEntry = {
    id: `queen-history-${Date.now()}`,
    hiveId: hive.id,
    introducedAt: oldQueen.introducedAt,
    replacedAt: form.date,
    breed: oldQueen.breed,
    line: oldQueen.line,
    year: oldQueen.year,
    status: 'replaced',
    origin: oldQueen.origin ?? 'brak danych',
    marked: oldQueen.marked ?? false,
    clippedWing: oldQueen.clippedWing ?? false,
    replacementReason: form.reason,
    note: form.note
  };

  const newQueen: Queen = {
    introducedAt: form.introducedAt,
    breed: form.breed,
    line: form.line,
    year: form.year,
    status: form.status,
    origin: form.origin,
    marked: form.marked,
    clippedWing: form.clippedWing
  };

  return {
    ...hive,
    queen: newQueen,
    familyStatus: 'queen_replacement',
    queenHistory: [historyEntry, ...(hive.queenHistory ?? [])],
    nextAction: form.checkDate ? `Skontrolować przyjęcie matki ${form.checkDate}` : 'Skontrolować przyjęcie matki'
  };
}

export function buildQueenReplacementEvent(hiveId: string, form: QueenReplacementForm): HiveEvent {
  return {
    id: `event-queen-${Date.now()}`,
    hiveId,
    date: form.date,
    type: 'queen_replacement',
    title: 'Wymieniono matkę',
    details: `${form.reason}. Nowa matka: ${form.breed} ${form.line}, ${form.year}.`
  };
}

export function buildQueenReplacementDecision(hiveId: string, form: QueenReplacementForm): DecisionEvent {
  return {
    id: `decision-queen-${Date.now()}`,
    hiveId,
    date: form.date,
    action: 'Wymiana matki',
    reason: form.reason,
    expectedEffect: 'Poprawa czerwienia, nastroju lub rozwoju rodziny',
    checkNeeded: Boolean(form.checkDate),
    checkDate: form.checkDate
  };
}
