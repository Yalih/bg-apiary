import type { View } from '../../App';
import { primaryNavigationItems } from './navigationItems';

interface MobileNavProps {
  view: View;
  onNavigate: (view: View) => void;
}

export function MobileNav({ view, onNavigate }: MobileNavProps) {
  return (
    <nav className="app-mobile-nav" aria-label="Dolna nawigacja mobilna">
      {primaryNavigationItems.map(item => (
        <button
          key={item.view}
          type="button"
          className={view === item.view ? 'is-active' : ''}
          onClick={() => onNavigate(item.view)}
          aria-current={view === item.view ? 'page' : undefined}
        >
          <span aria-hidden="true">{item.icon}</span>
          <small>{item.shortLabel ?? item.label}</small>
        </button>
      ))}
    </nav>
  );
}
