import type { View } from '../../App';
import { primaryNavigation } from './navigationItems';

interface SidebarProps {
  view: View;
  onNavigate: (view: View) => void;
}

export function Sidebar({ view, onNavigate }: SidebarProps) {
  return (
    <aside className="sidebar-v23" aria-label="Nawigacja główna">
      <div className="sidebar-section-v23">
        <span className="sidebar-label-v23">Główne moduły</span>
        {primaryNavigation.map(item => (
          <button
            key={item.view}
            type="button"
            className={view === item.view ? 'active' : ''}
            aria-current={view === item.view ? 'page' : undefined}
            onClick={() => onNavigate(item.view)}
          >
            <span className="nav-icon-v23" aria-hidden="true">{item.icon}</span>
            <span>
              <strong>{item.label}</strong>
              <small>{item.description}</small>
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}
