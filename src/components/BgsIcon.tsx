import { iconPath, type BGS_VISUAL_ICONS } from '../logic/bgsVisual20';

type IconName = keyof typeof BGS_VISUAL_ICONS;

interface BgsIconProps {
  name: IconName;
  label?: string;
  className?: string;
}

export function BgsIcon({ name, label, className = '' }: BgsIconProps) {
  return (
    <svg className={`bgs-line-icon ${className}`} viewBox="0 0 24 24" role={label ? 'img' : 'presentation'} aria-label={label} aria-hidden={label ? undefined : true}>
      <path d={iconPath(name)} />
    </svg>
  );
}
