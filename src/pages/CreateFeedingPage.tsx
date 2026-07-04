import { useState } from 'react';
import type { Feeding, Hive } from '../models/apiary';
import { FEEDING_TYPES } from '../data/feedingTypes';
import { buildFeeding, validateFeedingForm, type FeedingForm } from '../logic/actions';
import { Section } from '../components/Section';

interface CreateFeedingPageProps {
  hive: Hive;
  onCancel: () => void;
  onCreate: (feeding: Feeding) => void;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function CreateFeedingPage({ hive, onCancel, onCreate }: CreateFeedingPageProps) {
  const [form, setForm] = useState<FeedingForm>({
    date: today(),
    type: 'Syrop 1:1',
    amountLiters: 1,
    unit: 'l',
    reason: 'Rozwój',
    note: ''
  });
  const [errors, setErrors] = useState<string[]>([]);

  function update<K extends keyof FeedingForm>(key: K, value: FeedingForm[K]) {
    setForm(current => ({ ...current, [key]: value }));
  }

  function submit() {
    const nextErrors = validateFeedingForm(form);
    setErrors(nextErrors);
    if (nextErrors.length > 0) return;
    onCreate(buildFeeding(hive.id, form));
  }

  return (
    <>
      <button className="back-button" onClick={onCancel}>‹ Anuluj</button>
      <div className="page-header">
        <span>{hive.name}</span>
        <h1>Dodaj karmienie</h1>
        <p>Pokarm, ilość, powód. Tyle. Bez filozofii, bo pszczoły i tak mają własną.</p>
      </div>

      <Section title="Karmienie">
        <div className="form-card">
          <label>
            Data *
            <input type="date" value={form.date} onChange={event => update('date', event.target.value)} />
          </label>

          <label>
            Rodzaj pokarmu *
            <select value={form.type} onChange={event => update('type', event.target.value)}>
              {FEEDING_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </label>

          <div className="two-cols">
            <label>
              Ilość *
              <input type="number" min="0.1" step="0.1" value={form.amountLiters} onChange={event => update('amountLiters', Number(event.target.value))} />
            </label>
            <label>
              Jednostka
              <select value={form.unit} onChange={event => update('unit', event.target.value as FeedingForm['unit'])}>
                <option value="l">l</option>
                <option value="kg">kg</option>
              </select>
            </label>
          </div>

          <label>
            Powód
            <input value={form.reason} onChange={event => update('reason', event.target.value)} placeholder="np. rozwój, ratunkowe, zimowla" />
          </label>

          <label>
            Notatka
            <textarea value={form.note} onChange={event => update('note', event.target.value)} placeholder="Dodatkowe informacje" />
          </label>

          {errors.length > 0 && <div className="form-errors">{errors.map(error => <p key={error}>{error}</p>)}</div>}

          <button className="primary full" onClick={submit}>Zapisz karmienie</button>
        </div>
      </Section>
    </>
  );
}
