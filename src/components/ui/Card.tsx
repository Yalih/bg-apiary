import type { HTMLAttributes, ReactNode } from 'react';

type CardTone = 'default' | 'honey' | 'success' | 'warning' | 'danger' | 'info';

interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  title?: string;
  eyebrow?: string;
  actions?: ReactNode;
  tone?: CardTone;
  as?: 'article' | 'section' | 'div';
}

export function Card({ children, title, eyebrow, actions, tone = 'default', as: Component = 'article', className = '', ...props }: CardProps) {
  return (
    <Component className={['ui-card', `ui-card--${tone}`, className].filter(Boolean).join(' ')} {...props}>
      {(title || eyebrow || actions) && (
        <header className="ui-card__header">
          <div>
            {eyebrow && <span className="ui-card__eyebrow">{eyebrow}</span>}
            {title && <h2 className="ui-card__title">{title}</h2>}
          </div>
          {actions && <div className="ui-card__actions">{actions}</div>}
        </header>
      )}
      <div className="ui-card__body">{children}</div>
    </Component>
  );
}
