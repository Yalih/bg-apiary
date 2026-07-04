import type {
  ApiaryState,
  NectarFlow,
  SeasonComparison,
  SeasonGoal,
  SeasonPlan,
  SeasonPlanItem,
  SeasonScenario,
  SeasonTemplateType,
  Task
} from '../models/apiary';

export const SEASON_TEMPLATES: Array<{ value: SeasonTemplateType; label: string; description: string }> = [
  { value: 'amatorska', label: 'Pasieka amatorska', description: 'Spokojne prowadzenie kilku lub kilkunastu rodzin.' },
  { value: 'towarowa', label: 'Pasieka towarowa', description: 'Więcej produkcji, sprzedaży i kontroli terminów.' },
  { value: 'produkcja_matek', label: 'Produkcja matek', description: 'Priorytet mateczników, rodzin ojcowskich i kontroli.' },
  { value: 'odklady', label: 'Odkłady', description: 'Rozwój pasieki i tworzenie nowych rodzin.' },
  { value: 'wedrowna', label: 'Gospodarka wędrowna', description: 'Przenoszenie uli między pożytkami.' },
  { value: 'wlasny', label: 'Własny szablon', description: 'Plan startowy do własnej edycji.' }
];

export const SEASON_SCENARIOS: Array<{ value: SeasonScenario; label: string; priorityBoost: string }> = [
  { value: 'produkcja_miodu', label: 'Produkcja miodu', priorityBoost: 'miodobrania i siła rodzin' },
  { value: 'rozwoj_rodzin', label: 'Rozwój rodzin', priorityBoost: 'poszerzanie i karmienie' },
  { value: 'odklady', label: 'Odkłady', priorityBoost: 'tworzenie nowych rodzin' },
  { value: 'hodowla_matek', label: 'Hodowla matek', priorityBoost: 'matki i kontrole przyjęcia' }
];

