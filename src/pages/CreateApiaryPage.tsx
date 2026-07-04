import { useState } from 'react';
import type { Apiary } from '../models/apiary';
import { validateApiaryForm, type ApiaryForm } from '../logic/forms';
import { normalizeApiaryLocationInput } from '../logic/apiaryLocation21';
import { buildGpsLocationLabel21, requestGpsLocation21 } from '../logic/gpsLocation21';
import { Section } from '../components/Section';

interface CreateApiaryPageProps {
  onCancel: () => void;
  onCreate: (apiary: Apiary) => void;
}

const emojiOptions = ['🌳', '🌼', '🏡', '🌲', '🌻', '🐝'];

export function CreateApiaryPage({ onCancel, onCreate }: CreateApiaryPageProps) {
  const [form, setForm] = useState<ApiaryForm>({
    name: '',
    location: '',
    description: '',
    imageEmoji: '🐝',
    locationName: '',
    latitude: '',
    longitude: ''
  });
  const [gpsStatus, setGpsStatus] = useState('');
  const [gpsLoading, setGpsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  function update<K extends keyof ApiaryForm>(key: K, value: ApiaryForm[K]) {
    setForm(current => ({ ...current, [key]: value }));
  }


  async function handleUseGps() {
    setGpsLoading(true);
    setGpsStatus('Pobieram lokalizację GPS...');
    try {
      const gps = await requestGpsLocation21();
      const label = buildGpsLocationLabel21(gps);
      setForm(current => ({
        ...current,
        latitude: gps.latitude,
        longitude: gps.longitude,
        location: current.location || label,
        locationName: current.locationName || label
      }));
      setGpsStatus(`Zapisano lokalizację GPS: ${label}`);
    } catch (error) {
      setGpsStatus(error instanceof Error ? error.message : 'Nie udało się pobrać lokalizacji GPS.');
    } finally {
      setGpsLoading(false);
    }
  }

  function submit() {
    const nextErrors = validateApiaryForm(form);
    setErrors(nextErrors);

    if (nextErrors.length > 0) return;

    const locationData = normalizeApiaryLocationInput({
      locationName: form.locationName || form.location,
      latitude: form.latitude,
      longitude: form.longitude
    });

    onCreate({
      id: `apiary-${Date.now()}`,
      name: form.name.trim(),
      location: form.location.trim() || locationData.locationName || 'Brak lokalizacji',
      locationName: locationData.locationName || form.location.trim(),
      latitude: locationData.latitude,
      longitude: locationData.longitude,
      description: form.description.trim() || 'Nowa pasieka BgApiary.',
      imageEmoji: form.imageEmoji
    });
  }

  return (
    <>
      <button className="back-button" onClick={onCancel}>‹ Anuluj</button>
      <div className="page-header">
        <span>Kreator</span>
        <h1>Dodaj pasiekę</h1>
        <p>Najpierw miejsce, potem ule. W tej kolejności, bo chaos ma już wystarczająco dużo fanów.</p>
      </div>

      <Section title="Dane pasieki">
        <div className="form-card">
          <label>
            Nazwa pasieki *
            <input value={form.name} onChange={event => update('name', event.target.value)} placeholder="np. Pasieka Kolno" />
          </label>

          <label>
            Miejscowość / opis lokalizacji
            <input value={form.location} onChange={event => { update('location', event.target.value); update('locationName', event.target.value); }} placeholder="np. Kolno, gm. Poświętne" />
          </label>

          <button type="button" className="gps-location-button" onClick={handleUseGps} disabled={gpsLoading}>
            {gpsLoading ? 'Pobieram GPS...' : 'Dodaj lokalizację GPS'}
          </button>
          {gpsStatus ? <p className="gps-location-status">{gpsStatus}</p> : null}

          <div className="apiary-location-grid">
            <label>
              Szerokość geograficzna
              <input
                inputMode="decimal"
                value={form.latitude}
                onChange={event => update('latitude', event.target.value === '' ? '' : Number(event.target.value))}
                placeholder="np. 52.3391"
              />
            </label>

            <label>
              Długość geograficzna
              <input
                inputMode="decimal"
                value={form.longitude}
                onChange={event => update('longitude', event.target.value === '' ? '' : Number(event.target.value))}
                placeholder="np. 21.4212"
              />
            </label>
          </div>

          <p className="field-hint">Te współrzędne będą używane do pogody Open-Meteo dla tej pasieki.</p>

          <label>
            Opis
            <textarea value={form.description} onChange={event => update('description', event.target.value)} placeholder="Krótki opis pasieki" />
          </label>

          <div className="field-label">Ikona</div>
          <div className="emoji-picker">
            {emojiOptions.map(emoji => (
              <button
                key={emoji}
                type="button"
                className={form.imageEmoji === emoji ? 'selected' : ''}
                onClick={() => update('imageEmoji', emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>

          {errors.length > 0 && (
            <div className="form-errors">
              {errors.map(error => <p key={error}>{error}</p>)}
            </div>
          )}

          <button className="primary full" onClick={submit}>Zapisz pasiekę</button>
        </div>
      </Section>
    </>
  );
}
