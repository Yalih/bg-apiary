import type { ReactNode } from 'react';
import { Button } from './Button';

interface ModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  actions?: ReactNode;
  description?: string;
}

export function Modal({ open, title, children, onClose, actions, description }: ModalProps) {
  if (!open) return null;

  return (
    <div className="ui-modal" role="presentation">
      <button className="ui-modal__backdrop" aria-label="Zamknij okno" onClick={onClose} />
      <section className="ui-modal__panel" role="dialog" aria-modal="true" aria-labelledby="ui-modal-title" aria-describedby={description ? 'ui-modal-description' : undefined}>
        <header className="ui-modal__header">
          <div>
            <h2 id="ui-modal-title">{title}</h2>
            {description && <p id="ui-modal-description">{description}</p>}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Zamknij">×</Button>
        </header>
        <div className="ui-modal__body">{children}</div>
        {actions && <footer className="ui-modal__footer">{actions}</footer>}
      </section>
    </div>
  );
}
