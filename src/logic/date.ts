export function daysBetween(dateIso: string, now = new Date()): number {
  const start = new Date(dateIso + 'T00:00:00');
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = end.getTime() - start.getTime();
  return Math.max(0, Math.floor(diff / 86400000));
}

export function formatRelativeDays(dateIso: string, now = new Date()): string {
  const days = daysBetween(dateIso, now);
  if (days === 0) return 'dzisiaj';
  if (days === 1) return 'wczoraj';
  return `${days} dni temu`;
}

export function isDue(dateIso: string, now = new Date()): boolean {
  const due = new Date(dateIso + 'T23:59:59');
  return due.getTime() <= now.getTime();
}
