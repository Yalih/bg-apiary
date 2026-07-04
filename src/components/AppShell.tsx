import type { ReactNode } from 'react';
import type { View } from '../App';
import { AppLayout } from '../layouts/AppLayout';

interface AppShellProps {
  children: ReactNode;
  view: View;
  onNavigate: (view: View) => void;
}

export function AppShell({ children, view, onNavigate }: AppShellProps) {
  return (
    <AppLayout view={view} onNavigate={onNavigate}>
      {children}
    </AppLayout>
  );
}
