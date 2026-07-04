import type { HiveIllustrationState } from '../logic/bgsVisual20';

interface HiveIllustrationProps {
  state: HiveIllustrationState;
  label?: string;
}

export function BgsHiveIllustration({ state, label = 'Ilustracja ula' }: HiveIllustrationProps) {
  return (
    <div className={`bgs-hive-illustration-svg state-${state}`} aria-label={label}>
      <div className="bgs-hive-roof" />
      <div className="bgs-hive-box">
        <span />
        <span />
        <span />
      </div>
      <div className="bgs-hive-base" />
      <i className="flower f1" />
      <i className="flower f2" />
      <i className="flower f3" />
    </div>
  );
}

export function BgsNectarIllustration({ type = 'lipa' }: { type?: string }) {
  return (
    <div className={`bgs-nectar-illustration type-${type.toLowerCase()}`} aria-label={`Pożytek ${type}`}>
      <span className="stem" />
      <i className="leaf l1" />
      <i className="leaf l2" />
      <i className="bloom b1" />
      <i className="bloom b2" />
      <i className="bloom b3" />
    </div>
  );
}

export function BgsHoneyIllustration() {
  return (
    <div className="bgs-honey-illustration" aria-label="Ilustracja miodu">
      <div className="jar" />
      <div className="lid" />
      <i />
    </div>
  );
}
