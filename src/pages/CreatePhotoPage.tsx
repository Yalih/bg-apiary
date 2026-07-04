import { useMemo, useState } from 'react';
import type { ApiaryState, HivePhoto, PhotoLinkedType } from '../models/apiary';
import { buildPhoto, fileToDataUrl, validatePhotoForm, type PhotoForm } from '../logic/photos';
import { Section } from '../components/Section';

interface CreatePhotoPageProps {
  state: ApiaryState;
  hiveId?: string;
  onCancel: () => void;
  onCreate: (photo: HivePhoto) => void;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function CreatePhotoPage({ state, hiveId, onCancel, onCreate }: CreatePhotoPageProps) {
  const hive = state.hives.find(item => item.id === hiveId) ?? state.hives[0];
  const inspections = useMemo(() => state.inspections.filter(item => item.hiveId === hive?.id), [state.inspections, hive?.id]);
  const [form, setForm] = useState<PhotoForm>({
    hiveId: hive?.id ?? '',
    linkedType: 'hive',
    linkedId: undefined,
    date: today(),
    title: '',
    description: '',
    dataUrl: ''
  });
  const [errors, setErrors] = useState<string[]>([]);

  function update<K extends keyof PhotoForm>(key: K, value: PhotoForm[K]) {
    setForm(current => ({ ...current, [key]: value }));
  }

  async function handleFile(file?: File) {
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    update('dataUrl', dataUrl);
    if (!form.title) update('title', file.name.replace(/\.[^.]+$/, ''));
  }

  function submit() {
    const nextErrors = validatePhotoForm(form);
    setErrors(nextErrors);
    if (nextErrors.length > 0) return;
    onCreate(buildPhoto(form));
  }

  return (
    <>
      <button className="back-button" onClick={onCancel}>‹ Anuluj</button>
      <div className="page-header">
        <span>Zdjęcia</span>
        <h1>Dodaj zdjęcie</h1>
        <p>Zdjęcie zostanie zapisane lokalnie w przeglądarce. Tak, to znaczy, że kopia zapasowa ma sens.</p>
      </div>

      <Section title="Zdjęcie">
        <div className="form-card">
          <label>
            Ul
            <select value={form.hiveId} onChange={event => update('hiveId', event.target.value)}>
              {state.hives.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </label>

          <label>
            Powiązanie
            <select value={form.linkedType} onChange={event => update('linkedType', event.target.value as PhotoLinkedType)}>
              <option value="hive">Ul</option>
              <option value="inspection">Przegląd</option>
            </select>
          </label>

          {form.linkedType === 'inspection' && (
            <label>
              Przegląd
              <select value={form.linkedId ?? ''} onChange={event => update('linkedId', event.target.value || undefined)}>
                <option value="">Bez konkretnego przeglądu</option>
                {inspections.map(item => <option key={item.id} value={item.id}>{item.date} · {item.summary}</option>)}
              </select>
            </label>
          )}

          <label>
            Data
            <input type="date" value={form.date} onChange={event => update('date', event.target.value)} />
          </label>

          <label>
            Tytuł
            <input value={form.title} onChange={event => update('title', event.target.value)} placeholder="np. Ramka z czerwiem" />
          </label>

          <label>
            Opis
            <textarea value={form.description} onChange={event => update('description', event.target.value)} />
          </label>

          <label>
            Plik zdjęcia
            <input type="file" accept="image/*" onChange={event => handleFile(event.target.files?.[0])} />
          </label>

          {form.dataUrl && <img className="photo-preview" src={form.dataUrl} alt="Podgląd" />}

          {errors.length > 0 && <div className="form-errors">{errors.map(error => <p key={error}>{error}</p>)}</div>}

          <button className="primary full" onClick={submit}>Zapisz zdjęcie</button>
        </div>
      </Section>
    </>
  );
}
