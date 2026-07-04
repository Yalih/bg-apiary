import type { ApiaryState } from '../models/apiary';

export type SearchResult20 = {
  id: string;
  type: 'pasieka' | 'ul' | 'matka' | 'zadanie' | 'klient' | 'partia' | 'raport' | 'modul';
  title: string;
  subtitle: string;
};

export function globalSearch20(state: ApiaryState, query: string): SearchResult20[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult20[] = [];

  state.apiaries.forEach(apiary => {
    if ([apiary.name, apiary.location].join(' ').toLowerCase().includes(q)) results.push({ id: apiary.id, type: 'pasieka', title: apiary.name, subtitle: apiary.location });
  });

  state.hives.forEach(hive => {
    const queen = [hive.queen.breed, hive.queen.line].join(' ');
    if ([hive.name, hive.type, queen].join(' ').toLowerCase().includes(q)) {
      results.push({ id: hive.id, type: 'ul', title: hive.name, subtitle: `${hive.type} · ${queen}` });
    }
  });

  state.tasks.forEach(task => {
    if ([task.title, task.description].join(' ').toLowerCase().includes(q)) results.push({ id: task.id, type: 'zadanie', title: task.title, subtitle: task.dueDate });
  });

  (state.honeyCustomers ?? []).forEach(customer => {
    if ([customer.firstName, customer.lastName, customer.phone, customer.email].join(' ').toLowerCase().includes(q)) {
      results.push({ id: customer.id, type: 'klient', title: `${customer.firstName} ${customer.lastName}`, subtitle: customer.phone });
    }
  });

  (state.honeyBatches ?? []).forEach(batch => {
    if ([batch.batchNumber, batch.honeyType, batch.notes].join(' ').toLowerCase().includes(q)) results.push({ id: batch.id, type: 'partia', title: batch.batchNumber, subtitle: batch.honeyType });
  });

  ['Panel', 'Raporty', 'Magazyn', 'Zdrowie', 'Miodobrania', 'Plan sezonu', 'Asystent', 'Platforma'].forEach(name => {
    if (name.toLowerCase().includes(q)) results.push({ id: `module-${name}`, type: 'modul', title: name, subtitle: 'Moduł aplikacji' });
  });

  return results.slice(0, 25);
}
