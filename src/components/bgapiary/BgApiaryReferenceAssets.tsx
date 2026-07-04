import {
  BG_APIARY_REFERENCE_HIVES,
  BG_APIARY_REFERENCE_QUEENS,
  BG_APIARY_REFERENCE_STATUS,
  getReferenceHiveByState,
  getReferenceQueenByStatus,
  type BgApiaryReferenceHiveName,
  type BgApiaryReferenceQueenName,
  type BgApiaryReferenceStatusName
} from '../../logic/bgApiaryReferenceAssets';
import { getQueenMarkingByYear } from '../../logic/queenMarking20';

interface ReferenceImageProps {
  src: string;
  label?: string;
  className?: string;
}

function ReferenceImage({ src, label, className = '' }: ReferenceImageProps) {
  return <img className={`bgapiary-reference-image ${className}`} src={src} alt={label ?? ''} aria-hidden={label ? undefined : true} loading="lazy" />;
}

export function BgApiaryReferenceHive({ name, label, className = '' }: { name: BgApiaryReferenceHiveName; label?: string; className?: string }) {
  return <ReferenceImage src={BG_APIARY_REFERENCE_HIVES[name]} label={label ?? 'Ilustracja ula'} className={`bgapiary-reference-hive ${className}`} />;
}

export function BgApiaryReferenceHiveByState({ strength, queenPresent, quarantine, treatment, alarm, winter, label, className = '' }: {
  strength: number;
  queenPresent?: boolean;
  quarantine?: boolean;
  treatment?: boolean;
  alarm?: boolean;
  winter?: boolean;
  label?: string;
  className?: string;
}) {
  const name = getReferenceHiveByState({ strength, queenPresent, quarantine, treatment, alarm, winter });
  return <BgApiaryReferenceHive name={name} label={label} className={className} />;
}

export function BgApiaryReferenceQueen({ name, label, className = '' }: { name: BgApiaryReferenceQueenName; label?: string; className?: string }) {
  return <ReferenceImage src={BG_APIARY_REFERENCE_QUEENS[name]} label={label ?? 'Ikona matki'} className={`bgapiary-reference-queen ${className}`} />;
}

export function BgApiaryReferenceQueenByStatus({ present, accepted, laying, weakLaying, replace, young, old, caged, quality, label, className = '' }: {
  present?: boolean;
  accepted?: boolean;
  laying?: boolean;
  weakLaying?: boolean;
  replace?: boolean;
  young?: boolean;
  old?: boolean;
  caged?: boolean;
  quality?: number;
  label?: string;
  className?: string;
}) {
  const name = getReferenceQueenByStatus({ present, accepted, laying, weakLaying, replace, young, old, caged, quality });
  return <BgApiaryReferenceQueen name={name} label={label} className={className} />;
}

export function BgApiaryReferenceStatus({ name, label, className = '' }: { name: BgApiaryReferenceStatusName; label?: string; className?: string }) {
  return <ReferenceImage src={BG_APIARY_REFERENCE_STATUS[name]} label={label ?? name} className={`bgapiary-reference-status ${className}`} />;
}


export function BgApiaryReferenceQueenWithYear({ year, present = true, accepted, laying, weakLaying, replace, young, old, caged, quality, label, className = '' }: {
  year: number;
  present?: boolean;
  accepted?: boolean;
  laying?: boolean;
  weakLaying?: boolean;
  replace?: boolean;
  young?: boolean;
  old?: boolean;
  caged?: boolean;
  quality?: number;
  label?: string;
  className?: string;
}) {
  const marking = getQueenMarkingByYear(year);
  const queenName = getReferenceQueenByStatus({ present, accepted, laying, weakLaying, replace, young, old, caged, quality });

  return (
    <span className={`bgapiary-queen-year-wrap ${className}`} aria-label={`${label ?? 'Matka'} – kropka ${marking.color}, ${year}`}>
      <img className="bgapiary-reference-image bgapiary-reference-queen" src={BG_APIARY_REFERENCE_QUEENS[queenName]} alt="" aria-hidden="true" loading="lazy" />
      <i className={`bgapiary-queen-year-dot ${marking.cssClass}`} title={`Kropka ${marking.color} · ${year}`} />
    </span>
  );
}
