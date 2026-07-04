import { useState } from 'react';
import type { Apiary, ApiaryState } from '../models/apiary';
import { Section } from '../components/Section';
import { ApiaryCard } from '../components/ApiaryCard';
import { HiveCard } from '../components/HiveCard';
import { buildGpsLocationLabel21, requestGpsLocation21 } from '../logic/gpsLocation21';
import { mergeApiaryLocation, getApiaryLocationLabel } from '../logic/apiaryLocation21';

interface ApiariesPageProps {
  state: ApiaryState;
  onOpenApiary: (apiaryId: string) => void;
  onCreateApiary: () => void;
  onUpdateApiary?: (apiary: Apiary) => void;
  onOpenHive?: (hiveId: string) => void;
}

export function ApiariesPage({ state, onOpenApiary, onCreateApiary, onUpdateApiary, onOpenHive }: ApiariesPageProps) {
  const lastHive = state.hives.find(hive => hive.id === state.lastOpenedHiveId);
  const [editingLocationId, setEditingLocationId] = useState('');
  const [locationDrafts, setLocationDrafts] = useState<Record<string, { locationName: string; latitude: string; longitude: string }>>({});
  const [gpsStatus, setGpsStatus] = useState<Record<string, string>>({});

  function draftFor(apiary: Apiary) {
    return locationDrafts[apiary.id] ?? {
      locationName: getApiaryLocationLabel(apiary),
      latitude: apiary.latitude === undefined ? '' : String(apiary.latitude),
      longitude: apiary.longitude === undefined ? '' : String(apiary.longitude)
    };
  }

  function updateDraft(apiary: Apiary, patch: Partial<{ locationName: string; latitude: string; longitude: string }>) {
    setLocationDrafts(current => ({
      ...current,
      [apiary.id]: { ...draftFor(apiary), ...patch }
    }));
  }

  function saveLocation(apiary: Apiary) {
    if (!onUpdateApiary) return;
    const draft = draftFor(apiary);
    const updated = mergeApiaryLocation(apiary, {
      locationName: draft.locationName,
      latitude: draft.latitude === '' ? '' : Number(draft.latitude),
      longitude: draft.longitude === '' ? '' : Number(draft.longitude)
    });
    onUpdateApiary({ ...updated, location: draft.locationName || updated.location });
    setGpsStatus(current => ({ ...current, [apiary.id]: 'Zapisano lokalizację pasieki.' }));
    setEditingLocationId('');
  }

  async function useGpsForApiary(apiary: Apiary) {
    setGpsStatus(current => ({ ...current, [apiary.id]: 'Pobieram lokalizację GPS...' }));
    try {
      const gps = await requestGpsLocation21();
      const label = buildGpsLocationLabel21(gps);
      updateDraft(apiary, {
        locationName: label,
        latitude: String(gps.latitude),
        longitude: String(gps.longitude)
      });
      setGpsStatus(current => ({ ...current, [apiary.id]: `Pobrano GPS: ${label}` }));
    } catch (error) {
      setGpsStatus(current => ({ ...current, [apiary.id]: error instanceof Error ? error.message : 'Nie udało się pobrać lokalizacji GPS.' }));
    }
  }

  return (
    <>
      <div className="page-header list-page-header">
        <span>Pasieki</span>
        <h1>Twoje miejsca pracy</h1>
        <p>Pasieki i ule w jednym spokojnym układzie. Rewolucyjne, jak na ludzki interfejs.</p>
      </div>

      {lastHive && onOpenHive && (
        <Section title="Ostatnio otwarty ul">
          <HiveCard
            hive={lastHive}
            tasks={state.tasks}
            onOpen={() => onOpenHive(lastHive.id)}
          />
        </Section>
      )}

      <button className="wide-action" onClick={onCreateApiary}>+ Dodaj pasiekę</button>

      <Section title="Lista pasiek">
        {state.apiaries.length === 0 ? (
          <div className="empty-card">Nie masz jeszcze pasieki. Dodaj pierwszą.</div>
        ) : (
          state.apiaries.map(apiary => {
            const draft = draftFor(apiary);
            const editing = editingLocationId === apiary.id;
            return (
              <div className="apiary-location-edit-wrap" key={apiary.id}>
                <ApiaryCard
                  apiary={apiary}
                  hives={state.hives.filter(hive => hive.apiaryId === apiary.id)}
                  tasks={state.tasks}
                  onOpen={() => onOpenApiary(apiary.id)}
                />
                <div className="apiary-location-edit-actions">
                  <button type="button" onClick={() => setEditingLocationId(editing ? '' : apiary.id)}>
                    {editing ? 'Zamknij lokalizację' : 'Zmień lokalizację pasieki'}
                  </button>
                  <button type="button" onClick={() => useGpsForApiary(apiary)}>Zmień lokalizację GPS</button>
                </div>
                {editing && (
                  <div className="apiary-location-edit-panel">
                    <label>
                      Miejscowość / opis lokalizacji
                      <input value={draft.locationName} onChange={event => updateDraft(apiary, { locationName: event.target.value })} />
                    </label>
                    <div className="apiary-location-grid">
                      <label>
                        Szerokość geograficzna
                        <input inputMode="decimal" value={draft.latitude} onChange={event => updateDraft(apiary, { latitude: event.target.value })} />
                      </label>
                      <label>
                        Długość geograficzna
                        <input inputMode="decimal" value={draft.longitude} onChange={event => updateDraft(apiary, { longitude: event.target.value })} />
                      </label>
                    </div>
                    <button className="primary full" type="button" onClick={() => saveLocation(apiary)}>Zapisz lokalizację</button>
                  </div>
                )}
                {gpsStatus[apiary.id] ? <p className="gps-location-status">{gpsStatus[apiary.id]}</p> : null}
              </div>
            );
          })
        )}
      </Section>
    </>
  );
}
