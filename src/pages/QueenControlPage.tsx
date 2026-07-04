import { useState } from 'react';
import type { Hive, QueenControl, QueenRating, QueenStatus } from '../models/apiary';
import { createQueenControl, queenStatusLabel } from '../logic/queenCatalog';

interface QueenControlPageProps {
  hive: Hive;
  onBack: () => void;
  onSave: (control: QueenControl, rating?: QueenRating) => void;
}

const statuses: QueenStatus[] = ['caged', 'released', 'observation', 'accepted', 'rejected', 'queenless', 'suspected_lost', 'to_check', 'to_replace', 'mated'];

function today() {
  return new Date().toISOString().slice(0, 10);
}

export function QueenControlPage({ hive, onBack, onSave }: QueenControlPageProps) {
  const [date, setDate] = useState(today());
  const [status, setStatus] = useState<QueenStatus>(hive.queen.acceptanceStatus ?? hive.queen.status ?? 'observation');
  const [queenSeen, setQueenSeen] = useState(false);
  const [eggsSeen, setEggsSeen] = useState(false);
  const [broodSeen, setBroodSeen] = useState(false);
  const [note, setNote] = useState('');
  const [rating, setRating] = useState<QueenRating>({
    brood: 7,
    calmness: 7,
    development: 7,
    swarmTendency: 3,
    honeyPotential: 7,
    gentleness: 7,
    overall: 7,
    note: '',
    date: today()
  });

  function updateRating<K extends keyof QueenRating>(key: K, value: QueenRating[K]) {
    setRating(current => ({ ...current, [key]: value }));
  }

  function submit() {
    const control = createQueenControl(hive, {
      date,
      controlType: 'manual',
      status,
      eggsSeen,
      broodSeen,
      queenSeen,
      note
    });
    onSave(control, rating);
  }

  return (
    <>
      <button className="back-button" onClick={onBack}>‹ Matki</button>
      <div className="page-header">
        <span>Kontrola matki</span>
        <h1>{hive.name}</h1>
        <p>Ocena przyjęcia i jakości matki. Tak, matka też dostaje performance review, bo świat poszedł za daleko.</p>
      </div>

      <div className="form-card queen-control-form">
        <label>Data kontroli<input type="date" value={date} onChange={event => setDate(event.target.value)} /></label>
        <label>Status
          <select value={status} onChange={event => setStatus(event.target.value as QueenStatus)}>
            {statuses.map(item => <option key={item} value={item}>{queenStatusLabel(item)}</option>)}
          </select>
        </label>

        <div className="checkbox-grid">
          <label><input type="checkbox" checked={queenSeen} onChange={e => setQueenSeen(e.target.checked)} /> Matka widziana</label>
          <label><input type="checkbox" checked={eggsSeen} onChange={e => setEggsSeen(e.target.checked)} /> Jaja</label>
          <label><input type="checkbox" checked={broodSeen} onChange={e => setBroodSeen(e.target.checked)} /> Czerw</label>
        </div>

        <label>Notatka<textarea value={note} onChange={event => setNote(event.target.value)} /></label>

        <div className="queen-rating-grid">
          {([
            ['brood', 'Czerw'],
            ['calmness', 'Spokojność'],
            ['development', 'Rozwój'],
            ['swarmTendency', 'Rójliwość'],
            ['honeyPotential', 'Miodność'],
            ['gentleness', 'Łagodność'],
            ['overall', 'Ocena ogólna']
          ] as Array<[keyof QueenRating, string]>).map(([key, label]) => (
            <label key={key}>
              {label}: {rating[key]}
              <input type="range" min="1" max="10" value={Number(rating[key])} onChange={event => updateRating(key, Number(event.target.value) as never)} />
            </label>
          ))}
        </div>

        <label>Notatka do oceny<textarea value={rating.note} onChange={event => updateRating('note', event.target.value)} /></label>
        <button className="primary full" onClick={submit}>Zapisz kontrolę i ocenę</button>
      </div>
    </>
  );
}
