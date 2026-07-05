import type { ReactNode } from 'react';
import type { View } from '../App';
import { AppLayout } from '../layouts/AppLayout';

interface AppShellProps {
  children: ReactNode;
  view: View;
  onNavigate: (view: View) => void;
  hiveCount?: number;
  taskCount?: number;
}

export function AppShell({ children, view, onNavigate, hiveCount = 0, taskCount = 0 }: AppShellProps) {
  return (
    <AppLayout view={view} onNavigate={onNavigate} hiveCount={hiveCount} taskCount={taskCount}>
      {children}
    </AppLayout>
  );
}
