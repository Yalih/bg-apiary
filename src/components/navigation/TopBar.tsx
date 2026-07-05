import type { View } from '../../App';

interface TopBarProps {
  hiveCount: number;
  taskCount: number;
  onNavigate: (view: View) => void;
}

export function TopBar({ hiveCount, taskCount, onNavigate }: TopBarProps) {
  return (
    <header className="topbar-v23">
      <button type="button" className="brand-v23" onClick={() => onNavigate('dashboard')} aria-label="Przejdź do dashboardu">
        <span className="brand-mark-v23" aria-hidden="true">BG</span>
        <span>
          <strong>BG Apiary</strong>
          <small>v2.6 · Sprint 2 final</small>
        </span>
      </button>

      <div className="topbar-metrics-v23" aria-label="Szybki status pasieki">
        <span><strong>{hiveCount}</strong> uli</span>
        <span><strong>{taskCount}</strong> zadań</span>
      </div>

      <div className="topbar-actions-v23">
        <button type="button" onClick={() => onNavigate('createHive')} aria-label="Dodaj nowy ul">+ Ul</button>
        <button type="button" onClick={() => onNavigate('createTask')} aria-label="Dodaj nowe zadanie">+ Zadanie</button>
      </div>
    </header>
  );
}
