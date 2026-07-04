import type { Hive, Task } from '../models/apiary';
import { BgApiaryIcon } from './bgapiary/BgApiaryIcon';
import { getPriorityLabel, getTaskTypeLabel, isTaskOverdue, isTaskDueToday } from '../logic/tasks';

interface TaskCardProps {
  task: Task;
  hive?: Hive;
  onOpenHive: () => void;
  onComplete?: () => void;
}

function actionLabel(targetAction: Task['targetAction']): string {
  return {
    open_hive: 'Otwórz ul',
    inspection: 'Dodaj przegląd',
    feeding: 'Dodaj karmienie',
    note: 'Dodaj notatkę',
    queen_replacement: 'Wymień matkę'
  }[targetAction];
}

function actionIcon(targetAction: Task['targetAction']): string {
  return {
    open_hive: '',
    inspection: '🔍',
    feeding: '🍯',
    note: '📝',
    queen_replacement: '👑'
  }[targetAction];
}

export function TaskCard({ task, hive, onOpenHive, onComplete }: TaskCardProps) {
  const overdue = isTaskOverdue(task);
  const today = isTaskDueToday(task);

  return (
    <div className={`card task-card task-card-pro priority-${task.priority} ${overdue ? 'overdue' : ''} ${today ? 'today' : ''}`}>
      <button className="task-main task-main-pro" onClick={onOpenHive}>
        <div className="task-icon">{actionIcon(task.targetAction)}</div>
        <div className="task-content">
          <div className="task-title-row">
            <strong>{getTaskTypeLabel(task.type)} · {task.title}</strong>
            <span className={`task-priority priority-pill-${task.priority}`}>{getPriorityLabel(task.priority)}</span>
          </div>
          <p>{hive ? hive.name : 'Ul nieznany'} · termin {task.dueDate}</p>
          <div className="meta-row task-meta">
            {overdue && <span>Zaległe</span>}
            {today && <span>Dzisiaj</span>}
            {task.source && <span>{task.source}</span>}
            <span>{actionLabel(task.targetAction)}</span>
          </div>
          {task.description && <small>{task.description}</small>}
        </div>
        <span className="arrow">›</span>
      </button>
      {onComplete && task.status !== 'done' && (
        <button className="small-action task-done-action" onClick={onComplete}>
          OK Oznacz jako zrobione
        </button>
      )}
    </div>
  );
}
