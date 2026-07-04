interface QuickAction {
  label: string;
  description: string;
  icon: string;
  onClick: () => void;
  primary?: boolean;
}

interface QuickActionsPanelProps {
  onCreateInspection: () => void;
  onCreateHive: () => void;
  onCreateTask: () => void;
  onCreateApiary: () => void;
}

export function QuickActionsPanel({ onCreateInspection, onCreateHive, onCreateTask, onCreateApiary }: QuickActionsPanelProps) {
  const quickActions: QuickAction[] = [
    { label: 'Dodaj przegląd', description: 'Zapisz czerw, matkę, pokarm i siłę', icon: '📖', onClick: onCreateInspection, primary: true },
    { label: 'Dodaj ul', description: 'Nowa rodzina lub odkład', icon: '🐝', onClick: onCreateHive },
    { label: 'Zadanie', description: 'Karmienie, leczenie albo kontrola', icon: '✅', onClick: onCreateTask },
    { label: 'Pasieka', description: 'Lokalizacja GPS i opis', icon: '📍', onClick: onCreateApiary }
  ];

  return (
    <section className="dashboard-v203-panel dashboard-v203-panel--actions" aria-labelledby="quick-actions-title">
      <div className="dashboard-v203-section-head">
        <div>
          <span>Szybkie akcje</span>
          <h2 id="quick-actions-title">Dodaj wpis bez szukania menu</h2>
        </div>
      </div>
      <div className="dashboard-v203-actions-grid">
        {quickActions.map(action => (
          <button
            key={action.label}
            className={action.primary ? 'dashboard-v203-action dashboard-v203-action--primary' : 'dashboard-v203-action'}
            onClick={action.onClick}
          >
            <span aria-hidden="true">{action.icon}</span>
            <strong>{action.label}</strong>
            <small>{action.description}</small>
          </button>
        ))}
      </div>
    </section>
  );
}
