import { useMemo, useState } from 'react';
import type { ApiaryState } from '../models/apiary';
import { TaskCard } from '../components/TaskCard';
import { buildAlertCenter } from '../logic/alerts';
import { buildReminderSummary } from '../logic/reminders';
import { getUrgentTasks } from '../logic/tasks';
import { buildColonyRanking, buildDailyPriority, buildPredictions20, buildRecommendations20 } from '../logic/assistant20';
import { buildNotificationCenter } from '../logic/rcQuality20';
import { globalSearch20 } from '../logic/search20';
import { getSyncStatus } from '../logic/sync20';
import { bgApiaryHiveTone, bgApiaryStrengthLabel, bgApiaryStrengthPercent } from '../logic/bgApiaryPremium20';
import { buildDashboardWeatherCard, buildMissingLocationWeather, getApiaryCoordinates, selectApiaryForWeather } from '../logic/weatherAccuracy21';
import { getCurrentNectarFlow } from '../logic/nectarAccuracy21';
import { buildDashboardApiaries21 } from '../logic/apiaryLocation21';
import { BgApiaryIcon } from '../components/bgapiary/BgApiaryIcon';
import { HiveCardImage, WeatherIllustration, NectarIllustration } from '../components/bgapiary/CleanAssets';
import { PremiumBadge, PremiumCard, PremiumSection } from '../components/premium/PremiumVisualSystem';

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

