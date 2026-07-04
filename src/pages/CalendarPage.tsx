import type { ApiaryState } from '../models/apiary';
import { Section } from '../components/Section';
import { TaskCard } from '../components/TaskCard';
import { getCalendarTasks } from '../logic/tasks';

interface CalendarPageProps {
  state: ApiaryState;
  onOpenTask: (taskId: string) => void;
}

export function CalendarPage({ state, onOpenTask }: CalendarPageProps) {
  const calendar = getCalendarTasks(state.tasks);
  const dates = Object.keys(calendar).sort();

  return (
    <>
      <button className="back-button" onClick={() => history.back()}>‹ Wróć</button>
      <div className="page-header calendar-page-header">
        <span>Kalendarz</span>
        <h1>Kalendarz prac</h1>
        <p>Lista dni z zaplanowanymi zadaniami. Bez udawania pełnego kalendarza miesięcznego, bo miało być porządkowanie, nie festiwal dodatków.</p>
      </div>

      <Section title="Zaplanowane dni">
        {dates.length === 0 ? <div className="empty-card task-empty">Brak zaplanowanych zadań.</div> : dates.map(date => (
          <div className="calendar-day calendar-day-pro" key={date}>
            <div className="calendar-day-header">
              <h3>{date}</h3>
              <span>{calendar[date].length} zadań</span>
            </div>
            {calendar[date].map(task => (
              <TaskCard
                key={task.id}
                task={task}
                hive={state.hives.find(hive => hive.id === task.hiveId)}
                onOpenHive={() => onOpenTask(task.id)}
              />
            ))}
          </div>
        ))}
      </Section>
    </>
  );
}
