import type { ApiaryState } from '../models/apiary';

export const demoState: ApiaryState = {
  apiaries: [
    {
      id: 'apiary-kolno',
      name: 'Pasieka Kolno',
      location: 'Kolno, gm. Poświętne',
      description: 'Główna pasieka stacjonarna. Start 2026: rodziny na WP poszerzanym.',
      imageEmoji: '🌳'
    },
    {
      id: 'apiary-duczki',
      name: 'Pasieka Duczki',
      location: 'Duczki',
      description: 'Planowana pasieka rozwojowa i miejsce pod przyszłe wywozy.',
      imageEmoji: '🌼'
    }
  ],
  hives: [
    {
      id: 'hive-1',
      apiaryId: 'apiary-kolno',
      number: 1,
      name: 'Ul 1',
      type: 'Warszawski Poszerzany',
      frameCount: 7,
      strength: 6,
      mood: 'normalna',
      foodLevel: 'średni',
      queen: { introducedAt: '2026-06-02', breed: 'Krainka', line: 'Sklenar G10', year: 2026 },
      lastInspectionAt: '2026-06-22',
      nextAction: 'Kontrola odbudowy i ilości czerwiu',
      notes: 'Rodzina po starcie pakietowym, wymaga regularnej obserwacji.'
    },
    {
      id: 'hive-2',
      apiaryId: 'apiary-kolno',
      number: 2,
      name: 'Ul 2',
      type: 'Warszawski Poszerzany',
      frameCount: 8,
      strength: 8,
      mood: 'spokojna',
      foodLevel: 'dobry',
      queen: { introducedAt: '2026-06-02', breed: 'Krainka', line: 'Nieska', year: 2026 },
      lastInspectionAt: '2026-06-25',
      nextAction: 'Rozważyć dołożenie ramki przy dalszym rozwoju',
      notes: 'Silna, spokojna rodzina. Dobry kandydat do dalszej obserwacji linii.'
    },
    {
      id: 'hive-3',
      apiaryId: 'apiary-kolno',
      number: 3,
      name: 'Ul 3',
      type: 'Warszawski Poszerzany',
      frameCount: 7,
      strength: 5,
      mood: 'normalna',
      foodLevel: 'średni',
      queen: { introducedAt: '2026-06-06', breed: 'Kaukaska', line: 'Kaukaska czysta', year: 2026 },
      lastInspectionAt: '2026-06-24',
      nextAction: 'Sprawdzić matecznik i jakość czerwienia',
      notes: 'W historii problem z akceptacją matki. Warto prowadzić dokładną historię.'
    },
    {
      id: 'hive-4',
      apiaryId: 'apiary-kolno',
      number: 4,
      name: 'Ul 4',
      type: 'Warszawski Poszerzany',
      frameCount: 7,
      strength: 6,
      mood: 'spokojna',
      foodLevel: 'dobry',
      queen: { introducedAt: '2026-06-09', breed: 'Krainka', line: 'Celle', year: 2026 },
      lastInspectionAt: '2026-06-23',
      nextAction: 'Kontrola równomierności czerwienia',
      notes: 'Rodzina stabilna, matka odnaleziona podczas ostatniego przeglądu.'
    },
    {
      id: 'hive-5',
      apiaryId: 'apiary-kolno',
      number: 5,
      name: 'Ul 5',
      type: 'Warszawski Poszerzany',
      frameCount: 5,
      strength: 4,
      mood: 'spokojna',
      foodLevel: 'niski',
      queen: { introducedAt: '2026-06-20', breed: 'Krainka', line: 'Dobra', year: 2026 },
      lastInspectionAt: '2026-06-21',
      nextAction: 'Podać syrop i kontrolować odbudowę węzy',
      notes: 'Świeżo osadzony pakiet. Węza odbudowana około 70%.'
    },
    {
      id: 'hive-6',
      apiaryId: 'apiary-duczki',
      number: 1,
      name: 'Dadant pokazowy',
      type: 'Dadant 10 Burnat',
      frameCount: 0,
      strength: 0,
      mood: 'normalna',
      foodLevel: 'średni',
      queen: { introducedAt: '2026-06-01', breed: 'Buckfast', line: 'B54', year: 2026 },
      lastInspectionAt: '2026-06-01',
      nextAction: 'Ul zapasowy/demo pod przyszłe wdrożenie Dadanta',
      notes: 'Przykład obsługi innego typu ula.'
    }
  ],
  inspections: [
    { id: 'insp-1', hiveId: 'hive-2', date: '2026-06-25', summary: 'Matka odnaleziona, dużo czerwiu, rodzina spokojna.', brood: 'jaja, larwy, czerw kryty', queenSeen: true, eggs: true, larvae: true, cappedBrood: true, cells: 0, strength: 8, mood: 'spokojna', foodLevel: 'dobry', frameCount: 8 },
    { id: 'insp-2', hiveId: 'hive-3', date: '2026-06-24', summary: 'Obecny czerw w różnych stadiach, stwierdzono matecznik cichej wymiany.', brood: 'wszystkie stadia', queenSeen: true, eggs: true, larvae: true, cappedBrood: true, cells: 1, strength: 5, mood: 'normalna', foodLevel: 'średni', frameCount: 7 },
    { id: 'insp-3', hiveId: 'hive-5', date: '2026-06-21', summary: 'Świeżo osadzony pakiet, odbudowa węzy około 70%.', brood: 'start rodziny', queenSeen: true, eggs: false, larvae: false, cappedBrood: false, cells: 0, strength: 4, mood: 'spokojna', foodLevel: 'niski', frameCount: 5 }
  ],
  feedings: [
    { id: 'feed-1', hiveId: 'hive-5', date: '2026-06-22', type: 'Syrop 1:1', amountLiters: 1.5, unit: 'l', reason: 'Rozwój i odbudowa węzy', note: 'Podane wieczorem.' },
    { id: 'feed-2', hiveId: 'hive-1', date: '2026-06-20', type: 'Syrop 1:1', amountLiters: 1, unit: 'l', reason: 'Stymulacja po starcie pakietu', note: '' },
    { id: 'feed-3', hiveId: 'hive-3', date: '2026-06-20', type: 'Syrop 1:1', amountLiters: 1, unit: 'l', reason: 'Wsparcie po wymianie matki', note: '' }
  ],
  events: [
    { id: 'ev-1', hiveId: 'hive-3', date: '2026-06-06', type: 'status', title: 'Poddano matkę', details: 'Matka kaukaska podana po problemie z brakiem matki.' },
    { id: 'ev-2', hiveId: 'hive-5', date: '2026-06-20', type: 'created', title: 'Osadzono pakiet', details: 'Rodzina wystartowała bardzo dobrze, spokojna przy wylotku.' },
    { id: 'ev-3', hiveId: 'hive-2', date: '2026-06-25', type: 'inspection', title: 'Przegląd', details: 'Rodzina silna, czerw w każdym stadium.' }
  ],
  notes: [
    { id: 'note-1', hiveId: 'hive-3', date: '2026-06-24', text: 'Pilnować matecznika cichej wymiany i jakości czerwienia.' }
  ],
  photos: [
    {
      id: 'photo-demo-1',
      hiveId: 'hive-2',
      linkedType: 'hive',
      date: '2026-06-25',
      title: 'Ramki po przeglądzie',
      description: 'Przykładowe zdjęcie placeholder zapisane lokalnie.',
      dataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"><rect width="100%" height="100%" fill="%23f6b93b"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="34" fill="%23241609">BgApiary photo demo</text></svg>'
    }
  ],
  tasks: [
    { id: 'task-1', hiveId: 'hive-3', apiaryId: 'apiary-kolno', title: 'Sprawdź matecznik cichej wymiany', dueDate: '2026-07-02', priority: 'urgent', status: 'open', type: 'queen', description: 'Kontrola matecznika i jakości czerwienia.', createdAt: '2026-06-24', targetAction: 'open_hive', reminderAt: '2026-07-02T07:00', source: 'manual' },
    { id: 'task-2', hiveId: 'hive-5', apiaryId: 'apiary-kolno', title: 'Podaj 1 l syropu i sprawdź odbudowę węzy', dueDate: '2026-07-02', priority: 'high', status: 'open', type: 'feeding', description: 'Wsparcie świeżo osadzonego pakietu.', createdAt: '2026-06-22', targetAction: 'feeding', reminderAt: '2026-07-02T07:00', source: 'manual' },
    { id: 'task-3', hiveId: 'hive-2', apiaryId: 'apiary-kolno', title: 'Rozważ dołożenie ramki', dueDate: '2026-07-04', priority: 'medium', status: 'open', type: 'expansion', description: 'Rodzina silna, warto sprawdzić miejsce.', createdAt: '2026-06-25', targetAction: 'open_hive', reminderAt: '2026-07-04T07:00', source: 'manual' },
    { id: 'task-4', hiveId: 'hive-1', apiaryId: 'apiary-kolno', title: 'Zrób przegląd kontrolny', dueDate: '2026-07-05', priority: 'medium', status: 'open', type: 'inspection', description: 'Kontrola czerwiu i pokarmu.', createdAt: '2026-06-22', targetAction: 'inspection', reminderAt: '2026-07-05T07:00', source: 'manual' }
  ],
  lastOpenedHiveId: 'hive-2'
};
