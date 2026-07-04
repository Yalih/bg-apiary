import type { Apiary, Hive } from '../../models/apiary';

interface ApiaryStatusPanelProps {
  apiaries: Apiary[];
  hives: Hive[];
  onOpenApiaries: () => void;
  onOpenHive: (hiveId: string) => void;
}

function statusLabel(hive: Hive): string {
  if (hive.familyStatus === 'strong' || hive.strength >= 8) return 'Silna';
  if (hive.familyStatus === 'weak' || hive.strength <= 4) return 'Do obserwacji';
  if (hive.familyStatus === 'queenless' || hive.familyStatus === 'suspected_queenless') return 'Ryzyko bezmatka';
  return 'Stabilna';
}

export function ApiaryStatusPanel({ apiaries, hives, onOpenApiaries, onOpenHive }: ApiaryStatusPanelProps) {
  const previewHives = [...hives].sort((a, b) => b.strength - a.strength).slice(0, 5);

  return (
    <section className="dashboard-v203-panel" aria-labelledby="apiary-status-title">
      <div className="dashboard-v203-section-head">
        <div>
          <span>Stan pasieki</span>
          <h2 id="apiary-status-title">Rodziny wymagające uwagi</h2>
        </div>
        <button onClick={onOpenApiaries}>Pasieki</button>
      </div>

      <div className="dashboard-v203-apiary-summary">
        <div>
          <strong>{apiaries.length}</strong>
          <span>pasiek</span>
        </div>
        <div>
          <strong>{hives.length}</strong>
          <span>uli</span>
        </div>
        <div>
          <strong>{hives.filter(hive => hive.strength >= 8).length}</strong>
          <span>silnych rodzin</span>
        </div>
      </div>

      {previewHives.length === 0 ? (
        <button className="dashboard-v203-empty" onClick={onOpenApiaries}>
          <strong>Brak uli</strong>
          <span>Dodaj pierwszą rodzinę do pasieki.</span>
        </button>
      ) : (
        <div className="dashboard-v203-hive-list">
          {previewHives.map(hive => (
            <button key={hive.id} onClick={() => onOpenHive(hive.id)}>
              <span aria-hidden="true">🐝</span>
              <div>
                <strong>{hive.name}</strong>
                <small>{statusLabel(hive)} · {hive.frameCount} ramek</small>
              </div>
              <meter min={0} max={10} value={hive.strength} aria-label={`Siła ula ${hive.name}`} />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
