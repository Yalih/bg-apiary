import type { Hive, Task } from '../models/apiary';
import { getQueenColor } from '../logic/queenColor';
import { getQueenMarkingByYear } from '../logic/queenMarking20';
import { HiveCardImage, HiveStatusOverlay, CleanQueenImage } from './bgapiary/CleanAssets';
import { formatRelativeDays } from '../logic/date';
import { getConditionLabel, getHiveCondition } from '../logic/hiveStatus';
import { bgApiaryHiveTone, bgApiaryStrengthLabel, bgApiaryStrengthPercent } from '../logic/bgApiaryPremium20';

interface HiveCardProps {
  hive: Hive;
  tasks: Task[];
  onOpen: () => void;
}

function foodLabel(food: Hive['foodLevel']): string {
  return {
    niski: 'niski zapas',
    średni: 'średni zapas',
    dobry: 'dobry zapas'
  }[food];
}

export function HiveCard({ hive, tasks, onOpen }: HiveCardProps) {
  const queenColor = getQueenColor(hive.queen.year);
  const queenMarking = getQueenMarkingByYear(hive.queen.year);
  const condition = getHiveCondition(hive, tasks);
  const hiveTasks = tasks.filter(task => task.hiveId === hive.id && task.status === 'open');

  return (
    <button className={`premium-hive-list-card tone-${bgApiaryHiveTone(hive.strength)} condition-${condition}`} onClick={onOpen}>
      <div className="premium-card-illustration clean-ready" aria-hidden="true"><HiveCardImage hive={hive} /><HiveStatusOverlay hive={hive} className="card-clean-status" /></div>
      <div className="premium-card-body">
        <div className="premium-card-title-row">
          <h3>{hive.name}</h3>
          <span>{getConditionLabel(condition)}</span>
        </div>
        <p>{bgApiaryStrengthLabel(hive.strength)} · {foodLabel(hive.foodLevel)}</p>
        <div className="premium-card-progress"><i style={{ width: `${bgApiaryStrengthPercent(hive.strength)}%` }} /></div>
        <div className="premium-card-meta">
          <span>{hive.frameCount}/10 ramek</span>
          <span>{formatRelativeDays(hive.lastInspectionAt)}</span>
          <span>{hiveTasks.length} zadań</span>
        </div>
      </div>
      <CleanQueenImage year={hive.queen.year} className="hive-card-queen-clean" />
    </button>
  );
}
