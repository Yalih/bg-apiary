export interface QueenColor {
  label: string;
  emoji: string;
  cssClass: string;
}

export function getQueenColor(year: number): QueenColor {
  const lastDigit = Math.abs(year) % 10;

  if (lastDigit === 1 || lastDigit === 6) {
    return { label: 'biały', emoji: '⚪', cssClass: 'queen-white' };
  }

  if (lastDigit === 2 || lastDigit === 7) {
    return { label: 'żółty', emoji: '🟡', cssClass: 'queen-yellow' };
  }

  if (lastDigit === 3 || lastDigit === 8) {
    return { label: 'czerwony', emoji: '🔴', cssClass: 'queen-red' };
  }

  if (lastDigit === 4 || lastDigit === 9) {
    return { label: 'zielony', emoji: '🟢', cssClass: 'queen-green' };
  }

  return { label: 'niebieski', emoji: '🔵', cssClass: 'queen-blue' };
}