export function DashboardPage({ state, onOpenHive, onGoApiaries, onCompleteTask, onOpenTask, onGoCalendar, onOpenWeather, onOpenNectar }: DashboardPageProps) {
  const [query, setQuery] = useState('');
  const [showAllApiaries, setShowAllApiaries] = useState(false);

  const urgentTasks = getUrgentTasks(state.tasks).slice(0, 2);
  const alerts = buildAlertCenter(state).slice(0, 2);
  const reminders = buildReminderSummary(state.tasks);
  const notifications = buildNotificationCenter(state).slice(0, 2);
  const dailyPriority = buildDailyPriority(state);
  const recommendations = buildRecommendations20(state).slice(0, 1);
  const predictions = buildPredictions20(state).slice(0, 2);
  const ranking = buildColonyRanking(state);
  const syncStatus = getSyncStatus(state);
  const searchResults = useMemo(() => globalSearch20(state, query).slice(0, 4), [state, query]);
  const apiaryCards = buildDashboardApiaries21(state);
  const visibleApiaries = showAllApiaries ? apiaryCards : apiaryCards.slice(0, 3);
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
  const strongest = ranking[0] ? state.hives.find(hive => hive.id === ranking[0].hiveId) : undefined;

  return (
    <main className="premium-dashboard21">
      <section className="premium-dashboard21-hero">
        <div className="premium-dashboard21-brand">
          <span className="premium-dashboard21-mark"><BgApiaryIcon name="pozytek" label="BG APIARY" /></span>
          <strong>BG APIARY</strong>
        </div>

        <div className="premium-dashboard21-hero-main">
          <div>
            <span>Dzień dobry,</span>
            <h1>Paweł</h1>
            <p>{state.hives.length} rodzin · {todayWorkCount} zadań dziś</p>
          </div>

          <button className="premium-dashboard21-weather-pill" onClick={onOpenWeather}>
            <WeatherIllustration type="sun" />
            <strong>{weatherCard.title}</strong>
            <small>{weatherCard.subtitle}</small>
          </button>
        </div>

        <button className="premium-dashboard21-today" onClick={onGoCalendar}>
          <span><BgApiaryIcon name="planSezonu" label="Plan" /></span>
          <div>
            <small>Dzisiaj</small>
            <strong>{todayWorkCount || 0} {todayWorkCount === 1 ? 'zadanie' : 'zadania'}</strong>
          </div>
          <b>Plan dnia</b>
        </button>
      </section>

      <section className="premium-dashboard21-search">
        <label>
          <span>Szybkie wyszukiwanie</span>
          <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Ul, pasieka, zadanie..." />
        </label>
        {query.trim() && (
          <div className="premium-dashboard21-search-results">
            {searchResults.length === 0 ? (
              <button onClick={onGoApiaries}>Dodaj pierwszy ul</button>
            ) : searchResults.map(result => (
              <button key={`${result.type}-${result.id}`} onClick={() => result.type === 'ul' ? onOpenHive(result.id) : undefined}>
                <strong>{result.title}</strong>
                <span>{result.type} · {result.subtitle}</span>
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="premium-dashboard21-grid">
        <button className="premium-dashboard21-info-card" onClick={onOpenWeather}>
          <WeatherIllustration type="sun" />
          <div>
            <span>Pogoda</span>
            <strong>{weatherCard.title}</strong>
            <p>{weatherCard.recommendation}</p>
          </div>
        </button>

        <button className="premium-dashboard21-info-card premium-dashboard21-info-card-green" onClick={onOpenNectar}>
          <NectarIllustration name={nectar.name} />
          <div>
            <span>{nectar.label}</span>
            <strong>{nectar.name}</strong>
            <p>{nectar.recommendation}</p>
          </div>
        </button>
      </section>

      <PremiumCard className="premium-dashboard21-priority">
        <div>
          <span>Rekomendacja dnia</span>
          <strong>{dailyPriority?.title ?? 'Sprawdź plan dnia'}</strong>
          <p>{dailyPriority?.message ?? 'Brak pilnego alarmu. Skup się na najbliższych pracach i rodzinach do obserwacji.'}</p>
        </div>
        <PremiumBadge tone={alerts.length ? 'warning' : 'success'}>{alerts.length ? 'Uwaga' : 'Spokojnie'}</PremiumBadge>
      </PremiumCard>

      <PremiumSection
        title="Moje pasieki"
        action={<button className="premium-dashboard21-link" onClick={() => setShowAllApiaries(value => !value)}>{showAllApiaries ? 'Mniej' : 'Wszystkie'} ›</button>}
      >
        <div className="premium-dashboard21-apiaries">
          {visibleApiaries.length === 0 ? (
            <button className="premium-dashboard21-empty" onClick={onGoApiaries}>Dodaj pierwszą pasiekę</button>
          ) : visibleApiaries.map((apiary) => (
            <button className="premium-dashboard21-apiary" key={apiary.id} onClick={onGoApiaries}>
              <div className="premium-dashboard21-apiary-icon">
                <BgApiaryIcon name="pasieki" label="Pasieka" size={34} />
              </div>
              <div className="premium-dashboard21-apiary-copy">
                <strong>{apiary.name}</strong>
                <span>{apiary.location}</span>
                <div className="premium-dashboard21-apiary-row">
                  <small>{apiary.hiveCount} rodzin</small>
                  <small>{apiary.weatherCard.title}</small>
                  <small>{apiary.nectar.name}</small>
                </div>
                <p>{apiary.hasLocation ? apiary.weatherCard.sourceLabel : 'Brak lokalizacji pasieki'}</p>
              </div>
              <div className="premium-dashboard21-apiary-side">
                <b>{apiary.taskCount}</b>
                <small>prac</small>
                {apiary.alertCount > 0 ? <i>{apiary.alertCount} alert</i> : <i>OK</i>}
              </div>
            </button>
          ))}
        </div>
      </PremiumSection>

      <PremiumSection title="Najbliższe prace">
        <div className="premium-dashboard21-work">
          {urgentTasks.length === 0 ? (
            <button className="premium-dashboard21-empty" onClick={onGoCalendar}>Dodaj zadanie</button>
          ) : urgentTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              hive={state.hives.find(hive => hive.id === task.hiveId)}
              onOpenHive={() => onOpenTask(task.id)}
              onComplete={() => onCompleteTask(task.id)}
            />
          ))}
        </div>
      </PremiumSection>

      <section className="premium-dashboard21-bottom-grid">
        <PremiumCard compact>
          <span>Alerty</span>
          <strong>{notifications.length || alerts.length}</strong>
        </PremiumCard>
        <PremiumCard compact>
          <span>Asystent</span>
          <strong>{recommendations.length}</strong>
        </PremiumCard>
        <PremiumCard compact>
          <span>Prognozy</span>
          <strong>{predictions.length}</strong>
        </PremiumCard>
        <PremiumCard compact>
          <span>Sync</span>
          <strong>{syncStatus === 'synced' ? 'OK' : syncStatus}</strong>
        </PremiumCard>
      </section>

      <PremiumSection title="Asystent">
        <PremiumCard className="premium-dashboard21-assistant">
          <strong>{strongest ? `Najlepszy ul: ${strongest.name}` : 'Asystent gotowy'}</strong>
          <p>{recommendations[0]?.message ?? 'Nie ma pilnych zaleceń. Przejrzyj najbliższe prace i obserwowane ule.'}</p>
        </PremiumCard>
      </PremiumSection>
    </main>
  );
}
