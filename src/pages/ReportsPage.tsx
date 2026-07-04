import { useMemo, useState } from 'react';
import type { ApiaryState } from '../models/apiary';
import { Section } from '../components/Section';
import { StatCard } from '../components/StatCard';
import { buildApiaryReport, buildGlobalReport, buildHiveReport } from '../logic/reports';
import { getHiveStats, getMostActiveHive } from '../logic/statistics';
import { buildQueenReplacementReport } from '../logic/queenReports';
import { buildHoneyWarehouse, buildSalesReport, honeyTypeLabel } from '../logic/honey';
import { buildHealthReport } from '../logic/health';
import { buildSeasonReport19, getCurrentSeasonPlan } from '../logic/seasonPlanner';
import { buildColonyRanking, buildPredictions20, buildRecommendations20 } from '../logic/assistant20';
import {
  buildApiaryReports14,
  buildFeedingStats14,
  buildInspectionStats14,
  buildQueenReplacementNeedsReport,
  buildReportCharts14,
  buildSeasonReport,
  buildWeakFamiliesReport,
  buildWorkStats14
} from '../logic/advancedReports';

interface ReportsPageProps {
  state: ApiaryState;
}

type ReportTab = 'dashboard' | 'season' | 'apiaries' | 'families' | 'queens' | 'feeding' | 'legacy';

