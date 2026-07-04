import type { Hive } from '../../models/apiary';
import { getHeroHive, getHiveAsset, getMiniHive, getOverlay, getQueenAsset, getQueenDot, getSeasonHive, getWeatherAsset, getNectarAsset } from '../../logic/assetManager21';

function hasQueen(hive: Hive): boolean {
  return hive.queen.status !== 'queenless' && hive.queen.status !== 'suspected_lost';
}

export function CleanHiveImage({ src, label = 'Ilustracja ula', className = '' }: { src: string; label?: string; className?: string }) {
  return <img className={`asset-manager-image clean-hive-image ${className}`} src={src} alt={label} loading="lazy" />;
}

export function HiveHeroImage({ hive, date, className = '' }: { hive: Hive; date?: Date | string; className?: string }) {
  return <CleanHiveImage src={getSeasonHive({ strength: hive.strength, queenPresent: hasQueen(hive), date }) || getHeroHive({ strength: hive.strength, queenPresent: hasQueen(hive) })} label={`Ilustracja ${hive.name}`} className={`asset-hero ${className}`} />;
}

export function HiveCardImage({ hive, className = '' }: { hive: Hive; className?: string }) {
  return <CleanHiveImage src={getHiveAsset({ strength: hive.strength, queenPresent: hasQueen(hive), size: 'card' })} label={`Ilustracja ${hive.name}`} className={`asset-card ${className}`} />;
}

export function HiveMiniImage({ hive, px = 64, className = '' }: { hive: Hive; px?: 32 | 48 | 64 | 96; className?: string }) {
  return <CleanHiveImage src={getMiniHive({ strength: hive.strength, queenPresent: hasQueen(hive) }, px)} label={`Miniatura ${hive.name}`} className={`asset-mini ${className}`} />;
}

export function QueenYearDot({ year, className = '' }: { year: number; className?: string }) {
  const dot = getQueenDot(year);
  return <img className={`queen-year-dot21 ${dot.cssClass} ${className}`} src={dot.asset} alt={`Kropka ${dot.color} ${year}`} loading="lazy" />;
}

export function CleanQueenImage({ year, className = '' }: { year: number; className?: string }) {
  return (
    <span className={`queen-asset21 ${className}`} aria-label={`Matka ${year}`}>
      <img src={getQueenAsset()} alt="" aria-hidden="true" loading="lazy" />
      <QueenYearDot year={year} />
    </span>
  );
}

export function HiveOverlay({ hive, className = '' }: { hive: Hive; className?: string }) {
  return <img className={`asset-overlay hive-overlay21 ${className}`} src={getOverlay({ strength: hive.strength, queenPresent: hasQueen(hive) })} alt="Status ula" loading="lazy" />;
}

export function WeatherIllustration({ type = 'sun', className = '' }: { type?: string; className?: string }) {
  return <img className={`asset-manager-image weather-illustration ${className}`} src={getWeatherAsset(type)} alt="Pogoda" loading="lazy" />;
}

export function NectarIllustration({ name = 'lipa', className = '' }: { name?: string; className?: string }) {
  return <img className={`asset-manager-image nectar-illustration ${className}`} src={getNectarAsset(name)} alt="Pożytek" loading="lazy" />;
}