function dateFor(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function item(year: number, month: number, title: string, category: Task['type'], scenario?: SeasonScenario): SeasonPlanItem {
  const priority = scenario === 'produkcja_miodu' && (category === 'inspection' || category === 'harvest') ? 'high' : category === 'treatment' ? 'high' : 'medium';
  return {
    id: `season-item-${year}-${month}-${title.toLowerCase().replace(/[^a-z0-9ąćęłńóśźż]+/gi, '-')}`,
    month,
    title,
    description: `Praca sezonowa: ${title}`,
    category,
    priority,
    status: 'planowane',
    dueDate: dateFor(year, month, 15),
    reminderOffsets: [30, 14, 7, 1, 0],
    scenario,
    weatherWindow: category === 'inspection' || category === 'harvest' ? { minTempC: 14, noRain: true, maxWindKmh: 25, note: 'Najlepiej bez deszczu i silnego wiatru.' } : undefined,
    checklist: [
      { id: `check-${month}-1`, label: 'Sprawdź termin', done: false },
      { id: `check-${month}-2`, label: 'Przygotuj sprzęt', done: false },
      { id: `check-${month}-3`, label: 'Zapisz wynik pracy', done: false }
    ]
  };
}

export function buildSeasonTemplateItems(year: number, templateType: SeasonTemplateType, scenario: SeasonScenario): SeasonPlanItem[] {
  const base: SeasonPlanItem[] = [
    item(year, 1, 'Kontrola osypu zimowego', 'inspection', scenario),
    item(year, 2, 'Przegląd zapasów i sprzętu', 'note', scenario),
    item(year, 3, 'Pierwszy przegląd wiosenny', 'inspection', scenario),
    item(year, 4, 'Poszerzanie gniazd', 'inspection', scenario),
    item(year, 5, 'Kontrola nastroju rojowego', 'inspection', scenario),
    item(year, 6, 'Miodobranie wczesne', 'harvest', scenario),
    item(year, 7, 'Ocena matek i rodzin', 'queen', scenario),
    item(year, 8, 'Leczenie po miodobraniu', 'treatment', scenario),
    item(year, 9, 'Karmienie zimowe', 'feeding', scenario),
    item(year, 10, 'Kontrola zapasów zimowych', 'inspection', scenario),
    item(year, 11, 'Porządkowanie magazynu', 'note', scenario),
    item(year, 12, 'Podsumowanie sezonu', 'note', scenario)
  ];

  if (templateType === 'towarowa') base.push(item(year, 6, 'Plan sprzedaży miodu', 'note', scenario));
  if (templateType === 'produkcja_matek') base.push(item(year, 5, 'Przygotowanie rodzin wychowujących', 'queen', 'hodowla_matek'));
  if (templateType === 'odklady') base.push(item(year, 5, 'Tworzenie odkładów', 'inspection', 'odklady'));
  if (templateType === 'wedrowna') base.push(item(year, 5, 'Przygotowanie uli do przewozu', 'note', scenario));
  return base;
}

export function createSeasonPlan(year: number, templateType: SeasonTemplateType, scenario: SeasonScenario): SeasonPlan {
  return {
    id: `season-plan-${year}-${Date.now()}`,
    year,
    templateType,
    scenario,
    createdAt: new Date().toISOString(),
    items: buildSeasonTemplateItems(year, templateType, scenario),
    goals: [
      { id: `goal-families-${year}`, type: 'rodziny', title: 'Liczba rodzin', planned: 10, current: 0, unit: 'rodzin' },
      { id: `goal-honey-${year}`, type: 'miod_kg', title: 'Produkcja miodu', planned: 100, current: 0, unit: 'kg' },
      { id: `goal-sales-${year}`, type: 'sprzedaz', title: 'Sprzedaż', planned: 3000, current: 0, unit: 'zł' }
    ],
    nectarFlows: [],
    previousSeasons: []
  };
}

export function calculateSeasonProgress(plan: SeasonPlan): number {
  if (!plan.items.length) return 0;
  const done = plan.items.filter(item => item.status === 'wykonane').length;
  const checklistDone = plan.items.flatMap(item => item.checklist).filter(item => item.done).length;
  const checklistAll = plan.items.flatMap(item => item.checklist).length || 1;
  const itemScore = done / plan.items.length;
  const checklistScore = checklistDone / checklistAll;
  return Math.round(((itemScore * 0.7 + checklistScore * 0.3) * 100) * 10) / 10;
}

export function buildSeasonReport19(plan: SeasonPlan) {
  return {
    planned: plan.items.length,
    done: plan.items.filter(item => item.status === 'wykonane').length,
    overdue: plan.items.filter(item => item.status === 'zalegle').length,
    cancelled: plan.items.filter(item => item.status === 'anulowane').length,
    progress: calculateSeasonProgress(plan),
    goalsProgress: plan.goals.map(goal => ({ ...goal, percent: goal.planned === 0 ? 0 : Math.round((goal.current / goal.planned) * 1000) / 10 }))
  };
}

export function seasonPlanItemsToTasks(plan: SeasonPlan, apiaryId?: string): Task[] {
  return plan.items.map(item => ({
    id: `season-task-${item.id}`,
    hiveId: item.hiveId ?? '',
    apiaryId: item.apiaryId ?? apiaryId ?? '',
    title: item.title,
    dueDate: item.dueDate,
    priority: item.priority,
    status: item.status === 'wykonane' ? 'done' : 'open',
    type: item.category,
    workCategory: item.category,
    description: item.description,
    createdAt: plan.createdAt,
    targetAction: item.category === 'feeding' ? 'feeding' : item.category === 'queen' ? 'queen_replacement' : item.category === 'inspection' ? 'inspection' : 'note',
    source: 'automatic'
  }));
}

export function buildSeasonReminders(plan: SeasonPlan) {
  return plan.items.flatMap(item => item.reminderOffsets.map(offset => ({
    id: `reminder-${item.id}-${offset}`,
    itemId: item.id,
    title: item.title,
    dueDate: item.dueDate,
    offsetDays: offset,
    label: offset === 0 ? 'dzisiaj' : offset === 1 ? 'jutro' : `za ${offset} dni`
  })));
}

export function addNectarFlow(plan: SeasonPlan, flow: Omit<NectarFlow, 'id'>): SeasonPlan {
  return {
    ...plan,
    nectarFlows: [{ id: `nectar-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, ...flow }, ...plan.nectarFlows]
  };
}

export function compareWithPreviousSeason(plan: SeasonPlan, currentCompletion = calculateSeasonProgress(plan)): SeasonComparison | undefined {
  return [...plan.previousSeasons].sort((a, b) => b.year - a.year).map(prev => ({
    ...prev,
    completionPercent: Math.round((currentCompletion - prev.completionPercent) * 10) / 10
  }))[0];
}

export function getScenarioRecommendations(plan: SeasonPlan): string[] {
  const scenario = plan.scenario;
  if (scenario === 'produkcja_miodu') return ['Pilnuj siły rodzin przed pożytkami.', 'Priorytet: miodobrania i magazyn miodu.'];
  if (scenario === 'rozwoj_rodzin') return ['Priorytet: poszerzanie gniazd i karmienie rozwojowe.'];
  if (scenario === 'odklady') return ['Zaplanuj ramki, matki i sprzęt dla odkładów.'];
  return ['Priorytet: rodziny wychowujące i kontrola przyjęcia matek.'];
}

export function updateSeasonGoal(plan: SeasonPlan, goalId: string, current: number): SeasonPlan {
  return { ...plan, goals: plan.goals.map(goal => goal.id === goalId ? { ...goal, current } : goal) };
}

export function markSeasonItemDone(plan: SeasonPlan, itemId: string): SeasonPlan {
  return { ...plan, items: plan.items.map(item => item.id === itemId ? { ...item, status: 'wykonane', checklist: item.checklist.map(check => ({ ...check, done: true })) } : item) };
}

export function getCurrentSeasonPlan(state: ApiaryState, year = new Date().getFullYear()): SeasonPlan | undefined {
  return (state.seasonPlans ?? []).find(plan => plan.year === year) ?? (state.seasonPlans ?? [])[0];
}
