import { useState } from 'react';
import type { Hive, QueenStatus } from '../models/apiary';
import type { QueenReplacementForm } from '../logic/queenReplacement';
import { validateQueenReplacementForm } from '../logic/queenReplacement';
import { getQueenColor } from '../logic/queenColor';
import { queenStatusLabel } from '../logic/queenCatalog';

interface QueenReplacementPageProps {
  hive: Hive;
  onBack: () => void;
  onReplace: (form: QueenReplacementForm) => void;
}

const statuses: QueenStatus[] = ['mated', 'unmated', 'caged', 'accepted', 'rejected', 'suspected_lost', 'to_replace'];

function today() {
  return new Date().toISOString().slice(0, 10);
}

export function QueenReplacementPage({ hive, onBack, onReplace }: QueenReplacementPageProps) {
  const [form, setForm] = useState<QueenReplacementForm>({
    date: today(),
    reason: 'wymiana planowa',
    breed: hive.queen.breed,
    line: hive.queen.line,
    year: new Date().getFullYear(),
    introducedAt: today(),
    origin: 'zakupiona',
    status: 'caged',
    marked: true,
    clippedWing: false,
    note: '',
    checkDate: ''
  });
  const [errors, setErrors] = useState<string[]>([]);
  const color = getQueenColor(form.year);

  function update<K extends keyof QueenReplacementForm>(key: K, value: QueenReplacementForm[K]) {
    setForm(current => ({ ...current, [key]: value }));
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const validation = validateQueenReplacementForm(form);
    setErrors(validation);
    if (validation.length === 0) onReplace(form);
  }

  return (
    <>
      <button className="back-button" onClick={onBack}>‹ Ul</button>
      <div className="page-header">
        <span>Wymiana matki</span>
        <h1>{hive.name}</h1>
        <p>Stara matka trafi do historii, a nowa zostanie ustawiona jako aktualna. Historia, nie amnezja, tak to powinno działać.</p>
      </div>

      <form className="form-card" onSubmit={submit}>
        <div className="queen-preview">
          <span>Kolor matki z rocznika {form.year}</span>
          <strong>{color.emoji} {color.label}</strong>
        </div>

        <div className="two-cols">
          <label>Data wymiany<input type="date" value={form.date} onChange={e => update('date', e.target.value)} /></label>
          <label>Data poddania<input type="date" value={form.introducedAt} onChange={e => update('introducedAt', e.target.value)} /></label>
        </div>

        <label>Powód wymiany
          <select value={form.reason} onChange={e => update('reason', e.target.value)}>
            {['słabe czerwienie','agresja','wiek matki','cicha wymiana','rójliwość','brak matki','matka uszkodzona','wymiana planowa','inna przyczyna'].map(reason => <option key={reason}>{reason}</option>)}
          </select>
        </label>

        <div className="two-cols">
          <label>Rasa<input value={form.breed} onChange={e => update('breed', e.target.value)} /></label>
          <label>Linia<input value={form.line} onChange={e => update('line', e.target.value)} /></label>
        </div>

        <div className="two-cols">
          <label>Rok matki<input type="number" value={form.year} onChange={e => update('year', Number(e.target.value))} /></label>
          <label>Pochodzenie<input value={form.origin} onChange={e => update('origin', e.target.value)} /></label>
        </div>

        <label>Status matki
          <select value={form.status} onChange={e => update('status', e.target.value as QueenStatus)}>
            {statuses.map(status => <option key={status} value={status}>{queenStatusLabel(status)}</option>)}
          </select>
        </label>

        <div className="checkbox-grid">
          <label><input type="checkbox" checked={form.marked} onChange={e => update('marked', e.target.checked)} /> Oznaczona</label>
          <label><input type="checkbox" checked={form.clippedWing} onChange={e => update('clippedWing', e.target.checked)} /> Przycięte skrzydło</label>
        </div>

        <label>Termin kontroli<input type="date" value={form.checkDate ?? ''} onChange={e => update('checkDate', e.target.value)} /></label>
        <label>Notatka<textarea value={form.note} onChange={e => update('note', e.target.value)} /></label>

        {errors.length > 0 && <div className="form-errors">{errors.map(error => <p key={error}>{error}</p>)}</div>}
        <button className="primary full" type="submit">Zapisz wymianę matki</button>
      </form>
    </>
  );
}
