import type { ApiaryState } from '../models/apiary';
import { Section } from '../components/Section';
import { TaskCard } from '../components/TaskCard';
import { getOpenTasks, isTaskDueToday, isTaskOverdue } from '../logic/tasks';

interface TodayPageProps {
  state: ApiaryState;
  onOpenTask: (taskId: string) => void;
  onCompleteTask: (taskId: string) => void;
}

export function TodayPage({ state, onOpenTask, onCompleteTask }: TodayPageProps) {
  const tasks = getOpenTasks(state.tasks).filter(task => isTaskDueToday(task) || isTaskOverdue(task));

  return (
    <>
      <div className="page-header">
        <span>Dzisiaj</span>
        <h1>Do zrobienia teraz</h1>
        <p>Zadania dzisiejsze i zaległe. Czyli ta część życia, której nie da się odłożyć na “potem”.</p>
      </div>

      <Section title="Dzisiejsze i zaległe">
        {tasks.length === 0 ? <div className="empty-card">Brak zadań na dziś.</div> : tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            hive={state.hives.find(hive => hive.id === task.hiveId)}
            onOpenHive={() => onOpenTask(task.id)}
            onComplete={() => onCompleteTask(task.id)}
          />
        ))}
      </Section>
    </>
  );
}
