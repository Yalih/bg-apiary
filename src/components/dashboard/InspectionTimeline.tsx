import type { Hive, Inspection } from '../../models/apiary';

interface InspectionTimelineProps {
  inspections: Inspection[];
  hives: Hive[];
  onOpenHive: (hiveId: string) => void;
  onCreateInspection: () => void;
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('pl-PL', { day: '2-digit', month: 'short' }).format(date);
}

export function InspectionTimeline({ inspections, hives, onOpenHive, onCreateInspection }: InspectionTimelineProps) {
  const latest = [...inspections]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  return (
    <section className="dashboard-v203-panel" aria-labelledby="inspection-timeline-title">
      <div className="dashboard-v203-section-head">
        <div>
          <span>Przeglądy</span>
          <h2 id="inspection-timeline-title">Ostatnie wpisy z uli</h2>
        </div>
        <button onClick={onCreateInspection}>Nowy przegląd</button>
      </div>

      {latest.length === 0 ? (
        <button className="dashboard-v203-empty" onClick={onCreateInspection}>
          <strong>Brak przeglądów</strong>
          <span>Dodaj pierwszy wpis, żeby zobaczyć historię rodzin.</span>
        </button>
      ) : (
        <div className="dashboard-v203-timeline">
          {latest.map(inspection => {
            const hive = hives.find(item => item.id === inspection.hiveId);
            return (
              <button key={inspection.id} onClick={() => onOpenHive(inspection.hiveId)}>
                <time>{formatDate(inspection.date)}</time>
                <div>
                  <strong>{hive?.name ?? 'Ul bez nazwy'}</strong>
                  <span>{inspection.summary || 'Przegląd zapisany'}</span>
                </div>
                <small>{inspection.queenSeen ? 'Matka widziana' : 'Matka niepotwierdzona'}</small>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
