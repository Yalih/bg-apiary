import type { Apiary, Hive, Task } from '../models/apiary';
import { getOpenTasks } from '../logic/tasks';
import { getHiveCondition } from '../logic/hiveStatus';

interface ApiaryCardProps {
  apiary: Apiary;
  hives: Hive[];
  tasks: Task[];
  onOpen: () => void;
}

export function ApiaryCard({ apiary, hives, tasks, onOpen }: ApiaryCardProps) {
  const openTasks = getOpenTasks(tasks.filter(task => task.apiaryId === apiary.id));
  const urgentHives = hives.filter(hive => getHiveCondition(hive, tasks) === 'urgent').length;
  const attentionHives = hives.filter(hive => getHiveCondition(hive, tasks) === 'attention').length;
  const statusLabel = urgentHives > 0 ? 'Pilne' : attentionHives > 0 ? 'Obserwacja' : 'Spokojnie';
  const statusClass = urgentHives > 0 ? 'urgent' : attentionHives > 0 ? 'attention' : 'ok';

  return (
    <button className={`card apiary-card apiary-card-pro clickable condition-${statusClass}`} onClick={onOpen}>
      <div className="apiary-card-top">
        <div className="apiary-icon">{apiary.imageEmoji}</div>
        <div className="apiary-main">
          <div className="apiary-title-row">
            <h3>{apiary.name}</h3>
            <span className={`status-pill ${statusClass}`}>{statusLabel}</span>
          </div>
          <p>{apiary.location}</p>
        </div>
        <span className="arrow">›</span>
      </div>

      <div className="apiary-metrics">
        <span><strong>{hives.length}</strong> uli</span>
        <span><strong>{openTasks.length}</strong> zadań</span>
        <span><strong>{urgentHives + attentionHives}</strong> do uwagi</span>
      </div>

      <small>{apiary.description}</small>
    </button>
  );
}
