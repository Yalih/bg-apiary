import type { Hive } from '../../models/apiary';
import { BgApiaryHiveIllustration } from './BgApiaryIllustration';

interface BgApiaryHiveAssetCardProps {
  hive: Hive;
  onOpen?: () => void;
}

export function BgApiaryHiveAssetCard({ hive, onOpen }: BgApiaryHiveAssetCardProps) {
  const strengthPercent = Math.max(0, Math.min(100, hive.strength * 10));

  return (
    <button className="bgapiary-asset-hive-card" onClick={onOpen}>
      <BgApiaryHiveIllustration strength={hive.strength} />
      <div>
        <strong>{hive.name}</strong>
        <span>{hive.strength >= 8 ? 'Bardzo silna rodzina' : hive.strength >= 5 ? 'Średnia rodzina' : 'Wymaga uwagi'}</span>
        <i><b style={{ width: `${strengthPercent}%` }} /></i>
      </div>
      <small>{hive.frameCount}/10 ramek</small>
    </button>
  );
}
