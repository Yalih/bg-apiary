import type { Hive } from '../../models/apiary';
import {
  CleanHiveImage,
  HiveHeroImage,
  HiveCardImage,
  HiveMiniImage,
  CleanQueenImage,
  QueenYearDot,
  HiveOverlay,
  WeatherIllustration,
  NectarIllustration
} from './AssetManagerComponents21';
import { getOverlay } from '../../logic/assetManager21';

export {
  CleanHiveImage,
  HiveHeroImage,
  HiveCardImage,
  HiveMiniImage,
  CleanQueenImage,
  QueenYearDot,
  HiveOverlay,
  WeatherIllustration,
  NectarIllustration
};

export function HiveStatusOverlay({ hive, name, className = '' }: { hive?: Hive; name?: string; className?: string }) {
  if (hive) return <HiveOverlay hive={hive} className={className} />;
  const normalized = name === 'ok' || name === 'uwaga' || name === 'alarm' ? name : 'ok';
  return <img className={`asset-overlay hive-overlay21 ${className}`} src={getOverlay({ alarm: normalized === 'alarm', strength: normalized === 'uwaga' ? 5 : 8 })} alt="Status ula" loading="lazy" />;
}

export function HiveVisualCard({ hive, onOpen }: { hive: Hive; onOpen?: () => void }) {
  const strengthPercent = Math.max(0, Math.min(100, hive.strength * 10));
  return (
    <button className="hive-visual-card" onClick={onOpen}>
      <div className="hive-visual-art">
        <HiveCardImage hive={hive} />
        <HiveOverlay hive={hive} className="hive-visual-status" />
      </div>
      <div className="hive-visual-copy">
        <strong>{hive.name}</strong>
        <span>{hive.strength >= 8 ? 'Bardzo silna rodzina' : hive.strength >= 5 ? 'Średnia rodzina' : 'Wymaga uwagi'}</span>
        <i><b style={{ width: `${strengthPercent}%` }} /></i>
        <small>{hive.frameCount}/10 ramek</small>
      </div>
      <CleanQueenImage year={hive.queen.year} className="hive-visual-queen" />
    </button>
  );
}
