import { useState } from 'react';
import type { ApiaryState, SeasonScenario, SeasonTemplateType } from '../models/apiary';
import { Section } from '../components/Section';
import { StatCard } from '../components/StatCard';
import {
  SEASON_SCENARIOS,
  SEASON_TEMPLATES,
  addNectarFlow,
  buildSeasonReminders,
  buildSeasonReport19,
  calculateSeasonProgress,
  createSeasonPlan,
  getScenarioRecommendations,
  markSeasonItemDone,
  seasonPlanItemsToTasks,
  updateSeasonGoal
} from '../logic/seasonPlanner';

interface SeasonPlanPageProps {
  state: ApiaryState;
  onBack: () => void;
  onStateChange: (state: ApiaryState) => void;
}

type SeasonTab = 'harmonogram' | 'cele' | 'pozytki' | 'raport' | 'scenariusz';

const monthNames = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

export function SeasonPlanPage({ state, onBack, onStateChange }: SeasonPlanPageProps) {
  const [tab, setTab] = useState<SeasonTab>('harmonogram');
  const [year, setYear] = useState(new Date().getFullYear());
  const [templateType, setTemplateType] = useState<SeasonTemplateType>('amatorska');
  const [scenario, setScenario] = useState<SeasonScenario>('produkcja_miodu');
  const plan = (state.seasonPlans ?? []).find(item => item.year === year) ?? (state.seasonPlans ?? [])[0];
  const report = plan ? buildSeasonReport19(plan) : undefined;
  const progress = plan ? calculateSeasonProgress(plan) : 0;
  const reminders = plan ? buildSeasonReminders(plan) : [];

  function createPlan() {
    const next = createSeasonPlan(year, templateType, scenario);
    onStateChange({
      ...state,
      seasonPlans: [next, ...(state.seasonPlans ?? []).filter(item => item.year !== year)]
    });
  }

  function generateTasks() {
    if (!plan) return;
    const tasks = seasonPlanItemsToTasks(plan, state.apiaries[0]?.id);
    const existingIds = new Set(state.tasks.map(task => task.id));
    onStateChange({
      ...state,
      tasks: [...state.tasks, ...tasks.filter(task => !existingIds.has(task.id))]
    });
  }

  function completeItem(itemId: string) {
    if (!plan) return;
    const updated = markSeasonItemDone(plan, itemId);
    onStateChange({ ...state, seasonPlans: (state.seasonPlans ?? []).map(item => item.id === plan.id ? updated : item) });
  }

  function updateGoal(goalId: string, current: number) {
    if (!plan) return;
    const updated = updateSeasonGoal(plan, goalId, current);
    onStateChange({ ...state, seasonPlans: (state.seasonPlans ?? []).map(item => item.id === plan.id ? updated : item) });
  }

  function addFlow(form: HTMLFormElement) {
    if (!plan) return;
    const data = new FormData(form);
    const updated = addNectarFlow(plan, {
      apiaryId: String(data.get('apiaryId') ?? ''),
      name: String(data.get('name') ?? ''),
      startDate: String(data.get('startDate') ?? ''),
      endDate: String(data.get('endDate') ?? ''),
      expectedStrength: data.get('expectedStrength') as 'slaby' | 'sredni' | 'mocny',
      notes: String(data.get('notes') ?? '')
    });
    onStateChange({ ...state, seasonPlans: (state.seasonPlans ?? []).map(item => item.id === plan.id ? updated : item) });
    form.reset();
  }

  return (
    <>
      <button className="back-button" onClick={onBack}>‹ Więcej</button>

      <section className="season-hero">
        <div>
          <span>Planowanie 1.9</span>
          <h1>Plan Sezonu {plan?.year ?? year}</h1>
          <p>Harmonogram, cele, pożytki, checklisty i raport realizacji. Czyli próba ujarzmienia sezonu, który i tak będzie miał własne zdanie.</p>
        </div>
        <div className="season-badge">
          <strong>{progress}%</strong>
          <small>postęp</small>
        </div>
      </section>

      {!plan && (
        <Section title="Utwórz plan sezonu">
          <div className="form-card">
            <label>Rok<input type="number" value={year} onChange={event => setYear(Number(event.target.value))} /></label>
            <label>Szablon<select value={templateType} onChange={event => setTemplateType(event.target.value as SeasonTemplateType)}>{SEASON_TEMPLATES.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
            <label>Scenariusz<select value={scenario} onChange={event => setScenario(event.target.value as SeasonScenario)}>{SEASON_SCENARIOS.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
            <button className="primary full" onClick={createPlan}>Utwórz plan sezonu</button>
          </div>
        </Section>
      )}

      {plan && (
        <>
          <div className="reports-kpi-grid compact">
            <StatCard label="Zaplanowano" value={report?.planned ?? 0} />
            <StatCard label="Wykonano" value={report?.done ?? 0} />
            <StatCard label="Zaległe" value={report?.overdue ?? 0} />
            <StatCard label="Przypomnienia" value={reminders.length} />
          </div>

          <div className="season-progress-wrap">
            <div className="season-progress-bar"><span style={{ width: `${progress}%` }} /></div>
            <strong>{progress}% realizacji sezonu</strong>
          </div>

          <div className="report-tabs season-tabs">
            {([
              ['harmonogram', '📆 Harmonogram'],
              ['cele', '🎯 Cele'],
              ['pozytki', '🌼 Pożytki'],
              ['raport', '📈 Raport'],
              ['scenariusz', '🧭 Scenariusz']
            ] as Array<[SeasonTab, string]>).map(([value, label]) => (
              <button key={value} className={tab === value ? 'active' : ''} onClick={() => setTab(value)}>{label}</button>
            ))}
          </div>

          {tab === 'harmonogram' && (
            <>
              <Section title="Automatyczne zadania sezonowe">
                <button className="wide-action" onClick={generateTasks}>Dodaj zadania sezonowe do Centrum Prac</button>
              </Section>

              {monthNames.map((name, index) => {
                const items = plan.items.filter(item => item.month === index + 1);
                if (items.length === 0) return null;
                return (
                  <Section title={`${name}: ${items.length} prac`} key={name}>
                    {items.map(item => (
                      <div className={`card season-item-card status-${item.status}`} key={item.id}>
                        <div className="season-item-head">
                          <strong>{item.title}</strong>
                          <span>{item.status}</span>
                        </div>
                        <p>{item.description} · termin: {item.dueDate}</p>
                        {item.weatherWindow && <small>Okno pogodowe: min. {item.weatherWindow.minTempC}°C, bez deszczu: {item.weatherWindow.noRain ? 'tak' : 'nie'}, wiatr do {item.weatherWindow.maxWindKmh} km/h</small>}
                        <div className="entry-tags">{item.checklist.map(check => <span key={check.id}>{check.done ? '✓' : '☐'} {check.label}</span>)}</div>
                        <button className="wide-action" onClick={() => completeItem(item.id)}>Oznacz etap jako wykonany</button>
                      </div>
                    ))}
                  </Section>
                );
              })}
            </>
          )}

          {tab === 'cele' && (
            <Section title="Cele pasieki">
              {plan.goals.map(goal => {
                const percent = goal.planned === 0 ? 0 : Math.round((goal.current / goal.planned) * 1000) / 10;
                return (
                  <div className="card season-goal-card" key={goal.id}>
                    <strong>{goal.title}</strong>
                    <p>{goal.current}/{goal.planned} {goal.unit} · {percent}%</p>
                    <input type="number" value={goal.current} onChange={event => updateGoal(goal.id, Number(event.target.value))} />
                  </div>
                );
              })}
            </Section>
          )}

          {tab === 'pozytki' && (
            <>
              <Section title="Dodaj pożytek">
                <form className="form-card" onSubmit={event => { event.preventDefault(); addFlow(event.currentTarget); }}>
                  <label>Pasieka<select name="apiaryId">{state.apiaries.map(apiary => <option key={apiary.id} value={apiary.id}>{apiary.name}</option>)}</select></label>
                  <label>Nazwa pożytku<input name="name" placeholder="rzepak, akacja, lipa..." /></label>
                  <div className="two-cols">
                    <label>Od<input type="date" name="startDate" /></label>
                    <label>Do<input type="date" name="endDate" /></label>
                  </div>
                  <label>Siła<select name="expectedStrength"><option value="slaby">Słaby</option><option value="sredni">Średni</option><option value="mocny">Mocny</option></select></label>
                  <label>Uwagi<input name="notes" /></label>
                  <button className="primary full">Dodaj pożytek</button>
                </form>
              </Section>

              <Section title="Kalendarz pożytków">
                {plan.nectarFlows.length === 0 ? <div className="empty-card">Brak pożytków w planie.</div> : plan.nectarFlows.map(flow => (
                  <div className="card nectar-card" key={flow.id}>
                    <strong>{flow.name}</strong>
                    <p>{flow.startDate} – {flow.endDate} · siła: {flow.expectedStrength}</p>
                  </div>
                ))}
              </Section>
            </>
          )}

          {tab === 'raport' && (
            <Section title="Raport realizacji planu">
              <div className="reports-kpi-grid compact">
                <StatCard label="Zaplanowano" value={report?.planned ?? 0} />
                <StatCard label="Wykonano" value={report?.done ?? 0} />
                <StatCard label="Zaległe" value={report?.overdue ?? 0} />
                <StatCard label="Anulowane" value={report?.cancelled ?? 0} />
              </div>
              <div className="card season-report-card">
                <strong>Porównanie z poprzednimi sezonami</strong>
                <p>{plan.previousSeasons.length === 0 ? 'Brak poprzednich sezonów do porównania.' : `Zapisane sezony porównawcze: ${plan.previousSeasons.length}`}</p>
              </div>
            </Section>
          )}

          {tab === 'scenariusz' && (
            <Section title="Scenariusz prowadzenia pasieki">
              <div className="card season-scenario-card">
                <strong>{SEASON_SCENARIOS.find(item => item.value === plan.scenario)?.label}</strong>
                <p>Priorytety: {SEASON_SCENARIOS.find(item => item.value === plan.scenario)?.priorityBoost}</p>
                <ul>{getScenarioRecommendations(plan).map(item => <li key={item}>{item}</li>)}</ul>
              </div>
            </Section>
          )}
        </>
      )}
    </>
  );
}
