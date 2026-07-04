import { useMemo, useState } from 'react';
import type { ApiaryState, Hive, HiveEvent } from '../models/apiary';
import { HIVE_TYPES } from '../data/hiveTypes';
import { QUEEN_BREEDS, getAvailableQueenLines } from '../data/queenBreeds';
import { getQueenColor } from '../logic/queenColor';
import { getQueenYearFromDate, validateHiveForm, type HiveForm } from '../logic/forms';
import { Section } from '../components/Section';

interface CreateHivePageProps {
  state: ApiaryState;
  apiaryId?: string;
  onCancel: () => void;
  onCreate: (hive: Hive, event: HiveEvent) => void;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function CreateHivePage({ state, apiaryId, onCancel, onCreate }: CreateHivePageProps) {
  const defaultApiaryId = apiaryId ?? state.apiaries[0]?.id ?? '';

  const [form, setForm] = useState<HiveForm>({
    apiaryId: defaultApiaryId,
    name: '',
    type: 'Warszawski Poszerzany',
    frameCount: 0,
    strength: 5,
    mood: 'normalna',
    foodLevel: 'średni',
    lastInspectionAt: today(),
    queenIntroducedAt: today(),
    queenBreed: 'Krainka',
    queenLine: 'Sklenar G10',
    notes: ''
  });

  const [errors, setErrors] = useState<string[]>([]);
  const availableLines = useMemo(() => getAvailableQueenLines(form.queenBreed), [form.queenBreed]);
  const queenYear = getQueenYearFromDate(form.queenIntroducedAt);
  const queenColor = getQueenColor(queenYear);

  function update<K extends keyof HiveForm>(key: K, value: HiveForm[K]) {
    setForm(current => {
      const next = { ...current, [key]: value };

      if (key === 'queenBreed') {
        next.queenLine = getAvailableQueenLines(String(value))[0];
      }

      return next;
    });
  }

  function submit() {
    const nextErrors = validateHiveForm(form);
    setErrors(nextErrors);

    if (nextErrors.length > 0) return;

    const hiveId = `hive-${Date.now()}`;
    const hiveNumber = state.hives.filter(hive => hive.apiaryId === form.apiaryId).length + 1;

    const hive: Hive = {
      id: hiveId,
      apiaryId: form.apiaryId,
      number: hiveNumber,
      name: form.name.trim(),
      type: form.type,
      frameCount: Number(form.frameCount),
      strength: Number(form.strength),
      mood: form.mood,
      foodLevel: form.foodLevel,
      queen: {
        introducedAt: form.queenIntroducedAt,
        breed: form.queenBreed,
        line: form.queenLine,
        year: queenYear
      },
      lastInspectionAt: form.lastInspectionAt,
      nextAction: 'Ustal pierwsze działanie dla nowego ula',
      notes: form.notes.trim() || 'Nowy ul dodany w kreatorze BgApiary.'
    };

    const event: HiveEvent = {
      id: `event-${Date.now()}`,
      hiveId,
      date: today(),
      type: 'created',
      title: 'Dodano ul',
      details: `${hive.name} dodany do aplikacji. Typ: ${hive.type}. Matka: ${hive.queen.breed} · ${hive.queen.line}.`
    };

    onCreate(hive, event);
  }

  return (
    <>
      <button className="back-button" onClick={onCancel}>‹ Anuluj</button>
      <div className="page-header">
        <span>Kreator</span>
        <h1>Dodaj ul</h1>
        <p>Tu zaczyna się prawdziwa ewidencja, a nie kartka latająca po bagażniku.</p>
      </div>

      <Section title="Ul">
        <div className="form-card">
          <label>
            Pasieka *
            <select value={form.apiaryId} onChange={event => update('apiaryId', event.target.value)}>
              {state.apiaries.map(apiary => <option key={apiary.id} value={apiary.id}>{apiary.name}</option>)}
            </select>
          </label>

          <label>
            Nazwa / numer ula *
            <input value={form.name} onChange={event => update('name', event.target.value)} placeholder="np. Ul 6 albo Dąb" />
          </label>

          <label>
            Typ ula *
            <select value={form.type} onChange={event => update('type', event.target.value)}>
              {HIVE_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </label>

          <div className="two-cols">
            <label>
              Liczba ramek
              <input type="number" min="0" max="30" value={form.frameCount} onChange={event => update('frameCount', Number(event.target.value))} />
            </label>

            <label>
              Siła rodziny 0-10
              <input type="number" min="0" max="10" value={form.strength} onChange={event => update('strength', Number(event.target.value))} />
            </label>
          </div>

          <div className="two-cols">
            <label>
              Nastrój
              <select value={form.mood} onChange={event => update('mood', event.target.value as HiveForm['mood'])}>
                <option value="spokojna">spokojna</option>
                <option value="normalna">normalna</option>
                <option value="nerwowa">nerwowa</option>
              </select>
            </label>

            <label>
              Pokarm
              <select value={form.foodLevel} onChange={event => update('foodLevel', event.target.value as HiveForm['foodLevel'])}>
                <option value="niski">niski</option>
                <option value="średni">średni</option>
                <option value="dobry">dobry</option>
              </select>
            </label>
          </div>

          <label>
            Data ostatniego przeglądu
            <input type="date" value={form.lastInspectionAt} onChange={event => update('lastInspectionAt', event.target.value)} />
          </label>
        </div>
      </Section>

      <Section title="Matka">
        <div className="form-card">
          <label>
            Data poddania matki *
            <input type="date" value={form.queenIntroducedAt} onChange={event => update('queenIntroducedAt', event.target.value)} />
          </label>

          <div className={`queen-preview ${queenColor.cssClass}`}>
            <strong>{queenYear}</strong>
            <span>{queenColor.emoji} {queenColor.label}</span>
          </div>

          <label>
            Rasa matki *
            <select value={form.queenBreed} onChange={event => update('queenBreed', event.target.value)}>
              {QUEEN_BREEDS.map(breed => <option key={breed} value={breed}>{breed}</option>)}
            </select>
          </label>

          <label>
            Linia matki *
            <select value={form.queenLine} onChange={event => update('queenLine', event.target.value)}>
              {availableLines.map(line => <option key={line} value={line}>{line}</option>)}
            </select>
          </label>

          <label>
            Notatka
            <textarea value={form.notes} onChange={event => update('notes', event.target.value)} placeholder="Krótka notatka o rodzinie" />
          </label>

          {errors.length > 0 && (
            <div className="form-errors">
              {errors.map(error => <p key={error}>{error}</p>)}
            </div>
          )}

          <button className="primary full" onClick={submit}>Zapisz ul</button>
        </div>
      </Section>
    </>
  );
}
