import type { Hive, ApiaryState } from '../models/apiary';
import { getHiveMapPosition } from '../logic/apiaryMap';
import {
  APIARY_MAP_PREMIUM_VERSION,
  buildApiaryMapStats21,
  buildPremiumApiaryRows21,
  getApiaryMapAttentionMessage21,
  getApiaryMapStatus21,
  getShortInspectionLabel21,
  splitHivesByMapPosition21
} from '../logic/apiaryMapPremium21';
import { HiveMiniImage, CleanQueenImage } from '../components/bgapiary/CleanAssets';
import { bgApiaryStrengthLabel, bgApiaryStrengthPercent } from '../logic/bgApiaryPremium20';

interface ApiaryMapPageProps {
  state: ApiaryState;
  apiaryId: string;
  onBack: () => void;
  onOpenHive: (hiveId: string) => void;
}

function statusLabel(status: string) {
  if (status === 'alarm') return 'Alarm';
  if (status === 'uwaga') return 'Uwaga';
  if (status === 'brak-pozycji') return 'Brak pozycji';
  return 'OK';
}

function HiveMapTile({ hive, state, onOpenHive, unpositioned = false }: { hive: Hive; state: ApiaryState; onOpenHive: (hiveId: string) => void; unpositioned?: boolean }) {
  const status = unpositioned ? 'brak-pozycji' : getApiaryMapStatus21(hive, state.tasks);
  const pos = getHiveMapPosition(hive);
  const strength = bgApiaryStrengthPercent(hive.strength);

  return (
    <button
      className={`apiary-map-premium-tile status-${status}`}
      onClick={() => onOpenHive(hive.id)}
      aria-label={`${hive.name}, status ${statusLabel(status)}, siła ${hive.strength} na 10`}
    >
      <span className="apiary-map-premium-badge">{statusLabel(status)}</span>
      <div className="apiary-map-premium-visual">
        <HiveMiniImage hive={hive} px={96} />
      </div>
      <div className="apiary-map-premium-copy">
        <strong>{hive.name || `Ul ${hive.number}`}</strong>
        <span>{unpositioned ? 'Bez pozycji' : `Rząd ${pos.row} · Kolumna ${pos.column}`}</span>
        <small>{getShortInspectionLabel21(hive)}</small>
      </div>
      <div className="apiary-map-premium-footer">
        <div className="apiary-map-premium-strength" aria-label={`Siła rodziny ${hive.strength} na 10`}>
          <i style={{ width: `${strength}%` }} />
        </div>
        <CleanQueenImage year={hive.queen.year} className="apiary-map-premium-queen" />
      </div>
    </button>
  );
}

export function ApiaryMapPage({ state, apiaryId, onBack, onOpenHive }: ApiaryMapPageProps) {
  const apiary = state.apiaries.find(item => item.id === apiaryId);
  const hives = state.hives.filter(hive => hive.apiaryId === apiaryId);
  const { positioned, unpositioned } = splitHivesByMapPosition21(hives);
  const rows = buildPremiumApiaryRows21(positioned);
  const stats = buildApiaryMapStats21(hives, state.tasks);
  const attentionMessage = getApiaryMapAttentionMessage21(hives, state.tasks);

  if (!apiary) {
    return (
      <div className="apiary-map-premium-empty">
        <strong>Nie udało się odnaleźć pasieki</strong>
        <button onClick={onBack}>Wróć</button>
      </div>
    );
  }

  return (
    <main className="apiary-map-premium-page" data-version={APIARY_MAP_PREMIUM_VERSION}>
      <button className="back-button premium-back" onClick={onBack}>‹ Pasieka</button>

      <section className="apiary-map-premium-hero">
        <div>
          <span>Mapa pasieki</span>
          <h1>{apiary.name}</h1>
          <p>{apiary.locationName || apiary.location || 'Lokalizacja pasieki'}</p>
        </div>
        <div className="apiary-map-premium-summary">
          <strong>{hives.length}</strong>
          <small>uli</small>
        </div>
      </section>

      <section className="apiary-map-premium-legend" aria-label="Legenda mapy pasieki">
        <span className="legend-ok">OK <b>{stats.ok}</b></span>
        <span className="legend-warning">Uwaga <b>{stats.uwaga}</b></span>
        <span className="legend-alarm">Alarm <b>{stats.alarm}</b></span>
        <span className="legend-muted">Bez pozycji <b>{stats.brakPozycji}</b></span>
      </section>

      <section className="apiary-map-premium-message">
        <strong>{attentionMessage}</strong>
        <p>{unpositioned.length ? 'Ustaw pozycję uli, aby zobaczyć pełną mapę.' : 'Układ uli gotowy do pracy w terenie.'}</p>
      </section>

      {hives.length === 0 ? (
        <section className="apiary-map-premium-empty">
          <strong>Dodaj pierwszy ul do tej pasieki</strong>
          <p>Po dodaniu uli mapa pokaże rzędy, statusy i najważniejsze informacje.</p>
        </section>
      ) : (
        <>
          <section className="apiary-map-premium-scroll" aria-label="Układ uli w pasiece">
            <div className="apiary-map-premium-board">
              {rows.map(row => (
                <div className="apiary-map-premium-row" key={row.row}>
                  <span className="apiary-map-premium-row-label">Rząd {row.row}</span>
                  <div className="apiary-map-premium-row-hives">
                    {row.hives.map(hive => (
                      <HiveMapTile key={hive.id} hive={hive} state={state} onOpenHive={onOpenHive} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {unpositioned.length > 0 && (
            <section className="apiary-map-premium-unpositioned">
              <header>
                <span>Bez pozycji na mapie</span>
                <strong>{unpositioned.length} uli</strong>
              </header>
              <p>Ustaw pozycję uli, aby zobaczyć pełną mapę.</p>
              <div className="apiary-map-premium-unpositioned-grid">
                {unpositioned.map(hive => (
                  <HiveMapTile key={hive.id} hive={hive} state={state} onOpenHive={onOpenHive} unpositioned />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
}
