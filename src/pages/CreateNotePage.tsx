import { useState } from 'react';
import type { Hive, HiveNote } from '../models/apiary';
import { buildNote, validateNoteForm, type NoteForm } from '../logic/actions';
import { Section } from '../components/Section';

interface CreateNotePageProps {
  hive: Hive;
  onCancel: () => void;
  onCreate: (note: HiveNote) => void;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function CreateNotePage({ hive, onCancel, onCreate }: CreateNotePageProps) {
  const [form, setForm] = useState<NoteForm>({ date: today(), text: '' });
  const [errors, setErrors] = useState<string[]>([]);

  function submit() {
    const nextErrors = validateNoteForm(form);
    setErrors(nextErrors);
    if (nextErrors.length > 0) return;
    onCreate(buildNote(hive.id, form));
  }

  return (
    <>
      <button className="back-button" onClick={onCancel}>‹ Anuluj</button>
      <div className="page-header">
        <span>{hive.name}</span>
        <h1>Dodaj notatkę</h1>
        <p>Krótko, konkretnie, zanim szczegóły wyparują z głowy jak resztki dymu z podkurzacza.</p>
      </div>

      <Section title="Notatka">
        <div className="form-card">
          <label>
            Data *
            <input type="date" value={form.date} onChange={event => setForm(current => ({ ...current, date: event.target.value }))} />
          </label>

          <label>
            Treść *
            <textarea value={form.text} onChange={event => setForm(current => ({ ...current, text: event.target.value }))} placeholder="Wpisz notatkę..." />
          </label>

          {errors.length > 0 && <div className="form-errors">{errors.map(error => <p key={error}>{error}</p>)}</div>}

          <button className="primary full" onClick={submit}>Zapisz notatkę</button>
        </div>
      </Section>
    </>
  );
}
