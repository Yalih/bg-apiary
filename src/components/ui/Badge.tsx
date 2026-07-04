import type { HTMLAttributes, ReactNode } from 'react';

type BadgeTone = 'neutral' | 'honey' | 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  tone?: BadgeTone;
  dot?: boolean;
}

export function Badge({ children, tone = 'neutral', dot = false, className = '', ...props }: BadgeProps) {
  return (
    <span className={['ui-badge', `ui-badge--${tone}`, dot ? 'ui-badge--dot' : '', className].filter(Boolean).join(' ')} {...props}>
      {dot && <span className="ui-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
