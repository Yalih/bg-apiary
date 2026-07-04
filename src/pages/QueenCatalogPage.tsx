import { useMemo, useState } from 'react';
import type { ApiaryState, QueenStatus } from '../models/apiary';
import { Section } from '../components/Section';
import { StatCard } from '../components/StatCard';
import { buildQueenCatalog, filterQueenCatalog, queenStatusLabel } from '../logic/queenCatalog';
import { buildQueenReplacementReport } from '../logic/queenReports';

interface QueenCatalogPageProps {
  state: ApiaryState;
  onBack: () => void;
  onOpenHive: (hiveId: string) => void;
  onControlQueen: (hiveId: string) => void;
}

const statuses: Array<QueenStatus | 'all'> = ['all', 'caged', 'released', 'observation', 'accepted', 'rejected', 'queenless', 'suspected_lost', 'to_check', 'to_replace', 'mated'];

export function QueenCatalogPage({ state, onBack, onOpenHive, onControlQueen }: QueenCatalogPageProps) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<QueenStatus | 'all'>('all');
  const [apiaryId, setApiaryId] = useState('');
  const [onlyCurrent, setOnlyCurrent] = useState(true);

  const catalog = buildQueenCatalog(state);
  const report = buildQueenReplacementReport(state);
  const breeds = [...new Set(catalog.map(item => item.breed))].sort();
  const [breed, setBreed] = useState('');

  const filtered = useMemo(() => {
    const result = filterQueenCatalog(catalog, { query, status, apiaryId, breed });
    return onlyCurrent ? result.filter(item => item.current) : result;
  }, [catalog, query, status, apiaryId, breed, onlyCurrent]);

  return (
    <>
      <button className="back-button" onClick={onBack}>‹ Wróć</button>

      <section className="queen-catalog-hero">
        <div>
          <span>Katalog Matek 1.3</span>
          <h1>Matki w pasiece</h1>
          <p>Aktualne i historyczne matki w jednym miejscu. Wreszcie koniec z szukaniem królowej w zakładkach jak igły w odkładzie.</p>
        </div>
        <div className="queen-catalog-badge">
          <strong>{report.currentQueens}</strong>
          <small>aktualne</small>
        </div>
      </section>

      <div className="queen-stats-grid">
        <StatCard label="Wszystkie" value={report.totalQueens} />
        <StatCard label="Aktualne" value={report.currentQueens} />
        <StatCard label="Historyczne" value={report.replacedQueens} />
        <StatCard label="Śr. wiek" value={`${report.averageCurrentAgeMonths} mies.`} />
        <StatCard label="Przyjęcia" value={`${report.acceptanceRate}%`} />
      </div>

      <div className="form-card queen-filter-panel">
        <label>
          Szukaj matki
          <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Buckfast, Sklenar, 2026, Kolno, Ul 3..." />
        </label>

        <div className="two-cols">
          <label>
            Pasieka
            <select value={apiaryId} onChange={event => setApiaryId(event.target.value)}>
              <option value="">Wszystkie</option>
              {state.apiaries.map(apiary => <option key={apiary.id} value={apiary.id}>{apiary.name}</option>)}
            </select>
          </label>

          <label>
            Rasa
            <select value={breed} onChange={event => setBreed(event.target.value)}>
              <option value="">Wszystkie</option>
              {breeds.map(item => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
        </div>

        <div className="filter-row">
          {statuses.map(item => (
            <button key={item} className={status === item ? 'active' : ''} onClick={() => setStatus(item)}>
              {item === 'all' ? 'Wszystkie' : queenStatusLabel(item)}
            </button>
          ))}
        </div>

        <label className="checkbox-line">
          <input type="checkbox" checked={onlyCurrent} onChange={event => setOnlyCurrent(event.target.checked)} />
          Tylko aktualne matki
        </label>
      </div>

      <Section title={`Matki: ${filtered.length}`}>
        {filtered.length === 0 ? <div className="empty-card">Brak matek dla filtrów. Filtry znów wygrały z nadzieją.</div> : filtered.map(item => (
          <div className={`card queen-catalog-card ${item.current ? 'current' : 'history'}`} key={item.id}>
            <div className="queen-catalog-top">
              <span className={`queen-token ${item.colorClass}`}>
                <span>{item.colorEmoji}</span>
                <strong>{item.year}</strong>
              </span>
              <div>
                <strong>{item.breed} · {item.line}</strong>
                <p>{item.apiaryName} · {item.hiveName}</p>
              </div>
              <span className="queen-status-pill">{queenStatusLabel(item.status)}</span>
            </div>

            <div className="queen-catalog-meta">
              <span>Wiek: {item.ageMonths} mies.</span>
              <span>Poddana: {item.introducedAt}</span>
              <span>Pochodzenie: {item.origin}</span>
              <span>Hodowca: {item.breeder}</span>
              {item.lastControlAt && <span>Kontrola: {item.lastControlAt}</span>}
              {item.replacedAt && <span>Wymieniona: {item.replacedAt}</span>}
            </div>

            <div className="queen-catalog-actions">
              <button className="mini-button" onClick={() => onOpenHive(item.hiveId)}>Otwórz ul</button>
              {item.current && <button className="mini-button secondary-mini" onClick={() => onControlQueen(item.hiveId)}>Kontrola / ocena</button>}
            </div>
          </div>
        ))}
      </Section>
    </>
  );
}
