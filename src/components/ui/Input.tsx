import type { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
  icon?: ReactNode;
}

export function Input({ label, hint, error, icon, id, className = '', ...props }: InputProps) {
  const fieldId = id ?? `input-${label.toLowerCase().replace(/[^a-z0-9]+/gi, '-')}`;
  const descriptionId = `${fieldId}-description`;

  return (
    <label className={['ui-field', error ? 'ui-field--error' : '', className].filter(Boolean).join(' ')} htmlFor={fieldId}>
      <span className="ui-field__label">{label}</span>
      <span className="ui-input-shell">
        {icon && <span className="ui-input-shell__icon" aria-hidden="true">{icon}</span>}
        <input id={fieldId} className="ui-input" aria-describedby={hint || error ? descriptionId : undefined} {...props} />
      </span>
      {(hint || error) && <span id={descriptionId} className="ui-field__message">{error ?? hint}</span>}
    </label>
  );
}
