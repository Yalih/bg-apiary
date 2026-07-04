import { useState } from 'react';
import type { Hive, Inspection } from '../models/apiary';
import { buildBroodText, validateInspectionForm, type InspectionForm } from '../logic/actions';
import { Section } from '../components/Section';

interface CreateInspectionPageProps {
  hive: Hive;
  onCancel: () => void;
  onCreate: (form: InspectionForm, inspection: Inspection) => void;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function CreateInspectionPage({ hive, onCancel, onCreate }: CreateInspectionPageProps) {
  const [form, setForm] = useState<InspectionForm>({
    date: today(),
    queenSeen: true,
    eggs: true,
    larvae: true,
    cappedBrood: true,
    cells: 0,
    strength: hive.strength,
    mood: hive.mood,
    foodLevel: hive.foodLevel,
    frameCount: hive.frameCount,
    summary: ''
  });
  const [errors, setErrors] = useState<string[]>([]);

  function update<K extends keyof InspectionForm>(key: K, value: InspectionForm[K]) {
    setForm(current => ({ ...current, [key]: value }));
  }

  function submit() {
    const nextErrors = validateInspectionForm(form);
    setErrors(nextErrors);
    if (nextErrors.length > 0) return;

    const inspection: Inspection = {
      id: `inspection-${Date.now()}`,
      hiveId: hive.id,
      date: form.date,
      summary: form.summary.trim() || 'Dodano przegląd ula.',
      brood: buildBroodText(form),
      queenSeen: form.queenSeen,
      eggs: form.eggs,
      larvae: form.larvae,
      cappedBrood: form.cappedBrood,
      cells: form.cells,
      strength: form.strength,
      mood: form.mood,
      foodLevel: form.foodLevel,
      frameCount: form.frameCount
    };

    onCreate(form, inspection);
  }

  return (
    <>
      <button className="back-button" onClick={onCancel}>‹ Anuluj</button>
      <div className="page-header">
        <span>{hive.name}</span>
        <h1>Dodaj przegląd</h1>
        <p>Najważniejsze pola pod ręką. Bez formularza długości ustawy, litości.</p>
      </div>

      <Section title="Przegląd">
        <div className="form-card">
          <label>
            Data przeglądu *
            <input type="date" value={form.date} onChange={event => update('date', event.target.value)} />
          </label>

          <div className="checkbox-grid">
            <label><input type="checkbox" checked={form.queenSeen} onChange={event => update('queenSeen', event.target.checked)} /> Matka widziana</label>
            <label><input type="checkbox" checked={form.eggs} onChange={event => update('eggs', event.target.checked)} /> Jaja</label>
            <label><input type="checkbox" checked={form.larvae} onChange={event => update('larvae', event.target.checked)} /> Larwy</label>
            <label><input type="checkbox" checked={form.cappedBrood} onChange={event => update('cappedBrood', event.target.checked)} /> Czerw kryty</label>
          </div>

          <div className="two-cols">
            <label>
              Mateczniki
              <input type="number" min="0" max="20" value={form.cells} onChange={event => update('cells', Number(event.target.value))} />
            </label>
            <label>
              Siła 0-10
              <input type="number" min="0" max="10" value={form.strength} onChange={event => update('strength', Number(event.target.value))} />
            </label>
          </div>

          <div className="two-cols">
            <label>
              Ramki
              <input type="number" min="0" max="30" value={form.frameCount} onChange={event => update('frameCount', Number(event.target.value))} />
            </label>
            <label>
              Pokarm
              <select value={form.foodLevel} onChange={event => update('foodLevel', event.target.value as InspectionForm['foodLevel'])}>
                <option value="niski">niski</option>
                <option value="średni">średni</option>
                <option value="dobry">dobry</option>
              </select>
            </label>
          </div>

          <label>
            Nastrój
            <select value={form.mood} onChange={event => update('mood', event.target.value as InspectionForm['mood'])}>
              <option value="spokojna">spokojna</option>
              <option value="normalna">normalna</option>
              <option value="nerwowa">nerwowa</option>
            </select>
          </label>

          <label>
            Notatka z przeglądu
            <textarea value={form.summary} onChange={event => update('summary', event.target.value)} placeholder="Co zauważyłeś w ulu?" />
          </label>

          {errors.length > 0 && <div className="form-errors">{errors.map(error => <p key={error}>{error}</p>)}</div>}

          <button className="primary full" onClick={submit}>Zapisz przegląd</button>
        </div>
      </Section>
    </>
  );
}
