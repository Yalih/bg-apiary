import { useMemo } from 'react';
import type { ApiaryState, Hive, Task } from '../models/apiary';
import { getUrgentTasks } from '../logic/tasks';
import { buildAlertCenter } from '../logic/alerts';
import { buildReminderSummary } from '../logic/reminders';
import { buildDailyPriority } from '../logic/assistant20';
import { buildDashboardWeatherCard, buildMissingLocationWeather, getApiaryCoordinates, selectApiaryForWeather } from '../logic/weatherAccuracy21';
import { getCurrentNectarFlow } from '../logic/nectarAccuracy21';
import { DashboardStatCard } from '../components/dashboard/DashboardStatCard';
import { QuickActionsPanel } from '../components/dashboard/QuickActionsPanel';
import { WeatherWidget } from '../components/dashboard/WeatherWidget';
import { InspectionTimeline } from '../components/dashboard/InspectionTimeline';
import { ApiaryStatusPanel } from '../components/dashboard/ApiaryStatusPanel';
import '../styles/dashboard-v203.css';

interface DashboardPageProps {
  state: ApiaryState;
  onOpenHive: (hiveId: string) => void;
  onGoApiaries: () => void;
  onCompleteTask: (taskId: string) => void;
  onOpenTask: (taskId: string) => void;
  onGoCalendar: () => void;
  onOpenWeather: () => void;
  onOpenNectar: () => void;
  onCreateApiary: () => void;
  onCreateHive: () => void;
  onCreateInspection: () => void;
  onCreateTask: () => void;
}

function formatShortDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('pl-PL', { day: '2-digit', month: 'short' }).format(date);
}

function taskPriorityLabel(task: Task): string {
  if (task.priority === 'urgent') return 'Pilne';
  if (task.priority === 'high') return 'Ważne';
  if (task.priority === 'medium') return 'Plan';
  return 'Niskie';
}

function hiveHealthLabel(hive: Hive): string {
  if (hive.strength >= 8) return 'Mocna rodzina';
  if (hive.strength <= 4) return 'Do obserwacji';
  if (hive.queen.status === 'queenless' || hive.familyStatus === 'queenless') return 'Ryzyko bezmatka';
  return 'Stabilnie';
}

