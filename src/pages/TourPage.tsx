import type { ApiaryState, WorkTourProgress } from '../models/apiary';
import { Section } from '../components/Section';
import { TaskCard } from '../components/TaskCard';
import { getNextTourTask, getTourProgress } from '../logic/workTour';

interface TourPageProps {
  state: ApiaryState;
  tour: WorkTourProgress;
  onBack: () => void;
  onOpenTask: (taskId: string) => void;
  onCompleteTask: (taskId: string) => void;
  onCompleteTourTask: (taskId: string) => void;
}

export function TourPage({ state, tour, onBack, onOpenTask, onCompleteTask, onCompleteTourTask }: TourPageProps) {
  const progress = getTourProgress(tour);
  const nextTask = getNextTourTask(tour, state.tasks);
  const orderedTasks = tour.taskIds.map(id => state.tasks.find(task => task.id === id)).filter(Boolean);
  const currentHive = nextTask ? state.hives.find(hive => hive.id === nextTask.hiveId) : undefined;
  const apiary = currentHive ? state.apiaries.find(item => item.id === currentHive.apiaryId) : undefined;

  function finishTask(taskId: string) {
    onCompleteTask(taskId);
    onCompleteTourTask(taskId);
  }

  return (
    <>
      <button className="back-button" onClick={onBack}>‹ Centrum Prac</button>

      <section className="tour-hero">
        <div>
          <span>Obchód pasieki</span>
          <h1>{progress}% wykonane</h1>
          <p>{tour.completedTaskIds.length} / {tour.taskIds.length} zadań. Aplikacja prowadzi po kolei, żeby człowiek nie krążył po pasiece jak mucha przy szybie.</p>
        </div>
        <div className="tour-progress-ring">
          <strong>{progress}%</strong>
          <small>postęp</small>
        </div>
      </section>

      <div className="progress-bar"><span style={{ width: `${progress}%` }} /></div>

      {nextTask && currentHive ? (
        <Section title="Następny ul">
          <div className="card next-tour-card">
            <span>{apiary?.name}</span>
            <strong>{currentHive.name}</strong>
            <p>{nextTask.title} · {nextTask.dueDate} · {nextTask.priority}</p>
            <div className="tour-actions">
              <button className="mini-button" onClick={() => onOpenTask(nextTask.id)}>Otwórz działanie</button>
              <button className="mini-button secondary-mini" onClick={() => finishTask(nextTask.id)}>✓ Wykonane i dalej</button>
            </div>
          </div>
        </Section>
      ) : (
        <div className="empty-card tour-done">Obchód zakończony. Wszystkie prace z tej kolejki są wykonane. Pszczoły pewnie już planują kontratak na jutro.</div>
      )}

      <Section title="Kolejka obchodu">
        {orderedTasks.length === 0 ? <div className="empty-card">Brak zadań w obchodzie.</div> : orderedTasks.map(task => {
          const hive = state.hives.find(item => item.id === task!.hiveId);
          const completed = tour.completedTaskIds.includes(task!.id) || task!.status === 'done';
          return (
            <div className={`tour-task-row ${completed ? 'completed' : ''}`} key={task!.id}>
              <TaskCard
                task={task!}
                hive={hive}
                onOpenHive={() => onOpenTask(task!.id)}
                onComplete={() => finishTask(task!.id)}
              />
            </div>
          );
        })}
      </Section>
    </>
  );
}
