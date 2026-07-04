import { Section } from '../components/Section';
import { TaskCard } from '../components/TaskCard';
import { StatCard } from '../components/StatCard';
import type { ApiaryState } from '../models/apiary';
import { buildAlertCenter } from '../logic/alerts';
import { buildReminderSummary } from '../logic/reminders';
import { getUrgentTasks } from '../logic/tasks';

interface StartPageProps {
  state: ApiaryState;
  onGoDashboard: () => void;
  onGoApiaries: () => void;
  onCreateApiary: () => void;
  onOpenTask: (taskId: string) => void;
}

export function StartPage({ state, onGoDashboard, onGoApiaries, onCreateApiary, onOpenTask }: StartPageProps) {
  const openTasks = state.tasks.filter(task => task.status === 'open');
  const urgentTasks = getUrgentTasks(state.tasks).slice(0, 3);
  const alerts = buildAlertCenter(state).slice(0, 3);
  const reminders = buildReminderSummary(state.tasks);
  const hasApiaries = state.apiaries.length > 0;

  return (
    <>
      <section className="hero hero-dashboard">
        <div className="hero-kicker">
          <span className="hero-badge">BgApiary 2.0 FINAL</span>
          <span className="hero-pill">{reminders.todayCount} dziś · {reminders.overdueCount} zaległe</span>
        </div>
        <h1>🐝 Co dziś w pasiece?</h1>
        <p>
          Najpierw pilne akcje, potem alerty i skrót stanu. Mniej szukania, więcej działania, bo pszczoły raczej nie czekają na UX review.
        </p>
        <div className="hero-actions">
          <button className="primary" onClick={onGoDashboard}>Otwórz panel</button>
          {hasApiaries ? <button className="secondary" onClick={onGoApiaries}>Pasieki</button> : <button className="secondary" onClick={onCreateApiary}>Załóż pasiekę</button>}
        </div>
      </section>

      <div className="start-summary-grid">
        <StatCard label="Otwarte" value={openTasks.length} />
        <StatCard label="Dzisiaj" value={reminders.todayCount} />
        <StatCard label="Alerty" value={alerts.length} />
      </div>

      <Section title="Pilne akcje">
        {urgentTasks.length === 0 ? <div className="empty-card calm-card">Brak pilnych zadań. Podejrzanie spokojnie, ale nie narzekajmy.</div> : urgentTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            hive={state.hives.find(hive => hive.id === task.hiveId)}
            onOpenHive={() => onOpenTask(task.id)}
          />
        ))}
      </Section>

      <Section title="Alerty rodzin">
        {alerts.length === 0 ? <div className="empty-card calm-card">Brak alertów rodzin.</div> : alerts.map(alert => (
          <div className={`card alert-card alert-${alert.level}`} key={alert.id}>
            <div className="alert-title-row">
              <strong>{alert.title}</strong>
              <span>{alert.level === 'urgent' ? 'Pilne' : 'Obserwacja'}</span>
            </div>
            <p>{alert.details}</p>
          </div>
        ))}
      </Section>

      <Section title="Stan aplikacji">
        <div className="summary-strip summary-strip-large">
          <span>{state.apiaries.length} pasieki</span>
          <span>{state.hives.length} uli</span>
          <span>{openTasks.length} zadań otwartych</span>
        </div>
      </Section>
    </>
  );
}
