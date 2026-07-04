import type { ApiaryState } from '../models/apiary';
import type { Recommendation } from '../logic/assistant';
import { analyzeApiary, analyzeHive } from '../logic/assistant';
import { buildSeasonSummary } from '../logic/seasonSummary';
import { getDailyWorkStats, getTodayTasks } from '../logic/workTour';
import { buildQueenReplacementReport } from '../logic/queenReports';
import { buildHoneyWarehouse, buildSalesReport, honeyTypeLabel } from '../logic/honey';
import { buildHealthAlerts, buildHealthReport } from '../logic/health';
import { buildSeasonReport19, getCurrentSeasonPlan, getScenarioRecommendations } from '../logic/seasonPlanner';
import { buildColonyRanking, buildDailyPriority, buildPredictions20, buildRecommendations20 } from '../logic/assistant20';
import { buildApiaryReports14, buildQueenReplacementNeedsReport, buildSeasonReport, buildWeakFamiliesReport } from '../logic/advancedReports';
import { Section } from '../components/Section';
import { StatCard } from '../components/StatCard';

interface AssistantPageProps {
  state: ApiaryState;
  onOpenHive: (hiveId: string) => void;
  onRunRecommendation: (recommendation: Recommendation) => void;
  onCreateTaskFromRecommendation: (recommendation: Recommendation) => void;
}

function riskLabel(level: string): string {
  return {
    low: 'Niskie',
    medium: 'Średnie',
    high: 'Wysokie',
    critical: 'Krytyczne'
  }[level] ?? level;
}

function healthLabel(health: string): string {
  return {
    stable: 'Pasieka stabilna',
    watch: 'Pasieka wymaga uwagi',
    risk: 'Pasieka w ryzyku'
  }[health] ?? health;
}

function healthTone(health: string): string {
  return {
    stable: 'ok',
    watch: 'attention',
    risk: 'urgent'
  }[health] ?? 'attention';
}

function priorityLabel(priority: string): string {
  return {
    urgent: 'Pilne',
    high: 'Wysoki',
    medium: 'Średni',
    low: 'Niski'
  }[priority] ?? priority;
}

function recommendationIcon(action: string): string {
  return {
    inspection: '🔍',
    feeding: '🍯',
    note: '📝',
    open_hive: '🐝',
    create_task: '✅'
  }[action] ?? '💡';
}

