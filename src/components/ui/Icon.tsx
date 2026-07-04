import { moduleIconAssets, placeholderAssets, type ModuleIconName, type PlaceholderAssetName } from '../../assets/visualAssets';

interface IconProps {
  name: ModuleIconName;
  size?: number;
  label?: string;
  className?: string;
}

export function Icon({ name, size = 32, label, className = '' }: IconProps) {
  return (
    <img
      className={`ba-icon ${className}`.trim()}
      src={moduleIconAssets[name]}
      width={size}
      height={size}
      alt={label ?? name}
      loading="lazy"
    />
  );
}

interface PlaceholderGraphicProps {
  name: PlaceholderAssetName;
  label?: string;
  className?: string;
}

export function PlaceholderGraphic({ name, label, className = '' }: PlaceholderGraphicProps) {
  return (
    <img
      className={`ba-placeholder-graphic ${className}`.trim()}
      src={placeholderAssets[name]}
      alt={label ?? name}
      loading="lazy"
    />
  );
}
