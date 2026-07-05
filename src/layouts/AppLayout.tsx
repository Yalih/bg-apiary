import type { ReactNode } from 'react';
import type { View } from '../App';
import { MobileNav } from '../components/navigation/MobileNav';
import { Sidebar } from '../components/navigation/Sidebar';
import { TopBar } from '../components/navigation/TopBar';

interface AppLayoutProps {
  children: ReactNode;
  view: View;
  hiveCount: number;
  taskCount: number;
  onNavigate: (view: View) => void;
}

export function AppLayout({ children, view, hiveCount, taskCount, onNavigate }: AppLayoutProps) {
  return (
    <div className="app-layout-v23">
      <a className="skip-link-v24" href="#main-content">Przejdź do treści</a>
      <TopBar hiveCount={hiveCount} taskCount={taskCount} onNavigate={onNavigate} />
      <div className="app-body-v23">
        <Sidebar view={view} onNavigate={onNavigate} />
        <main id="main-content" className="app-content-v23" tabIndex={-1}>{children}</main>
      </div>
      <MobileNav view={view} onNavigate={onNavigate} />
    </div>
  );
}
