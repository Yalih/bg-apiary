import { getAvailableQueenLines } from '../data/queenBreeds';

export interface ApiaryForm {
  name: string;
  location: string;
  description: string;
  imageEmoji: string;
  locationName?: string;
  latitude?: number | '';
  longitude?: number | '';
}

export interface HiveForm {
  apiaryId: string;
  name: string;
  type: string;
  frameCount: number;
  strength: number;
  mood: 'spokojna' | 'normalna' | 'nerwowa';
  foodLevel: 'niski' | 'średni' | 'dobry';
  lastInspectionAt: string;
  queenIntroducedAt: string;
  queenBreed: string;
  queenLine: string;
  notes: string;
}

export function getQueenYearFromDate(dateIso: string): number {
  const year = Number(dateIso.slice(0, 4));
  return Number.isFinite(year) ? year : new Date().getFullYear();
}

export function validateApiaryForm(form: ApiaryForm): string[] {
  const errors: string[] = [];

  if (!form.name.trim()) {
    errors.push('Nazwa pasieki jest wymagana.');
  }

  return errors;
}

export function validateHiveForm(form: HiveForm): string[] {
  const errors: string[] = [];

  if (!form.apiaryId) {
    errors.push('Pasieka jest wymagana.');
  }

  if (!form.name.trim()) {
    errors.push('Nazwa lub numer ula jest wymagany.');
  }

  if (!form.type) {
    errors.push('Typ ula jest wymagany.');
  }

  if (!form.queenIntroducedAt) {
    errors.push('Data poddania matki jest wymagana.');
  }

  if (!form.queenBreed) {
    errors.push('Rasa matki jest wymagana.');
  }

  if (!form.queenLine) {
    errors.push('Linia matki jest wymagana.');
  }

  if (!getAvailableQueenLines(form.queenBreed).includes(form.queenLine)) {
    errors.push('Wybrana linia nie pasuje do rasy matki.');
  }

  if (form.frameCount < 0 || form.frameCount > 30) {
    errors.push('Liczba ramek musi być w zakresie 0-30.');
  }

  if (form.strength < 0 || form.strength > 10) {
    errors.push('Siła rodziny musi być w zakresie 0-10.');
  }

  return errors;
}
