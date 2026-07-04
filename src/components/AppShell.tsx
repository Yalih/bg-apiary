import type { ReactNode } from 'react';
import type { View } from '../App';
import { BottomNav } from './BottomNav';
import { BrandLogo } from './BrandLogo';
import { ModuleIcon, type ModuleIconName } from './ModuleIcon';

interface AppShellProps {
  children: ReactNode;
  view: View;
  onNavigate: (view: View) => void;
}

const APP_VERSION = 'v2.0';

const sidebarItems: Array<{ view: View; label: string; icon: ModuleIconName }> = [
  { view: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { view: 'apiaries', label: 'Pasieki', icon: 'gps' },
  { view: 'hives', label: 'Ule', icon: 'hives' },
  { view: 'queenCatalog', label: 'Matki', icon: 'queens' },
  { view: 'today', label: 'Przeglądy', icon: 'inspections' },
  { view: 'tasks', label: 'Zadania', icon: 'tasks' },
  { view: 'calendar', label: 'Kalendarz', icon: 'calendar' },
  { view: 'reports', label: 'Statystyki', icon: 'statistics' },
  { view: 'weather', label: 'Pogoda', icon: 'weather' },
  { view: 'more', label: 'Ustawienia', icon: 'settings' }
];

export function AppShell({ children, view, onNavigate }: AppShellProps) {
  return (
    <div className="app-shell app-shell-v20">
      <aside className="desktop-sidebar-v20" aria-label="Główne menu BG Apiary">
        <button className="sidebar-brand-v20" onClick={() => onNavigate('dashboard')}>
          <BrandLogo variant="horizontal" />
        </button>
        <nav className="sidebar-nav-v20">
          {sidebarItems.map(item => (
            <button key={item.view} className={view === item.view ? 'active' : ''} onClick={() => onNavigate(item.view)}>
              <ModuleIcon name={item.icon} label={item.label} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-version-v20">
          <strong>BG Apiary {APP_VERSION}</strong>
          <span>Smart Beekeeping Management</span>
        </div>
      </aside>

      <div className="app-content-v20">
        <header className="topbar-v20">
          <button className="topbar-brand-v20" onClick={() => onNavigate('dashboard')}>
            <BrandLogo variant="mark" />
            <span>BG Apiary</span>
            <b>{APP_VERSION}</b>
          </button>
          <div className="topbar-actions-v20">
            <button onClick={() => onNavigate('tasks')} aria-label="Powiadomienia"><ModuleIcon name="alerts" /></button>
            <button onClick={() => onNavigate('weather')} aria-label="Pogoda"><ModuleIcon name="weather" /></button>
            <button onClick={() => onNavigate('more')} className="topbar-profile-v20">PG</button>
          </div>
        </header>
        <main className="page page-v20">{children}</main>
      </div>

      <BottomNav view={view} onNavigate={onNavigate} />
    </div>
  );
}
