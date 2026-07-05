import type { ReactNode } from 'react';

interface SectionPanelProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}

export function SectionPanel({ title, subtitle, action, children }: SectionPanelProps) {
  return (
    <section className="section-panel-v23">
      <header>
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}
