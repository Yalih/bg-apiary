import { useMemo } from 'react';
import type { ApiaryState } from '../models/apiary';
import { getUrgentTasks } from '../logic/tasks';
import { buildAlertCenter } from '../logic/alerts';
import { DashboardStatCard } from '../components/dashboard/DashboardStatCard';
import { QuickActionCard } from '../components/dashboard/QuickActionCard';
import { SectionPanel } from '../components/dashboard/SectionPanel';

interface DashboardPageProps {
  state: ApiaryState;
  onOpenHive: (hiveId: string) => void;
  onGoApiaries: () => void;
  onCompleteTask: (taskId: string) => void;
  onOpenTask: (taskId: string) => void;
  onGoCalendar: () => void;
  onOpenWeather: () => void;
  onOpenNectar: () => void;
}

function formatDate(value?: string) {
  if (!value) return 'brak daty';
  return new Intl.DateTimeFormat('pl-PL', { day: '2-digit', month: 'short' }).format(new Date(value));
}

function getFamilyCondition(strength: number) {
  if (strength >= 8) return { label: 'Silna', tone: 'strong' };
  if (strength <= 4) return { label: 'Do obserwacji', tone: 'attention' };
  return { label: 'Stabilna', tone: 'stable' };
}

export function DashboardPage({ state, onOpenHive, onGoApiaries, onCompleteTask, onOpenTask, onGoCalendar, onOpenWeather, onOpenNectar }: DashboardPageProps) {
  const urgentTasks = getUrgentTasks(state.tasks).slice(0, 4);
  const openTasks = state.tasks.filter(task => task.status !== 'done');
  const alerts = buildAlertCenter(state).slice(0, 3);
  const strongHives = state.hives.filter(hive => hive.strength >= 8).length;
  const weakHives = state.hives.filter(hive => hive.strength <= 4).length;
  const lastInspection = useMemo(() => {
    return [...state.inspections].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  }, [state.inspections]);
  const latestHives = state.hives.slice(0, 4);
  const apiaryName = state.apiaries[0]?.name ?? 'Twoja pasieka';

  return (
    <div className="dashboard-v23">
      <section className="dashboard-hero-v23">
        <div>
          <span className="eyebrow-v23">BG Apiary v2.6</span>
          <h1>Centrum dowodzenia pasieką</h1>
          <p>{apiaryName} · {state.hives.length} uli · {openTasks.length} otwartych zadań. Wreszcie wszystko w jednym miejscu, zamiast w notatkach, SMS-ach i pamięci, która jak wiadomo jest zawodna.</p>
        </div>
        <div className="hero-actions-v23">
          <button onClick={onGoApiaries}>Pasieki</button>
          <button onClick={onGoCalendar}>Plan dnia</button>
        </div>
      </section>

      <section className="dashboard-stats-v23" aria-label="Szybkie statystyki">
        <DashboardStatCard label="Ule" value={state.hives.length} note="wszystkie rodziny" tone="gold" />
        <DashboardStatCard label="Silne rodziny" value={strongHives} note="8/10 lub więcej" tone="green" />
        <DashboardStatCard label="Zadania" value={openTasks.length} note="do wykonania" tone="blue" />
        <DashboardStatCard label="Ryzyka" value={weakHives + alerts.length} note="wymagają uwagi" tone="red" />
      </section>

      <section className="quick-actions-grid-v23" aria-label="Szybkie akcje">
        <QuickActionCard title="Dodaj przegląd" description="Szybka notatka z ula" icon="◎" onClick={() => latestHives[0] ? onOpenHive(latestHives[0].id) : onGoApiaries()} />
        <QuickActionCard title="Pogoda" description="Warunki do pracy" icon="☀" onClick={onOpenWeather} />
        <QuickActionCard title="Pożytek" description="Aktualny potencjał" icon="✺" onClick={onOpenNectar} />
        <QuickActionCard title="Kalendarz" description="Plan sezonu" icon="◷" onClick={onGoCalendar} />
      </section>

      <div className="dashboard-columns-v23">
        <SectionPanel title="Najbliższe zadania" subtitle="Priorytety z pasieki" action={<button className="text-action-v23" onClick={onGoCalendar}>Kalendarz</button>}>
          <div className="task-list-v23">
            {urgentTasks.length === 0 ? (
              <div className="empty-state-v23">
                <strong>Brak pilnych zadań</strong>
                <p>To podejrzanie spokojne, ale przyjmijmy na chwilę, że pszczoły współpracują.</p>
              </div>
            ) : urgentTasks.map(task => (
              <article className="task-row-v23" key={task.id}>
                <button onClick={() => onOpenTask(task.id)}>
                  <strong>{task.title}</strong>
                  <span>{formatDate(task.dueDate)} · {task.priority}</span>
                </button>
                <button className="done-button-v23" onClick={() => onCompleteTask(task.id)}>Gotowe</button>
              </article>
            ))}
          </div>
        </SectionPanel>

        <SectionPanel title="Stan rodzin" subtitle="Szybki przegląd uli" action={<button className="text-action-v23" onClick={onGoApiaries}>Wszystkie</button>}>
          <div className="hive-list-v23">
            {latestHives.length === 0 ? (
              <div className="empty-state-v23">
                <strong>Brak uli</strong>
                <p>Dodaj pierwszą pasiekę i ul, bo aplikacja bez danych to tylko bardzo ładna szuflada.</p>
              </div>
            ) : latestHives.map(hive => {
              const condition = getFamilyCondition(hive.strength);
              return (
                <button className="hive-row-v23" key={hive.id} onClick={() => onOpenHive(hive.id)}>
                  <span className="hive-number-v23">{hive.number}</span>
                  <span>
                    <strong>{hive.name}</strong>
                    <small>{hive.frameCount} ramek · matka {hive.queen?.year ?? '—'}</small>
                  </span>
                  <em className={`condition-${condition.tone}`}>{condition.label}</em>
                </button>
              );
            })}
          </div>
        </SectionPanel>
      </div>

      <section className="dashboard-bottom-v23">
        <SectionPanel title="Pogoda i pożytek" subtitle="Placeholder UI pod docelowe dane pogodowe">
          <div className="weather-grid-v23">
            <button onClick={onOpenWeather}>
              <span>☀</span>
              <strong>Pogoda</strong>
              <small>Sprawdź warunki przed przeglądem</small>
            </button>
            <button onClick={onOpenNectar}>
              <span>✺</span>
              <strong>Pożytek</strong>
              <small>Ocena potencjału miodowego</small>
            </button>
          </div>
        </SectionPanel>

        <SectionPanel title="Ostatni przegląd" subtitle="Najświeższy wpis w dzienniku">
          <div className="last-inspection-v23">
            <strong>{lastInspection ? formatDate(lastInspection.date) : 'Brak przeglądów'}</strong>
            <p>{lastInspection?.summary ?? 'Dodaj pierwszy przegląd, żeby dashboard zaczął naprawdę pracować.'}</p>
          </div>
        </SectionPanel>
      </section>
    </div>
  );
}
