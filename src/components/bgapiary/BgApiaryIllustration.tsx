import { BG_APIARY_ILLUSTRATIONS, getHiveIllustrationByStrength, type BgApiaryIllustrationName } from '../../logic/bgApiaryAssets';

interface BgApiaryIllustrationProps {
  name: BgApiaryIllustrationName;
  label?: string;
  className?: string;
}

export function BgApiaryIllustration({ name, label, className = '' }: BgApiaryIllustrationProps) {
  return (
    <img
      className={`bgapiary-asset-illustration ${className}`}
      src={BG_APIARY_ILLUSTRATIONS[name]}
      alt={label ?? ''}
      aria-hidden={label ? undefined : true}
      loading="lazy"
    />
  );
}

interface BgApiaryHiveIllustrationProps {
  strength: number;
  label?: string;
  className?: string;
}

export function BgApiaryHiveIllustration({ strength, label = 'Ilustracja ula', className = '' }: BgApiaryHiveIllustrationProps) {
  const name = getHiveIllustrationByStrength(strength);
  return <BgApiaryIllustration name={name} label={label} className={className} />;
}
