export type ModuleIconName = 'dashboard' | 'hives' | 'queens' | 'inspections' | 'tasks' | 'calendar' | 'statistics' | 'weather' | 'settings' | 'notes' | 'gps' | 'alerts';

interface ModuleIconProps {
  name: ModuleIconName;
  label?: string;
  size?: number;
  className?: string;
}

export function ModuleIcon({ name, label, size = 22, className = '' }: ModuleIconProps) {
  return (
    <img
      className={`module-icon module-icon-${name} ${className}`}
      src={`/brand/icons/${name}.svg`}
      width={size}
      height={size}
      alt={label ?? ''}
      aria-hidden={label ? undefined : true}
      loading="lazy"
    />
  );
}