export function AssistantPage({ state, onOpenHive, onRunRecommendation, onCreateTaskFromRecommendation }: AssistantPageProps) {
  const summary = analyzeApiary(state);
  const analyses = state.hives.map(hive => analyzeHive(state, hive)).sort((a, b) => b.risk.score - a.risk.score);
  const season = buildSeasonSummary(state, new Date().getFullYear());
  const workStats = getDailyWorkStats(state);
  const todayTasks = getTodayTasks(state.tasks);
  const queenReport = buildQueenReplacementReport(state);
  const honeyWarehouse = buildHoneyWarehouse(state);
  const honeySales = buildSalesReport(state);
  const healthReport = buildHealthReport(state);
  const healthAlerts = buildHealthAlerts(state);
  const seasonPlan = getCurrentSeasonPlan(state);
  const seasonPlanReport = seasonPlan ? buildSeasonReport19(seasonPlan) : undefined;
  const seasonRecommendations = seasonPlan ? getScenarioRecommendations(seasonPlan) : [];
  const recommendations20 = buildRecommendations20(state);
  const predictions20 = buildPredictions20(state);
  const ranking20 = buildColonyRanking(state);
  const dailyPriority20 = buildDailyPriority(state);
  const seasonReport = buildSeasonReport(state);
  const apiaryReports = buildApiaryReports14(state);
  const weakFamilies = buildWeakFamiliesReport(state);
  const queenNeeds = buildQueenReplacementNeedsReport(state);
  const weakestApiary = [...apiaryReports].sort((a, b) => b.alerts - a.alerts || b.overdueTasks - a.overdueTasks)[0];

  return (
    <>
      <section className={`assistant-hero assistant-health-${healthTone(summary.health)}`}>
        <div>
          <span>Asystent 1.0</span>
          <h1>{healthLabel(summary.health)}</h1>
          <p>Analiza historii, matek, pokarmu, przeglądów, zadań i ryzyka rodzin. Bez magii, same dane, czyli rzadki przypadek uczciwości.</p>
        </div>
        <div className="assistant-health-badge">
          <strong>{summary.highRiskCount}</strong>
          <small>ule ryzyka</small>
        </div>
      </section>

      <div className="assistant-summary-grid">
        <StatCard label="Wysokie ryzyko" value={summary.highRiskCount} />
        <StatCard label="Otwarte zadania" value={summary.openTasks} />
        <StatCard label="Rekomendacje" value={summary.recommendations.length} />
        <StatCard label="Prace dziś" value={todayTasks.length} />
        <StatCard label="Matki" value={queenReport.currentQueens} />
      </div>

      <Section title="Asystent 2.0">
        <div className="card assistant-empty">
          <strong>Priorytet dnia: {dailyPriority20?.title ?? 'brak'}</strong>
          <p>Rekomendacje: {recommendations20.length}. Prognozy: {predictions20.length}. Najlepsza rodzina: {ranking20[0]?.score ?? 0}/100.</p>
        </div>
      </Section>

      <Section title="Sygnały sezonowe 1.9">
        <div className="card assistant-empty">
          <strong>{seasonPlanReport?.progress ?? 0}% realizacji planu</strong>
          <p>Zaległe prace: {seasonPlanReport?.overdue ?? 0}. Najbliższa rekomendacja: {seasonRecommendations[0] ?? 'utwórz plan sezonu'}.</p>
        </div>
      </Section>

      <Section title="Sygnały zdrowotne 1.8">
        <div className="card assistant-empty">
          <strong>{healthReport.alerts} alertów zdrowotnych</strong>
          <p>Wysoka warroza: {healthReport.highVarroa}. Leczone rodziny: {healthReport.treated}. Najpilniejsze: {healthAlerts[0]?.title ?? 'brak'}.</p>
        </div>
      </Section>

      <Section title="Sygnały miodowe 1.7">
        <div className="card assistant-empty">
          <strong>{honeyWarehouse.totalKg} kg miodu w magazynie</strong>
          <p>Sprzedaż: {honeySales.totalValue} zł. Najlepszy typ: {honeyTypeLabel(honeySales.bestType as any)}. Słoiki dostępne: {honeyWarehouse.fullJars}.</p>
        </div>
      </Section>

      <Section title="Sygnały raportowe 1.4">
        <div className="card assistant-empty">
          <strong>{seasonReport.familiesNeedingAction} działań strategicznych</strong>
          <p>Słabe rodziny: {weakFamilies.length}. Matki do wymiany: {queenNeeds.length}. Najwięcej alertów: {weakestApiary?.apiary.name ?? 'brak danych'}.</p>
        </div>
      </Section>

      <Section title="Sygnały z modułu matek">
        <div className="card assistant-empty">
          <strong>{queenReport.acceptanceRate}% statusów OK</strong>
          <p>Aktualne matki: {queenReport.currentQueens}. Historyczne wymiany: {queenReport.replacedQueens}. Średni wiek: {queenReport.averageCurrentAgeMonths} mies.</p>
        </div>
      </Section>

      <Section title="Dzisiejszy plan pracy">
        <div className="card assistant-empty">
          <strong>{workStats.progress}% wykonane</strong>
          <p>{workStats.doneToday} / {workStats.totalToday} prac na dziś. Otwarte zadania: {workStats.openToday}.</p>
        </div>
      </Section>

      <Section title="Najważniejsze rekomendacje">
        {summary.recommendations.length === 0 ? (
          <div className="empty-card assistant-empty">Brak rekomendacji. Albo jest spokojnie, albo aplikacja ma jeszcze za mało danych. W pszczelarstwie oba scenariusze trzeba traktować z umiarkowanym zaufaniem.</div>
        ) : summary.recommendations.slice(0, 6).map(rec => (
          <div className={`card recommendation-card recommendation-card-pro priority-${rec.priority}`} key={rec.id}>
            <div className="recommendation-top">
              <span className="recommendation-icon">{recommendationIcon(rec.action)}</span>
              <div>
                <strong>{rec.title}</strong>
                <p>{rec.reason}</p>
              </div>
              <span className={`recommendation-priority priority-pill-${rec.priority}`}>{priorityLabel(rec.priority)}</span>
            </div>
            <div className="recommendation-meta">
              <span>Termin: {rec.dueDate}</span>
              <span>Akcja: {rec.targetAction}</span>
            </div>
            <div className="recommendation-actions">
              <button className="mini-button" onClick={() => onRunRecommendation(rec)}>Wykonaj</button>
              <button className="mini-button secondary-mini" onClick={() => onCreateTaskFromRecommendation(rec)}>Utwórz zadanie</button>
            </div>
          </div>
        ))}
      </Section>

      <Section title="Ocena rodzin">
        {analyses.map(item => (
          <button className={`card clickable risk-card risk-${item.risk.level}`} key={item.hive.id} onClick={() => onOpenHive(item.hive.id)}>
            <div className="risk-card-content">
              <div className="risk-card-top">
                <strong>{item.hive.name}</strong>
                <span>Ryzyko: {riskLabel(item.risk.level)}</span>
              </div>
              <div className="risk-reasons">
                {item.risk.reasons.map(reason => <span key={reason}>{reason}</span>)}
              </div>
              <div className="analysis-mini-row">
                <span>Rozwój: {item.development.label}</span>
                <span>Matka: {item.queen.label}</span>
              </div>
            </div>
            <span className="arrow">›</span>
          </button>
        ))}
      </Section>

      <Section title={`Podsumowanie sezonu ${season.year}`}>
        <div className="assistant-season-grid">
          <StatCard label="Przeglądy" value={season.inspections} />
          <StatCard label="Karmienia" value={season.feedings} />
          <StatCard label="Pokarm" value={season.totalFood} />
          <StatCard label="Zadania" value={season.completedTasks} />
          <StatCard label="Zdjęcia" value={season.photos} />
        </div>
        <div className="card season-summary-card">
          <div><span>Najsilniejszy ul</span><strong>{season.strongestHive?.name ?? 'brak danych'}</strong></div>
          <div><span>Najbardziej problematyczny</span><strong>{season.mostProblematicHive?.name ?? 'brak danych'}</strong></div>
          <div><span>Najczęściej karmiony</span><strong>{season.mostFedHive?.name ?? 'brak danych'}</strong></div>
          <div><span>Najwięcej mateczników</span><strong>{season.mostQueenCellsHive?.name ?? 'brak danych'}</strong></div>
          <div><span>Najlepsza linia według siły</span><strong>{season.bestQueenLine ?? 'brak danych'}</strong></div>
        </div>
      </Section>

      <Section title="Analiza matek i rozwoju">
        {analyses.map(item => (
          <div className="card queen-analysis-card" key={`queen-${item.hive.id}`}>
            <div className="queen-analysis-head">
              <strong>{item.hive.name}</strong>
              <span>{item.queen.label}</span>
            </div>

            <div className="analysis-block">
              <p>Matka</p>
              <ul>
                {item.queen.details.map(detail => <li key={detail}>{detail}</li>)}
              </ul>
            </div>

            <div className="analysis-block">
              <p>Rozwój: {item.development.label}</p>
              <ul>
                {item.development.details.map(detail => <li key={detail}>{detail}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </Section>
    </>
  );
}
