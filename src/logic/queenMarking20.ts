export type QueenMarkingColor = 'biała' | 'żółta' | 'czerwona' | 'zielona' | 'niebieska';

export interface QueenMarking {
  color: QueenMarkingColor;
  cssClass: string;
  hex: string;
  description: string;
}

export function getQueenMarkingByYear(year: number): QueenMarking {
  const digit = Math.abs(year) % 10;

  if (digit === 1 || digit === 6) {
    return { color: 'biała', cssClass: 'queen-dot-white', hex: '#F5F7F5', description: 'Rok kończący się na 1 lub 6' };
  }

  if (digit === 2 || digit === 7) {
    return { color: 'żółta', cssClass: 'queen-dot-yellow', hex: '#F4C430', description: 'Rok kończący się na 2 lub 7' };
  }

  if (digit === 3 || digit === 8) {
    return { color: 'czerwona', cssClass: 'queen-dot-red', hex: '#D62828', description: 'Rok kończący się na 3 lub 8' };
  }

  if (digit === 4 || digit === 9) {
    return { color: 'zielona', cssClass: 'queen-dot-green', hex: '#2F7D46', description: 'Rok kończący się na 4 lub 9' };
  }

  return { color: 'niebieska', cssClass: 'queen-dot-blue', hex: '#1E88D8', description: 'Rok kończący się na 0 lub 5' };
}

export const QUEEN_MARKING_LEGEND: Array<{ years: string; color: QueenMarkingColor; hex: string }> = [
  { years: '1 / 6', color: 'biała', hex: '#F5F7F5' },
  { years: '2 / 7', color: 'żółta', hex: '#F4C430' },
  { years: '3 / 8', color: 'czerwona', hex: '#D62828' },
  { years: '4 / 9', color: 'zielona', hex: '#2F7D46' },
  { years: '5 / 0', color: 'niebieska', hex: '#1E88D8' }
];
