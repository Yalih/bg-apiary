import { useState } from 'react';
import type { ApiaryState } from '../models/apiary';
import { Section } from '../components/Section';
import { TaskCard } from '../components/TaskCard';
import { getQueenColor } from '../logic/queenColor';
import { formatRelativeDays } from '../logic/date';
import { getConditionLabel, getHiveCondition } from '../logic/hiveStatus';
import { bgApiaryHiveTone, bgApiaryStrengthLabel, bgApiaryStrengthPercent } from '../logic/bgApiaryPremium20';
import { BgApiaryIcon } from '../components/bgapiary/BgApiaryIcon';
import { HiveHeroImage, CleanQueenImage, HiveOverlay } from '../components/bgapiary/CleanAssets';
import { getHiveExperienceStatus, getHiveExperienceVisibleHistory } from '../logic/premiumHiveExperience21';

interface HiveDetailsPageProps {
  state: ApiaryState;
  hiveId: string;
  onBack: () => void;
  onCompleteTask: (taskId: string) => void;
  onCreateInspection: (hiveId: string) => void;
  onCreateFeeding: (hiveId: string) => void;
  onCreateNote: (hiveId: string) => void;
  onCreatePhoto: (hiveId: string) => void;
  onReplaceQueen: (hiveId: string) => void;
}

type PremiumTab = 'overview' | 'notes' | 'history' | 'photos';

function foodLabel(food: string): string {
  return {
    niski: 'niski',
    średni: 'średni',
    dobry: 'dobry'
  }[food] ?? food;
}

function iconLabel(type: string): string {
  return {
    created: 'UL',
    inspection: 'PR',
    feeding: 'KR',
    note: 'NO',
    task: 'PL',
    status: 'AL',
    queen_replacement: 'MA',
    decision: 'DE',
    treatment: 'LE'
  }[type] ?? 'WP';
}

function PremiumIcon({ label }: { label: string }) {
  const iconMap: Record<string, any> = {
    MA: 'matka',
    CZ: 'czerw',
    ZA: 'zapasy',
    TE: 'temperatura',
    ZD: 'zdrowie',
    PO: 'pozytek',
    MG: 'magazyn',
    PL: 'planSezonu',
    PR: 'przeglady',
    KR: 'karmienie',
    NO: 'notatki',
    DE: 'historia',
    LE: 'leczenie',
    WP: 'zadania',
    UL: 'ule'
  };
  return <span className="premium-line-icon" aria-hidden="true"><BgApiaryIcon name={iconMap[label] ?? 'zadania'} size={24} /></span>;
}

