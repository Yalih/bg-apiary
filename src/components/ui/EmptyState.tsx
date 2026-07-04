import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({ title, description, icon = '🐝', action }: EmptyStateProps) {
  return (
    <section className="ui-empty" aria-label={title}>
      <div className="ui-empty__icon" aria-hidden="true">{icon}</div>
      <h2>{title}</h2>
      <p>{description}</p>
      {action && <div className="ui-empty__action">{action}</div>}
    </section>
  );
}
