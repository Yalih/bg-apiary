import type { View } from '../../App';
import { ThemeToggle } from '../theme/ThemeToggle';
import { APP_VERSION, APP_VERSION_LABEL } from '../../version';
import { getNavigationTitle } from './navigationItems';

interface TopBarProps {
  view: View;
}

export function TopBar({ view }: TopBarProps) {
  return (
    <header className="app-topbar" aria-label="Górny pasek aplikacji">
      <div className="app-topbar__brand" aria-label={APP_VERSION_LABEL}>
        <img src="/brand/bg-apiary-icon.svg" alt="" aria-hidden="true" />
        <div>
          <strong>BG Apiary</strong>
          <span>v{APP_VERSION}</span>
        </div>
      </div>

      <div className="app-topbar__context">
        <span>Aktualny widok</span>
        <strong>{getNavigationTitle(view)}</strong>
      </div>

      <div className="app-topbar__toolbar" aria-label="Narzędzia aplikacji">
        <ThemeToggle />
        <div className="app-topbar__actions" aria-label="Status aplikacji">
          <span className="app-status-dot" aria-hidden="true" />
          <span>Online</span>
        </div>
      </div>
    </header>
  );
}
