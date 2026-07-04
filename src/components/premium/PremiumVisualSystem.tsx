import type { ReactNode } from 'react';

export function PremiumCard({ children, className = '', compact = false }: { children: ReactNode; className?: string; compact?: boolean }) {
  return <section className={`premium-ui-card ${compact ? 'premium-ui-card-compact' : ''} ${className}`}>{children}</section>;
}

export function PremiumTile({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`premium-ui-tile ${className}`}>{children}</div>;
}

export function PremiumBadge({ children, tone = 'neutral', className = '' }: { children: ReactNode; tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'gold'; className?: string }) {
  return <span className={`premium-ui-badge premium-ui-badge-${tone} ${className}`}>{children}</span>;
}

export function PremiumSection({ title, action, children, className = '' }: { title: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`premium-ui-section ${className}`}>
      <header className="premium-ui-section-head">
        <h2>{title}</h2>
        {action ? <div>{action}</div> : null}
      </header>
      {children}
    </section>
  );
}

export function PremiumHeader({ eyebrow, title, subtitle, children, className = '' }: { eyebrow?: string; title: string; subtitle?: string; children?: ReactNode; className?: string }) {
  return (
    <header className={`premium-ui-header ${className}`}>
      {eyebrow ? <span>{eyebrow}</span> : null}
      <h1>{title}</h1>
      {subtitle ? <p>{subtitle}</p> : null}
      {children}
    </header>
  );
}

export function PremiumButton({ children, variant = 'primary', className = '', ...props }: { children: ReactNode; variant?: 'primary' | 'secondary' | 'danger' | 'ghost'; className?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`premium-ui-button premium-ui-button-${variant} ${className}`} {...props}>{children}</button>;
}

export function PremiumEmptyState({ title, description, action, illustration }: { title: string; description?: string; action?: ReactNode; illustration?: ReactNode }) {
  return (
    <PremiumCard className="premium-ui-empty">
      {illustration ? <div className="premium-ui-empty-illustration">{illustration}</div> : null}
      <h3>{title}</h3>
      {description ? <p>{description}</p> : null}
      {action ? <div>{action}</div> : null}
    </PremiumCard>
  );
}

export function PremiumSkeleton({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`premium-ui-skeleton ${className}`} aria-hidden="true">
      {Array.from({ length: lines }).map((_, index) => <i key={index} />)}
    </div>
  );
}
