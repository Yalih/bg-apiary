import type { SelectHTMLAttributes } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  hint?: string;
  error?: string;
}

export function Select({ label, options, hint, error, id, className = '', ...props }: SelectProps) {
  const fieldId = id ?? `select-${label.toLowerCase().replace(/[^a-z0-9]+/gi, '-')}`;
  const descriptionId = `${fieldId}-description`;

  return (
    <label className={['ui-field', error ? 'ui-field--error' : '', className].filter(Boolean).join(' ')} htmlFor={fieldId}>
      <span className="ui-field__label">{label}</span>
      <span className="ui-select-shell">
        <select id={fieldId} className="ui-select" aria-describedby={hint || error ? descriptionId : undefined} {...props}>
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </span>
      {(hint || error) && <span id={descriptionId} className="ui-field__message">{error ?? hint}</span>}
    </label>
  );
}
