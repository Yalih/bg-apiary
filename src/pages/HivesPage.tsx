import { useState } from 'react';
import type { ApiaryState } from '../models/apiary';
import { Section } from '../components/Section';
import { HiveCard } from '../components/HiveCard';
import { getHiveCondition } from '../logic/hiveStatus';
import { filterHives, searchHives, type HiveFilter } from '../logic/hiveFilters';

interface HivesPageProps {
  state: ApiaryState;
  apiaryId: string;
  onBack: () => void;
  onOpenHive: (hiveId: string) => void;
  onCreateHive: (apiaryId: string) => void;
  onOpenMap: (apiaryId: string) => void;
}

const filters: Array<{ value: HiveFilter; label: string }> = [
  { value: 'all', label: 'Wszystkie' },
  { value: 'inspection', label: 'Do przeglądu' },
  { value: 'feeding', label: 'Do karmienia' },
  { value: 'tasks', label: 'Z zadaniami' },
  { value: 'risk', label: 'Ryzyko' },
  { value: 'queenless', label: 'Bez matki' },
  { value: 'queen_replacement', label: 'Do wymiany matki' },
  { value: 'weak', label: 'Słabe' },
  { value: 'strong', label: 'Mocne' },
  { value: 'young_queen', label: 'Młoda matka' },
  { value: 'red_queen', label: 'Czerwona matka' },
  { value: 'green_queen', label: 'Zielona matka' },
  { value: 'wp', label: 'WP' },
  { value: 'dadant', label: 'Dadant' }
];

export function HivesPage({ state, apiaryId, onBack, onOpenHive, onCreateHive, onOpenMap }: HivesPageProps) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<HiveFilter>('all');
  const apiary = state.apiaries.find(item => item.id === apiaryId);
  const allHives = state.hives.filter(hive => hive.apiaryId === apiaryId);
  const hives = searchHives(filterHives(allHives, state.tasks, filter), state.apiaries, query);
  const urgentCount = allHives.filter(hive => getHiveCondition(hive, state.tasks) === 'urgent').length;
  const attentionCount = allHives.filter(hive => getHiveCondition(hive, state.tasks) === 'attention').length;

  if (!apiary) {
    return (
      <div className="empty-card">
        Nie znaleziono pasieki. Nawet aplikacja czasem zgubi ul.
        <button onClick={onBack}>Wróć</button>
      </div>
    );
  }

  return (
    <>
      <button className="back-button" onClick={onBack}>‹ Pasieki</button>
      <div className="page-header list-page-header">
        <span>{apiary.location}</span>
        <h1>{apiary.name}</h1>
        <p>{apiary.description}</p>
      </div>

      <div className="list-summary-strip">
        <span><strong>{allHives.length}</strong> uli</span>
        <span><strong>{urgentCount}</strong> pilne</span>
        <span><strong>{attentionCount}</strong> obserwacja</span>
      </div>

      <button className="wide-action" onClick={() => onCreateHive(apiary.id)}>+ Dodaj ul</button>
      <button className="wide-action secondary-map-action" onClick={() => onOpenMap(apiary.id)}>🗺️ Mapa pasieki</button>

      <div className="form-card hive-search-panel">
        <label>
          Szukaj ula
          <input value={query} onChange={event => setQuery(event.target.value)} placeholder="nazwa, numer, rasa, linia, status..." />
        </label>
        <div className="filter-row">
          {filters.map(item => (
            <button key={item.value} className={filter === item.value ? 'active' : ''} onClick={() => setFilter(item.value)}>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <Section title={`Ule: ${hives.length}`}>
        {hives.length === 0 ? (
          <div className="empty-card">Brak uli dla tego filtra lub wyszukiwania. Filtry są bezlitosne, ale przynajmniej uczciwe.</div>
        ) : (
          hives.map(hive => (
            <HiveCard
              key={hive.id}
              hive={hive}
              tasks={state.tasks}
              onOpen={() => onOpenHive(hive.id)}
            />
          ))
        )}
      </Section>
    </>
  );
}
