import { useMemo, useState } from 'react';
import type { ApiaryState } from '../models/apiary';
import { TaskCard } from '../components/TaskCard';
import { BrandLogo } from '../components/BrandLogo';
import { ModuleIcon } from '../components/ModuleIcon';
import { buildAlertCenter } from '../logic/alerts';
import { buildReminderSummary } from '../logic/reminders';
import { getUrgentTasks } from '../logic/tasks';
import { buildColonyRanking, buildDailyPriority, buildPredictions20, buildRecommendations20 } from '../logic/assistant20';
import { buildNotificationCenter } from '../logic/rcQuality20';
import { globalSearch20 } from '../logic/search20';
import { getSyncStatus } from '../logic/sync20';
import { buildDashboardWeatherCard, buildMissingLocationWeather, getApiaryCoordinates, selectApiaryForWeather } from '../logic/weatherAccuracy21';
import { getCurrentNectarFlow } from '../logic/nectarAccuracy21';
import { buildDashboardApiaries21 } from '../logic/apiaryLocation21';
import { HiveCardImage, WeatherIllustration, NectarIllustration } from '../components/bgapiary/CleanAssets';

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

const appVersion = 'BG Apiary v2.0';

export function DashboardPage({ state, onOpenHive, onGoApiaries, onCompleteTask, onOpenTask, onGoCalendar, onOpenWeather, onOpenNectar }: DashboardPageProps) {
  const [query, setQuery] = useState('');

  const urgentTasks = getUrgentTasks(state.tasks).slice(0, 3);
  const alerts = buildAlertCenter(state).slice(0, 3);
  const reminders = buildReminderSummary(state.tasks);
  const notifications = buildNotificationCenter(state).slice(0, 2);
  const dailyPriority = buildDailyPriority(state);
  const recommendations = buildRecommendations20(state).slice(0, 2);
  const predictions = buildPredictions20(state).slice(0, 2);
  const ranking = buildColonyRanking(state);
  const syncStatus = getSyncStatus(state);
  const searchResults = useMemo(() => globalSearch20(state, query).slice(0, 5), [state, query]);
  const apiaryCards = buildDashboardApiaries21(state).slice(0, 4);
  const weatherApiary = selectApiaryForWeather(state);
  const weatherCoords = getApiaryCoordinates(weatherApiary ?? undefined);
  const accurateWeather = weatherCoords && weatherApiary
    ? {
        ...buildMissingLocationWeather(weatherApiary),
        source: 'offline-cache' as const,
        latitude: weatherCoords.latitude,
        longitude: weatherCoords.longitude,
        temperatureC: 0,
        windKmh: 0,
        precipitationMm: 0,
        recommendation: 'Dane pogodowe zostaną pobrane z Open-Meteo',
        message: 'Dane pogodowe z Open-Meteo'
      }
    : buildMissingLocationWeather(weatherApiary);
  const weatherCard = buildDashboardWeatherCard(accurateWeather);
  const nectar = getCurrentNectarFlow(state, weatherApiary, accurateWeather);
  const todayWorkCount = reminders.todayCount || urgentTasks.length;
  const strongFamilies = state.hives.filter(hive => hive.strength >= 8).length;
  const hivesToCheck = state.hives.filter(hive => hive.strength <= 5 || hive.foodLevel === 'niski').length;
  const strongest = ranking[0] ? state.hives.find(hive => hive.id === ranking[0].hiveId) : undefined;

  const stats = [
    { label: 'Liczba uli', value: state.hives.length, helper: 'Wszystkie rodziny', icon: 'hives' as const, tone: 'gold' },
    { label: 'Silne rodziny', value: strongFamilies, helper: `${state.hives.length ? Math.round((strongFamilies / state.hives.length) * 100) : 0}% pasieki`, icon: 'statistics' as const, tone: 'green' },
    { label: 'Prace dzisiaj', value: todayWorkCount, helper: 'Plan dnia', icon: 'tasks' as const, tone: 'blue' },
    { label: 'Do kontroli', value: hivesToCheck, helper: 'Pokarm / siła', icon: 'alerts' as const, tone: hivesToCheck ? 'orange' : 'green' }
  ];

  return (
    <main className="dashboard-v20">
      <section className="dashboard-hero-v20">
        <div className="dashboard-hero-copy-v20">
          <div className="hero-brand-row-v20">
            <BrandLogo variant="mark" />
            <div>
              <span>{appVersion}</span>
              <strong>Smart Beekeeping Management</strong>
            </div>
          </div>
          <h1>Profesjonalny pulpit Twojej pasieki</h1>
          <p>Ule, matki, przeglądy, zadania, pogoda i decyzje pszczelarskie w jednym, spójnym systemie premium.</p>
          <div className="hero-actions-v20">
            <button onClick={onGoApiaries}><ModuleIcon name="gps" /> Pasieki</button>
            <button onClick={onGoCalendar}><ModuleIcon name="calendar" /> Plan dnia</button>
            <button onClick={onOpenWeather}><ModuleIcon name="weather" /> Pogoda</button>
          </div>
        </div>
        <button className="weather-orb-v20" onClick={onOpenWeather}>
          <WeatherIllustration type="sun" />
          <span>{weatherCard.subtitle}</span>
          <strong>{weatherCard.title}</strong>
          <small>{weatherCard.recommendation}</small>
        </button>
      </section>

      <section className="stat-grid-v20" aria-label="Szybkie statystyki">
        {stats.map(stat => (
          <article className={`stat-card-v20 tone-${stat.tone}`} key={stat.label}>
            <span><ModuleIcon name={stat.icon} /></span>
            <div>
              <small>{stat.label}</small>
              <strong>{stat.value}</strong>
              <p>{stat.helper}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="search-panel-v20">
        <label>
          <ModuleIcon name="dashboard" />
          <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Szukaj ula, pasieki, zadania, notatki..." />
        </label>
        {query.trim() && (
          <div className="search-results-v20">
            {searchResults.length === 0 ? <button onClick={onGoApiaries}>Brak wyników. Dodaj pierwszy ul.</button> : searchResults.map(result => (
              <button key={`${result.type}-${result.id}`} onClick={() => result.type === 'ul' ? onOpenHive(result.id) : undefined}>
                <strong>{result.title}</strong>
                <span>{result.type} · {result.subtitle}</span>
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="dashboard-grid-v20">
        <article className="panel-v20 priority-panel-v20">
          <header>
            <span>2.0.1</span>
            <h2>Rekomendacja dnia</h2>
          </header>
          <strong>{dailyPriority?.title ?? 'Sprawdź plan dnia'}</strong>
          <p>{dailyPriority?.message ?? 'Brak pilnego alarmu. Skup się na najbliższych pracach i rodzinach do obserwacji.'}</p>
          <div className="panel-badges-v20">
            <b>{alerts.length ? 'Wymaga uwagi' : 'Spokojnie'}</b>
            <small>{notifications.length || alerts.length} powiadomień</small>
          </div>
        </article>

        <article className="panel-v20 nectar-panel-v20">
          <header>
            <span>2.0.2</span>
            <h2>Pożytek i pogoda</h2>
          </header>
          <div className="nectar-row-v20">
            <NectarIllustration name={nectar.name} />
            <div>
              <strong>{nectar.name}</strong>
              <p>{nectar.recommendation}</p>
              <button onClick={onOpenNectar}>Otwórz pożytki</button>
            </div>
          </div>
        </article>

        <article className="panel-v20 quick-actions-v20">
          <header>
            <span>2.0.3</span>
            <h2>Szybkie akcje</h2>
          </header>
          <div>
            <button onClick={onGoApiaries}><ModuleIcon name="hives" /> Dodaj / otwórz ul</button>
            <button onClick={onGoCalendar}><ModuleIcon name="inspections" /> Przegląd</button>
            <button onClick={onGoCalendar}><ModuleIcon name="tasks" /> Zadanie</button>
            <button onClick={onOpenWeather}><ModuleIcon name="weather" /> Pogoda</button>
          </div>
        </article>
      </section>

      <section className="content-columns-v20">
        <article className="panel-v20 apiaries-panel-v20">
          <header>
            <span>2.0.4</span>
            <h2>Pasieki</h2>
            <button onClick={onGoApiaries}>Wszystkie ›</button>
          </header>
          <div className="apiary-list-v20">
            {apiaryCards.length === 0 ? (
              <button className="empty-card-v20" onClick={onGoApiaries}>Dodaj pierwszą pasiekę</button>
            ) : apiaryCards.map(apiary => (
              <button key={apiary.id} onClick={onGoApiaries}>
                <img src="/brand/placeholders/apiary.svg" alt="" />
                <div>
                  <strong>{apiary.name}</strong>
                  <span>{apiary.location}</span>
                  <p>{apiary.hiveCount} rodzin · {apiary.taskCount} prac · {apiary.alertCount ? `${apiary.alertCount} alert` : 'OK'}</p>
                </div>
              </button>
            ))}
          </div>
        </article>

        <article className="panel-v20 hives-panel-v20">
          <header>
            <span>2.0.5</span>
            <h2>Najlepsze ule</h2>
          </header>
          <div className="hive-strip-v20">
            {ranking.slice(0, 3).map(item => {
              const hive = state.hives.find(value => value.id === item.hiveId);
              if (!hive) return null;
              return (
                <button key={hive.id} onClick={() => onOpenHive(hive.id)}>
                  <HiveCardImage hive={hive} />
                  <strong>{hive.name}</strong>
                  <span>Siła {hive.strength}/10</span>
                </button>
              );
            })}
            {ranking.length === 0 && <button className="empty-card-v20" onClick={onGoApiaries}>Dodaj ule do rankingu</button>}
          </div>
        </article>
      </section>

      <section className="content-columns-v20 bottom-v20">
        <article className="panel-v20 tasks-panel-v20">
          <header>
            <span>2.0.6</span>
            <h2>Najbliższe prace</h2>
            <button onClick={onGoCalendar}>Kalendarz ›</button>
          </header>
          <div className="tasks-list-v20">
            {urgentTasks.length === 0 ? (
              <button className="empty-card-v20" onClick={onGoCalendar}>Dodaj zadanie</button>
            ) : urgentTasks.map(task => (
              <TaskCard key={task.id} task={task} hive={state.hives.find(hive => hive.id === task.hiveId)} onOpenHive={() => onOpenTask(task.id)} onComplete={() => onCompleteTask(task.id)} />
            ))}
          </div>
        </article>

        <article className="panel-v20 assistant-panel-v20">
          <header>
            <span>2.0.7</span>
            <h2>Asystent i jakość</h2>
          </header>
          <strong>{strongest ? `Najlepszy ul: ${strongest.name}` : 'Asystent gotowy'}</strong>
          <p>{recommendations[0]?.message ?? 'Nie ma pilnych zaleceń. Przejrzyj najbliższe prace i obserwowane ule.'}</p>
          <div className="quality-grid-v20">
            <span><b>{recommendations.length}</b><small>zalecenia</small></span>
            <span><b>{predictions.length}</b><small>prognozy</small></span>
            <span><b>{syncStatus === 'synced' ? 'OK' : syncStatus}</b><small>sync</small></span>
          </div>
        </article>
      </section>
    </main>
  );
}
