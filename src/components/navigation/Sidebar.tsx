import type { View } from '../../App';
import { primaryNavigationItems, secondaryNavigationItems } from './navigationItems';

interface SidebarProps {
  view: View;
  onNavigate: (view: View) => void;
}

export function Sidebar({ view, onNavigate }: SidebarProps) {
  return (
    <aside className="app-sidebar" aria-label="Nawigacja boczna">
      <div className="app-sidebar__logo">
        <img src="/brand/bg-apiary-logo-dark.svg" alt="BG Apiary" />
      </div>

      <nav className="app-sidebar__section" aria-label="Główne moduły">
        <span className="app-sidebar__label">Główne</span>
        {primaryNavigationItems.map(item => (
          <button
            key={item.view}
            type="button"
            className={view === item.view ? 'app-sidebar__item is-active' : 'app-sidebar__item'}
            onClick={() => onNavigate(item.view)}
            aria-current={view === item.view ? 'page' : undefined}
          >
            <span className="app-sidebar__icon" aria-hidden="true">{item.icon}</span>
            <span>
              <strong>{item.label}</strong>
              <small>{item.description}</small>
            </span>
          </button>
        ))}
      </nav>

      <nav className="app-sidebar__section app-sidebar__section--secondary" aria-label="Narzędzia">
        <span className="app-sidebar__label">Narzędzia</span>
        {secondaryNavigationItems.map(item => (
          <button
            key={item.view}
            type="button"
            className={view === item.view ? 'app-sidebar__item is-active' : 'app-sidebar__item'}
            onClick={() => onNavigate(item.view)}
            aria-current={view === item.view ? 'page' : undefined}
          >
            <span className="app-sidebar__icon" aria-hidden="true">{item.icon}</span>
            <span>
              <strong>{item.label}</strong>
              <small>{item.description}</small>
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
