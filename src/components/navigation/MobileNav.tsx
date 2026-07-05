import type { View } from '../../App';
import { mobileNavigation } from './navigationItems';

interface MobileNavProps {
  view: View;
  onNavigate: (view: View) => void;
}

export function MobileNav({ view, onNavigate }: MobileNavProps) {
  return (
    <nav className="mobile-nav-v23" aria-label="Nawigacja mobilna">
      {mobileNavigation.map(item => (
        <button
          key={item.view}
          type="button"
          className={view === item.view ? 'active' : ''}
          aria-current={view === item.view ? 'page' : undefined}
          aria-label={`Przejdź do: ${item.label}`}
          onClick={() => onNavigate(item.view)}
        >
          <span aria-hidden="true">{item.icon}</span>
          <small>{item.label}</small>
        </button>
      ))}
    </nav>
  );
}