export function ReportsPage({ state }: ReportsPageProps) {
  const [tab, setTab] = useState<ReportTab>('dashboard');
  const [selectedHiveId, setSelectedHiveId] = useState(state.hives[0]?.id ?? '');
  const [selectedApiaryId, setSelectedApiaryId] = useState(state.apiaries[0]?.id ?? '');

  const season = useMemo(() => buildSeasonReport(state), [state]);
  const apiaryReports = useMemo(() => buildApiaryReports14(state), [state]);
  const weakFamilies = useMemo(() => buildWeakFamiliesReport(state), [state]);
  const queenNeeds = useMemo(() => buildQueenReplacementNeedsReport(state), [state]);
  const workStats = useMemo(() => buildWorkStats14(state), [state]);
  const feedingStats = useMemo(() => buildFeedingStats14(state), [state]);
  const inspectionStats = useMemo(() => buildInspectionStats14(state), [state]);
  const queenReport = useMemo(() => buildQueenReplacementReport(state), [state]);
  const honeyWarehouse = useMemo(() => buildHoneyWarehouse(state), [state]);
  const honeySales = useMemo(() => buildSalesReport(state), [state]);
  const healthReport = useMemo(() => buildHealthReport(state), [state]);
  const seasonPlan = useMemo(() => getCurrentSeasonPlan(state), [state]);
  const seasonPlanReport = useMemo(() => seasonPlan ? buildSeasonReport19(seasonPlan) : undefined, [seasonPlan]);
  const ranking20 = useMemo(() => buildColonyRanking(state), [state]);
  const recommendations20 = useMemo(() => buildRecommendations20(state), [state]);
  const predictions20 = useMemo(() => buildPredictions20(state), [state]);
  const charts = useMemo(() => buildReportCharts14(state), [state]);
  const hive = state.hives.find(item => item.id === selectedHiveId);
  const hiveStats = hive ? getHiveStats(state, hive) : undefined;
  const mostActive = getMostActiveHive(state);

  return (
    <>
      <section className="reports-center-hero">
        <div>
          <span>Centrum Raportów 1.4</span>
          <h1>Sezon {season.year}</h1>
          <p>Raporty sezonu, pasiek, rodzin, matek i prac. Dane w końcu robią coś pożytecznego, zamiast leżeć jak nieopisane ramki.</p>
        </div>
        <div className="reports-center-badge">
          <strong>{season.familiesNeedingAction}</strong>
          <small>wymaga działań</small>
        </div>
      </section>

      <div className="report-tabs">
        {([
          ['dashboard', '📊 Panel'],
          ['season', '📅 Sezon'],
          ['apiaries', '🐝 Pasieki'],
          ['families', '🏠 Rodziny'],
          ['queens', '👑 Matki'],
          ['feeding', '🍯 Prace'],
          ['legacy', '📄 Tekstowe']
        ] as Array<[ReportTab, string]>).map(([value, label]) => (
          <button key={value} className={tab === value ? 'active' : ''} onClick={() => setTab(value)}>{label}</button>
        ))}
      </div>

      {tab === 'dashboard' && (
        <>
          <div className="reports-kpi-grid">
            <StatCard label="Pasieki" value={season.apiaries} />
            <StatCard label="Rodziny" value={season.hives} />
            <StatCard label="Matki" value={season.queens} />
            <StatCard label="Miód" value={`${honeyWarehouse.totalKg} kg`} />
            <StatCard label="Przeglądy" value={season.inspections} />
            <StatCard label="Karmienia" value={season.feedings} />
            <StatCard label="Alarmy" value={season.alerts} />
          </div>

          <Section title="Raport AI 2.0">
            <div className="card report-highlight-card">
              <span>Analiza rodzin</span>
              <strong>{recommendations20.length} rekomendacji / {predictions20.length} prognoz</strong>
              <p>Najwyższa ocena rodziny: {ranking20[0]?.score ?? 0}/100. Najniższa: {ranking20[ranking20.length - 1]?.score ?? 0}/100.</p>
            </div>
          </Section>

          <Section title="Raport planu sezonu">
            <div className="card report-highlight-card">
              <span>Realizacja sezonu</span>
              <strong>{seasonPlanReport?.progress ?? 0}% planu</strong>
              <p>Zaplanowano: {seasonPlanReport?.planned ?? 0}. Wykonano: {seasonPlanReport?.done ?? 0}. Zaległe: {seasonPlanReport?.overdue ?? 0}.</p>
            </div>
          </Section>

          <Section title="Raport zdrowia">
            <div className="card report-highlight-card">
              <span>Zdrowie pasieki</span>
              <strong>{healthReport.healthy}/{healthReport.hives} rodzin bez alertów</strong>
              <p>Leczone: {healthReport.treated}. Wysoka warroza: {healthReport.highVarroa}. Średni wynik: {healthReport.averageInfestation}.</p>
            </div>
          </Section>

          <Section title="Raport miodu">
            <div className="card report-highlight-card">
              <span>Magazyn i sprzedaż</span>
              <strong>{honeyWarehouse.totalKg} kg / {honeySales.totalValue} zł</strong>
              <p>Słoiki w magazynie: {honeyWarehouse.fullJars}. Najlepszy typ miodu: {honeyTypeLabel(honeySales.bestType as any)}.</p>
            </div>
          </Section>

          <Section title="Najważniejsze sygnały">
            <div className="report-insight-grid">
              <div className="card report-insight-card urgent">
                <span>Rodziny słabe</span>
                <strong>{weakFamilies.length}</strong>
                <p>Rodziny z niską siłą, pokarmem, brakiem matki lub dawno bez przeglądu.</p>
              </div>
              <div className="card report-insight-card warning">
                <span>Matki do wymiany</span>
                <strong>{queenNeeds.length}</strong>
                <p>Matki stare, nisko ocenione lub oznaczone jako do wymiany.</p>
              </div>
              <div className="card report-insight-card ok">
                <span>Postęp zadań</span>
                <strong>{workStats.completedTasks}/{season.tasks}</strong>
                <p>Wykonane zadania względem wszystkich zarejestrowanych prac.</p>
              </div>
            </div>
          </Section>

          <Section title="Aktywność">
            <div className="report-chart-card">
              {charts.activity.map(item => (
                <div className="report-chart-row" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <div><i style={{ width: `${Math.min(100, item.value * 8)}%` }} /></div>
                </div>
              ))}
            </div>
          </Section>

          {mostActive && (
            <Section title="Najaktywniejszy ul">
              <div className="card report-highlight-card">
                <span>Najwięcej wpisów w historii</span>
                <strong>{mostActive.name}</strong>
                <p>{mostActive.nextAction}</p>
              </div>
            </Section>
          )}
        </>
      )}

      {tab === 'season' && (
        <>
          <Section title="Raport sezonu">
            <div className="season-report-card">
              <h2>Sezon {season.year}</h2>
              <ul>
                <li>Wykonano {season.inspections} przeglądów.</li>
                <li>Wykonano {season.feedings} karmień.</li>
                <li>Wymieniono {season.replacements} matek.</li>
                <li>Otwarte zadania: {season.openTasks}, zaległe: {season.overdueTasks}.</li>
                <li>Średnia siła rodzin: {season.averageStrength}/10.</li>
                <li>Średni wiek matek: {season.averageQueenAgeMonths} mies.</li>
              </ul>
            </div>
          </Section>

          <Section title="Struktura prac">
            <div className="report-chart-card">
              {charts.workByCategory.map(item => (
                <div className="report-chart-row" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <div><i style={{ width: `${Math.min(100, item.value * 10)}%` }} /></div>
                </div>
              ))}
            </div>
          </Section>
        </>
      )}

      {tab === 'apiaries' && (
        <Section title="Raporty pasiek">
          {apiaryReports.map(report => (
            <div className={`card apiary-report-card grade-${report.grade}`} key={report.apiary.id}>
              <div className="apiary-report-head">
                <div>
                  <span>{report.apiary.location}</span>
                  <strong>{report.apiary.name}</strong>
                </div>
                <b>{report.grade}</b>
              </div>
              <div className="apiary-report-grid">
                <span>Ule: {report.hiveCount}</span>
                <span>Siła: {report.averageStrength}/10</span>
                <span>Matki: {report.averageQueenAgeMonths} mies.</span>
                <span>Zadania: {report.openTasks}</span>
                <span>Zaległe: {report.overdueTasks}</span>
                <span>Alarmy: {report.alerts}</span>
                <span>Ostatni przegląd: {report.lastInspectionAt}</span>
                <span>Ostatnie karmienie: {report.lastFeedingAt}</span>
              </div>
            </div>
          ))}
        </Section>
      )}

      {tab === 'families' && (
        <>
          <Section title="Rodziny słabe">
            {weakFamilies.length === 0 ? <div className="empty-card">Brak słabych rodzin w raporcie. Podejrzanie miłe.</div> : weakFamilies.map(item => (
              <div className="card weak-family-card" key={item.hive.id}>
                <strong>{item.apiaryName} · {item.hive.name}</strong>
                <p>Siła: {item.hive.strength}/10 · Pokarm: {item.hive.foodLevel}</p>
                <div className="entry-tags">{item.reasons.map(reason => <span key={reason}>{reason}</span>)}</div>
              </div>
            ))}
          </Section>

          <Section title="Rodziny do wymiany matki">
            {queenNeeds.length === 0 ? <div className="empty-card">Brak rodzin do wymiany matki według raportu.</div> : queenNeeds.map(item => (
              <div className="card queen-need-card" key={item.hive.id}>
                <strong>{item.apiaryName} · {item.hive.name}</strong>
                <p>Matka: {item.hive.queen.breed} {item.hive.queen.line} · wiek {item.queenAgeMonths} mies.</p>
                <div className="entry-tags">{item.reasons.map(reason => <span key={reason}>{reason}</span>)}</div>
              </div>
            ))}
          </Section>
        </>
      )}

      {tab === 'queens' && (
        <Section title="Raport matek">
          <div className="reports-kpi-grid compact">
            <StatCard label="Aktualne" value={queenReport.currentQueens} />
            <StatCard label="Historyczne" value={queenReport.replacedQueens} />
            <StatCard label="Śr. wiek" value={`${queenReport.averageCurrentAgeMonths} mies.`} />
            <StatCard label="Przyjęcia" value={`${queenReport.acceptanceRate}%`} />
          </div>
          <div className="card report-highlight-card">
            <span>Wnioski</span>
            <strong>{queenNeeds.length} rodzin wymaga uwagi matki</strong>
            <p>Raport bierze pod uwagę wiek, status, ocenę, nerwowość i oznaczenie do wymiany.</p>
          </div>
        </Section>
      )}

      {tab === 'feeding' && (
        <>
          <Section title="Statystyki prac">
            <div className="reports-kpi-grid compact">
              <StatCard label="Wykonane" value={workStats.completedTasks} />
              <StatCard label="Otwarte" value={workStats.openTasks} />
              <StatCard label="Zaległe" value={workStats.overdueTasks} />
              <StatCard label="Auto" value={workStats.automaticTasks} />
            </div>
          </Section>

          <Section title="Karmienie i przeglądy">
            <div className="report-insight-grid">
              <div className="card report-insight-card">
                <span>Karmienia</span>
                <strong>{feedingStats.totalFeedings}</strong>
                <p>Łącznie {feedingStats.totalAmount} l/kg, średnio {feedingStats.averagePerHive} na ul. Ostatnie: {feedingStats.lastFeedingAt}.</p>
              </div>
              <div className="card report-insight-card">
                <span>Przeglądy</span>
                <strong>{inspectionStats.totalInspections}</strong>
                <p>Średni odstęp: {inspectionStats.averageGapDays} dni. Ostatni: {inspectionStats.lastInspectionAt}.</p>
              </div>
            </div>
          </Section>
        </>
      )}

      {tab === 'legacy' && (
        <>
          <Section title="Raport ula">
            <div className="form-card report-panel">
              <label>
                Wybierz ul
                <select value={selectedHiveId} onChange={event => setSelectedHiveId(event.target.value)}>
                  {state.hives.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                </select>
              </label>
              {hiveStats && (
                <div className="report-mini-stats">
                  <StatCard label="Śr. siła" value={hiveStats.averageStrength} />
                  <StatCard label="Pokarm" value={hiveStats.totalFood} />
                  <StatCard label="Mateczniki" value={hiveStats.queenCellsTotal} />
                </div>
              )}
              <pre className="report-box report-box-polished">{hive ? buildHiveReport(state, hive) : 'Brak ula'}</pre>
            </div>
          </Section>

          <Section title="Raport pasieki">
            <div className="form-card report-panel">
              <label>
                Wybierz pasiekę
                <select value={selectedApiaryId} onChange={event => setSelectedApiaryId(event.target.value)}>
                  {state.apiaries.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                </select>
              </label>
              <pre className="report-box report-box-polished">{buildApiaryReport(state, selectedApiaryId)}</pre>
            </div>
          </Section>

          <Section title="Raport globalny">
            <pre className="report-box report-box-polished">{buildGlobalReport(state)}</pre>
          </Section>
        </>
      )}
    </>
  );
}