export function HiveDetailsPage({ state, hiveId, onBack, onCompleteTask, onCreateInspection, onCreateFeeding, onCreateNote, onCreatePhoto, onReplaceQueen }: HiveDetailsPageProps) {
  const [tab, setTab] = useState<PremiumTab>('overview');
  const [showAllHistory, setShowAllHistory] = useState(false);
  const hive = state.hives.find(item => item.id === hiveId);

  if (!hive) {
    return (
      <div className="premium-empty-state">
        <strong>Nie udało się odnaleźć ula</strong>
        <button onClick={onBack}>Wróć do uli</button>
      </div>
    );
  }

  const apiary = state.apiaries.find(item => item.id === hive.apiaryId);
  const queenColor = getQueenColor(hive.queen.year);
  const condition = getHiveCondition(hive, state.tasks);
  const inspections = state.inspections.filter(item => item.hiveId === hive.id).sort((a, b) => b.date.localeCompare(a.date));
  const feedings = state.feedings.filter(item => item.hiveId === hive.id).sort((a, b) => b.date.localeCompare(a.date));
  const events = state.events.filter(item => item.hiveId === hive.id).sort((a, b) => b.date.localeCompare(a.date));
  const notes = state.notes.filter(item => item.hiveId === hive.id).sort((a, b) => b.date.localeCompare(a.date));
  const photos = state.photos.filter(item => item.hiveId === hive.id).sort((a, b) => b.date.localeCompare(a.date));
  const tasks = state.tasks.filter(item => item.hiveId === hive.id && item.status === 'open');
  const decisions = (state.decisionEvents ?? []).filter(item => item.hiveId === hive.id).sort((a, b) => b.date.localeCompare(a.date));
  const latestInspection = inspections[0];
  const latestFeeding = feedings[0];
  const historyItems = [
    ...events.map(item => ({ id: item.id, date: item.date, type: item.type, title: item.title, details: item.details })),
    ...decisions.map(item => ({ id: item.id, date: item.date, type: 'decision', title: item.action, details: item.reason })),
    ...notes.map(item => ({ id: item.id, date: item.date, type: 'note', title: 'Notatka', details: item.text }))
  ].sort((a, b) => b.date.localeCompare(a.date));
  const visibleHistory = historyItems.slice(0, getHiveExperienceVisibleHistory(showAllHistory));
  const experienceStatus = getHiveExperienceStatus(hive.strength);

  const tiles = [
    { label: 'Matka', value: `${hive.queen.breed ?? 'brak'}`, note: hive.queen.line ?? queenColor.label, icon: 'MA' },
    { label: 'Czerw', value: latestInspection?.brood ? 'jest' : 'sprawdź', note: latestInspection ? latestInspection.date : 'brak przeglądu', icon: 'CZ' },
    { label: 'Zapasy', value: foodLabel(hive.foodLevel), note: latestFeeding ? `karmienie ${latestFeeding.date}` : 'bez wpisu', icon: 'ZA' },
    { label: 'Temperatura', value: '—', note: 'gotowe pod czujnik', icon: 'TE' },
    { label: 'Zdrowie', value: getConditionLabel(condition), note: tasks.length ? `${tasks.length} zadań` : 'spokojnie', icon: 'ZD' },
    { label: 'Pożytek', value: 'sezon', note: apiary?.location ?? 'pasieka', icon: 'PO' },
    { label: 'Magazyn', value: `${hive.frameCount}`, note: 'ramek w ulu', icon: 'MG' },
    { label: 'Plan', value: tasks[0]?.title ?? 'brak', note: tasks[0]?.dueDate ?? 'bez terminu', icon: 'PL' }
  ];

  return (
    <div className="premium-hive-page">
      <button className="back-button premium-back" onClick={onBack}>‹ Ule</button>

      <section className={`premium-hive-hero tone-${bgApiaryHiveTone(hive.strength)}`}>
        <div className="premium-hive-copy">
          <span>{apiary?.name ?? 'Pasieka'}</span>
          <h1>{hive.name}</h1>
          <p>{bgApiaryStrengthLabel(hive.strength)} · {hive.frameCount}/10 ramek · {formatRelativeDays(hive.lastInspectionAt)}</p>
          <div className="premium-hive-progress">
            <i style={{ width: `${bgApiaryStrengthPercent(hive.strength)}%` }} />
          </div>
          <div className="premium-hive-hero-badges">
            <span>{experienceStatus}</span>
            <span>{getConditionLabel(condition)}</span>
          </div>
        </div>
        <div className="premium-hive-illustration asset-ready premium-hive-hero-art" aria-label="Ilustracja ula">
          <HiveHeroImage hive={hive} />
          <HiveOverlay hive={hive} className="premium-hive-hero-overlay" />
        </div>
      </section>

      <div className="premium-hive-tabs" role="tablist" aria-label="Zakładki ula">
        {([
          ['overview', 'Przegląd'],
          ['notes', 'Notatki'],
          ['history', 'Historia'],
          ['photos', 'Zdjęcia']
        ] as Array<[PremiumTab, string]>).map(([value, label]) => (
          <button key={value} role="tab" aria-selected={tab === value} className={tab === value ? 'active' : ''} onClick={() => setTab(value)}>{label}</button>
        ))}
      </div>

      {tab === 'overview' && (
        <>
          <section className="premium-tile-grid">
            {tiles.map(tile => (
              <article className={`premium-info-tile premium-info-tile-${tile.label.toLowerCase()}`} key={tile.label}>
                {tile.label === 'Matka' ? (
                  <CleanQueenImage year={hive.queen.year} className="tile-queen-clean" />
                ) : (
                  <PremiumIcon label={tile.icon} />
                )}
                <div>
                  <span>{tile.label}</span>
                  <strong>{tile.value}</strong>
                  <small>{tile.note}</small>
                </div>
              </article>
            ))}
          </section>

          <Section title="Ostatni przegląd">
            <div className="premium-review-card">
              <div>
                <span>{latestInspection?.date ?? 'Dodaj pierwszy przegląd'}</span>
                <strong>{latestInspection?.summary || 'Brak ostatniego przeglądu'}</strong>
                <p>{latestInspection ? `Matka ${latestInspection.queenSeen ? 'widziana' : 'niewidziana'} · siła ${latestInspection.strength}/10` : 'Zapisz pierwszy przegląd, żeby widzieć realny stan rodziny.'}</p>
              </div>
              <button onClick={() => onCreateInspection(hive.id)}>Przegląd</button>
            </div>
          </Section>

          <Section title="Najbliższe prace">
            {tasks.length === 0 ? (
              <button className="premium-empty-action" onClick={() => onCreateInspection(hive.id)}>Dodaj przegląd</button>
            ) : tasks.slice(0, 3).map(task => (
              <TaskCard
                key={task.id}
                task={task}
                hive={hive}
                onOpenHive={() => onCreateInspection(hive.id)}
                onComplete={() => onCompleteTask(task.id)}
              />
            ))}
          </Section>
        </>
      )}

      {tab === 'notes' && (
        <Section title="Notatki">
          {notes.length === 0 ? (
            <button className="premium-empty-action" onClick={() => onCreateNote(hive.id)}>Dodaj notatkę</button>
          ) : notes.map(note => (
            <article className="premium-note-card" key={note.id}>
              <span>{note.date}</span>
              <p>{note.text}</p>
            </article>
          ))}
        </Section>
      )}

      {tab === 'history' && (
        <Section title="Historia ula">
          <div className="premium-timeline">
            {visibleHistory.length === 0 ? (
              <button className="premium-empty-action" onClick={() => onCreateInspection(hive.id)}>Dodaj pierwszy wpis</button>
            ) : visibleHistory.map(item => (
              <article className={`premium-timeline-item premium-timeline-${item.type}`} key={`${item.type}-${item.id}`}>
                <div className="premium-timeline-dot"><PremiumIcon label={iconLabel(item.type)} /></div>
                <div>
                  <span>{item.date}</span>
                  <strong>{item.title}</strong>
                  <p>{item.details || 'Wpis zapisany w historii ula.'}</p>
                </div>
              </article>
            ))}
          </div>
          {historyItems.length > getHiveExperienceVisibleHistory(false) && <button className="premium-show-more" onClick={() => setShowAllHistory(value => !value)}>{showAllHistory ? 'Pokaż mniej' : 'Pokaż więcej'}</button>}
        </Section>
      )}

      {tab === 'photos' && (
        <Section title="Zdjęcia">
          {photos.length === 0 ? (
            <button className="premium-empty-action" onClick={() => onCreatePhoto(hive.id)}>Dodaj zdjęcie</button>
          ) : (
            <div className="premium-photo-grid">
              {photos.map(photo => (
                <button className="premium-photo-thumb" key={photo.id} onClick={() => onCreatePhoto(hive.id)}>
                  {photo.dataUrl ? <img src={photo.dataUrl} alt={photo.title} /> : <span>Foto</span>}
                  <small>{photo.title}</small>
                </button>
              ))}
            </div>
          )}
        </Section>
      )}

      <div className="premium-floating-actions" aria-label="Szybkie akcje ula">
        <button onClick={() => onCreateInspection(hive.id)}>Przegląd</button>
        <button onClick={() => onCreateFeeding(hive.id)}>Karmienie</button>
        <button onClick={() => onReplaceQueen(hive.id)}>Matka</button>
        <button onClick={() => onCreatePhoto(hive.id)}>Zdjęcie</button>
        <button onClick={() => onCreateNote(hive.id)}>Notatka</button>
      </div>
    </div>
  );
}
