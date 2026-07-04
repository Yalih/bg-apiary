import type { ReactNode } from 'react';
import type { View } from '../App';
import { BottomNav } from './BottomNav';

interface AppShellProps {
  children: ReactNode;
  view: View;
  onNavigate: (view: View) => void;
}

export function AppShell({ children, view, onNavigate }: AppShellProps) {
  return (
    <div className="app-shell">
      <main className="page">{children}</main>
      <BottomNav view={view} onNavigate={onNavigate} />
    </div>
  );
}
