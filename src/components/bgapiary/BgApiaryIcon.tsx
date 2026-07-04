import { BG_APIARY_ICON_ALIASES, BG_APIARY_ICONS, type BgApiaryIconName, type BgApiaryStableIconName } from '../../logic/bgApiaryAssets';

interface BgApiaryIconProps {
  name: BgApiaryIconName | BgApiaryStableIconName;
  label?: string;
  size?: number;
  className?: string;
}

export function BgApiaryIcon({ name, label, size = 24, className = '' }: BgApiaryIconProps) {
  const source = (BG_APIARY_ICON_ALIASES as Record<string, string>)[name] ?? (BG_APIARY_ICONS as Record<string, string>)[name];

  return (
    <img
      className={`bgapiary-asset-icon ${className}`}
      src={source}
      width={size}
      height={size}
      alt={label ?? ''}
      aria-hidden={label ? undefined : true}
      loading="lazy"
    />
  );
}