export function DashboardPage({
  state,
  onOpenHive,
  onGoApiaries,
  onCompleteTask,
  onOpenTask,
  onGoCalendar,
  onOpenWeather,
  onOpenNectar,
  onCreateApiary,
  onCreateHive,
  onCreateInspection,
  onCreateTask
}: DashboardPageProps) {
  const openTasks = useMemo(() => state.tasks.filter(task => task.status !== 'done'), [state.tasks]);
  const urgentTasks = useMemo(() => getUrgentTasks(state.tasks).slice(0, 4), [state.tasks]);
  const alerts = useMemo(() => buildAlertCenter(state).slice(0, 3), [state]);
  const reminders = useMemo(() => buildReminderSummary(state.tasks), [state.tasks]);
  const dailyPriority = useMemo(() => buildDailyPriority(state), [state]);
  const strongHives = useMemo(() => state.hives.filter(hive => hive.strength >= 8), [state.hives]);
  const lastInspection = useMemo(() => [...state.inspections].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0], [state.inspections]);

  const weatherApiary = selectApiaryForWeather(state);
  const weatherCoords = getApiaryCoordinates(weatherApiary ?? undefined);
  const weatherSnapshot = weatherCoords && weatherApiary
    ? {
        ...buildMissingLocationWeather(weatherApiary),
        source: 'offline-cache' as const,
        latitude: weatherCoords.latitude,
        longitude: weatherCoords.longitude,
        temperatureC: 0,
        windKmh: 0,
        precipitationMm: 0,
        recommendation: 'Podłączone pod lokalizację pasieki. Dane online zostaną spięte w kolejnym module.',
        message: 'Gotowe pod dane pogodowe'
      }
    : buildMissingLocationWeather(weatherApiary);
  const weatherCard = buildDashboardWeatherCard(weatherSnapshot);
  const nectar = getCurrentNectarFlow(state, weatherApiary, weatherSnapshot);

  return (
    <main className="dashboard-v203" aria-labelledby="dashboard-v203-title">
      <section className="dashboard-v203-hero">
        <div className="dashboard-v203-hero__copy">
          <span>BG Apiary v2.0.9</span>
          <h1 id="dashboard-v203-title">Panel właściciela pasieki</h1>
          <p>Dashboard v2 porządkuje najważniejsze dane: rodziny, prace, pogodę, pożytek i ostatnie przeglądy. W końcu ekran główny robi coś więcej niż tylko istnieje.</p>
        </div>
        <div className="dashboard-v203-hero__card">
          <span>Priorytet dnia</span>
          <strong>{dailyPriority?.title ?? 'Sprawdź najbliższe prace'}</strong>
          <p>{dailyPriority?.message ?? 'Brak pilnych alarmów. Utrzymaj rytm przeglądów i zaplanuj kolejne zadania.'}</p>
          <button onClick={onGoCalendar}>Otwórz plan dnia</button>
        </div>
      </section>

      <section className="dashboard-v203-stats" aria-label="Szybkie statystyki pasieki">
        <DashboardStatCard label="Ule" value={state.hives.length} description={`${strongHives.length} silnych rodzin`} icon="🐝" tone="honey" />
        <DashboardStatCard label="Otwarte zadania" value={openTasks.length} description={`${reminders.todayCount} zaplanowane na dziś`} icon="✅" tone="blue" />
        <DashboardStatCard label="Alerty" value={alerts.length} description={alerts.length ? 'Wymagają sprawdzenia' : 'Brak pilnych ostrzeżeń'} icon="⚠️" tone={alerts.length ? 'red' : 'green'} />
        <DashboardStatCard label="Ostatni przegląd" value={lastInspection ? formatShortDate(lastInspection.date) : 'Brak'} description={lastInspection ? 'Ostatni zapis w historii' : 'Dodaj pierwszy przegląd'} icon="📖" tone="graphite" />
      </section>

      <div className="dashboard-v203-grid">
        <div className="dashboard-v203-main-column">
          <QuickActionsPanel
            onCreateInspection={onCreateInspection}
            onCreateHive={onCreateHive}
            onCreateTask={onCreateTask}
            onCreateApiary={onCreateApiary}
          />

          <ApiaryStatusPanel
            apiaries={state.apiaries}
            hives={state.hives}
            onOpenApiaries={onGoApiaries}
            onOpenHive={onOpenHive}
          />

          <InspectionTimeline
            inspections={state.inspections}
            hives={state.hives}
            onOpenHive={onOpenHive}
            onCreateInspection={onCreateInspection}
          />
        </div>

        <aside className="dashboard-v203-side-column" aria-label="Pogoda, pożytek i najbliższe zadania">
          <WeatherWidget
            title={weatherCard.title}
            subtitle={`${weatherCard.subtitle} · ${nectar.label}: ${nectar.name}`}
            recommendation={weatherCard.recommendation}
            onOpenWeather={onOpenWeather}
            onOpenNectar={onOpenNectar}
          />

          <section className="dashboard-v203-panel dashboard-v203-panel--tasks" aria-labelledby="urgent-tasks-title">
            <div className="dashboard-v203-section-head">
              <div>
                <span>Najbliższe prace</span>
                <h2 id="urgent-tasks-title">Co zrobić teraz</h2>
              </div>
              <button onClick={onGoCalendar}>Kalendarz</button>
            </div>

            {urgentTasks.length === 0 ? (
              <button className="dashboard-v203-empty" onClick={onCreateTask}>
                <strong>Brak pilnych zadań</strong>
                <span>Dodaj pracę, żeby nie polegać na pamięci. Odważna strategia, ale kiepska.</span>
              </button>
            ) : (
              <div className="dashboard-v203-task-list">
                {urgentTasks.map(task => {
                  const hive = state.hives.find(item => item.id === task.hiveId);
                  return (
                    <article key={task.id} className={`dashboard-v203-task dashboard-v203-task--${task.priority}`}>
                      <button onClick={() => onOpenTask(task.id)}>
                        <span>{taskPriorityLabel(task)}</span>
                        <strong>{task.title}</strong>
                        <small>{hive?.name ?? 'Bez ula'} · {formatShortDate(task.dueDate)}</small>
                      </button>
                      <button className="dashboard-v203-task__done" onClick={() => onCompleteTask(task.id)}>✓</button>
                    </article>
                  );
                })}
              </div>
            )}
          </section>

          <section className="dashboard-v203-panel dashboard-v203-panel--health" aria-labelledby="hive-health-title">
            <div className="dashboard-v203-section-head">
              <div>
                <span>Stan rodzin</span>
                <h2 id="hive-health-title">Szybki odczyt</h2>
              </div>
            </div>
            <div className="dashboard-v203-health-list">
              {state.hives.slice(0, 4).map(hive => (
                <button key={hive.id} onClick={() => onOpenHive(hive.id)}>
                  <strong>{hive.name}</strong>
                  <span>{hiveHealthLabel(hive)}</span>
                  <meter min={0} max={10} value={hive.strength} aria-label={`Siła ${hive.name}`} />
                </button>
              ))}
              {state.hives.length === 0 && (
                <button className="dashboard-v203-empty" onClick={onCreateHive}>
                  <strong>Brak rodzin</strong>
                  <span>Dodaj pierwszy ul, żeby panel miał co liczyć.</span>
                </button>
              )}
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
