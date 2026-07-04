import type { ReactNode } from 'react';
import type { View } from '../App';
import { MobileNav } from '../components/navigation/MobileNav';
import { Sidebar } from '../components/navigation/Sidebar';
import { TopBar } from '../components/navigation/TopBar';

interface AppLayoutProps {
  children: ReactNode;
  view: View;
  onNavigate: (view: View) => void;
}

export function AppLayout({ children, view, onNavigate }: AppLayoutProps) {
  return (
    <div className="app-layout-shell">
      <Sidebar view={view} onNavigate={onNavigate} />
      <div className="app-layout-main">
        <TopBar view={view} />
        <main className="app-layout-content" id="app-main-content">
          {children}
        </main>
      </div>
      <MobileNav view={view} onNavigate={onNavigate} />
    </div>
  );
}
