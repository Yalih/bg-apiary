import type { ApiaryState, Hive, Priority, Task, TaskTargetAction, TaskType } from '../models/apiary';
import { daysBetween } from './date';
import { getOpenTasks } from './tasks';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type RecommendationAction = 'open_hive' | 'inspection' | 'feeding' | 'note' | 'create_task';

export interface HiveRisk {
  hiveId: string;
  score: number;
  level: RiskLevel;
  reasons: string[];
}

export interface Recommendation {
  id: string;
  hiveId: string;
  title: string;
  reason: string;
  priority: Priority;
  action: RecommendationAction;
  targetAction: TaskTargetAction;
  taskType: TaskType;
  dueDate: string;
}

export interface HiveAnalysis {
  hive: Hive;
  risk: HiveRisk;
  recommendations: Recommendation[];
  development: {
    label: string;
    details: string[];
  };
  queen: {
    label: string;
    details: string[];
  };
}

export interface ApiaryAssistantSummary {
  health: 'stable' | 'watch' | 'risk';
  highRiskCount: number;
  openTasks: number;
  recommendations: Recommendation[];
}

function dateAfter(days: number, now = new Date()): string {
  const d = new Date(now);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function riskLevel(score: number): RiskLevel {
  if (score >= 80) return 'critical';
  if (score >= 55) return 'high';
  if (score >= 30) return 'medium';
  return 'low';
}

export function analyzeHiveRisk(state: ApiaryState, hive: Hive, now = new Date()): HiveRisk {
  const reasons: string[] = [];
  let score = 0;
  const hiveTasks = getOpenTasks(state.tasks).filter(task => task.hiveId === hive.id);
  const inspections = state.inspections.filter(item => item.hiveId === hive.id).sort((a, b) => b.date.localeCompare(a.date));
  const latestInspection = inspections[0];
  const daysSinceInspection = daysBetween(hive.lastInspectionAt, now);
  const queenAge = now.getFullYear() - hive.queen.year;

  if (daysSinceInspection >= 14) {
    score += 28;
    reasons.push(`Brak przeglądu od ${daysSinceInspection} dni.`);
  } else if (daysSinceInspection >= 8) {
    score += 14;
    reasons.push(`Przegląd był ${daysSinceInspection} dni temu.`);
  }

  if (hive.foodLevel === 'niski') {
    score += 25;
    reasons.push('Niski poziom pokarmu.');
  }

  if (hive.strength <= 4) {
    score += 20;
    reasons.push('Słaba siła rodziny.');
  }

  if (latestInspection?.cells && latestInspection.cells > 0) {
    score += 20;
    reasons.push(`Mateczniki w ostatnim przeglądzie: ${latestInspection.cells}.`);
  }

  if (latestInspection && !latestInspection.queenSeen && !latestInspection.eggs && !latestInspection.larvae) {
    score += 30;
    reasons.push('Brak widzianej matki oraz brak jaj i larw.');
  }

  if (queenAge >= 3) {
    score += 18;
    reasons.push(`Matka ma około ${queenAge} sezony.`);
  } else if (queenAge >= 2) {
    score += 8;
    reasons.push(`Matka ma około ${queenAge} sezony.`);
  }

  const urgentTasks = hiveTasks.filter(task => task.priority === 'urgent' || task.priority === 'high');
  if (urgentTasks.length > 0) {
    score += urgentTasks.length * 8;
    reasons.push(`Otwarte pilne zadania: ${urgentTasks.length}.`);
  }

  if (reasons.length === 0) {
    reasons.push('Brak istotnych czynników ryzyka.');
  }

  return {
    hiveId: hive.id,
    score,
    level: riskLevel(score),
    reasons
  };
}

export function buildHiveRecommendations(state: ApiaryState, hive: Hive, now = new Date()): Recommendation[] {
  const recommendations: Recommendation[] = [];
  const risk = analyzeHiveRisk(state, hive, now);
  const latestInspection = state.inspections.filter(item => item.hiveId === hive.id).sort((a, b) => b.date.localeCompare(a.date))[0];
  const daysSinceInspection = daysBetween(hive.lastInspectionAt, now);
  const queenAge = now.getFullYear() - hive.queen.year;

  function add(title: string, reason: string, priority: Priority, action: RecommendationAction, targetAction: TaskTargetAction, taskType: TaskType, dueInDays: number) {
    recommendations.push({
      id: `rec-${hive.id}-${taskType}-${recommendations.length}`,
      hiveId: hive.id,
      title,
      reason,
      priority,
      action,
      targetAction,
      taskType,
      dueDate: dateAfter(dueInDays, now)
    });
  }

  if (daysSinceInspection >= 8) {
    add('Wykonaj przegląd', `Ostatni przegląd był ${daysSinceInspection} dni temu.`, daysSinceInspection >= 14 ? 'high' : 'medium', 'inspection', 'inspection', 'inspection', 0);
  }

  if (hive.foodLevel === 'niski') {
    add('Podaj pokarm', 'W ulu oznaczono niski poziom pokarmu.', 'high', 'feeding', 'feeding', 'feeding', 0);
  }

  if (latestInspection?.cells && latestInspection.cells > 0) {
    add('Skontroluj mateczniki', `Ostatnio stwierdzono mateczniki: ${latestInspection.cells}.`, 'high', 'inspection', 'inspection', 'queen', 3);
  }

  if (latestInspection && !latestInspection.queenSeen && !latestInspection.eggs && !latestInspection.larvae) {
    add('Sprawdź obecność matki', 'Brak matki, jaj i larw w ostatnim przeglądzie.', 'urgent', 'inspection', 'inspection', 'queen', 0);
  }

  if (hive.strength <= 4) {
    add('Obserwuj rozwój rodziny', 'Rodzina ma niską siłę.', 'medium', 'inspection', 'inspection', 'inspection', 3);
  }

  if (queenAge >= 3) {
    add('Rozważ wymianę matki', `Matka rocznik ${hive.queen.year}.`, 'medium', 'open_hive', 'open_hive', 'queen', 7);
  }

  if (risk.level === 'low' && recommendations.length === 0) {
    add('Utrzymaj standardowy monitoring', 'Rodzina wygląda stabilnie.', 'low', 'open_hive', 'open_hive', 'other', 7);
  }

  return recommendations;
}

export function analyzeHiveDevelopment(state: ApiaryState, hive: Hive): HiveAnalysis['development'] {
  const inspections = state.inspections.filter(item => item.hiveId === hive.id).sort((a, b) => a.date.localeCompare(b.date));
  const details: string[] = [];

  if (inspections.length >= 2) {
    const first = inspections[0];
    const last = inspections[inspections.length - 1];
    const strengthDelta = last.strength - first.strength;
    const frameDelta = last.frameCount - first.frameCount;
    details.push(`Zmiana siły: ${strengthDelta >= 0 ? '+' : ''}${strengthDelta}.`);
    details.push(`Zmiana ramek: ${frameDelta >= 0 ? '+' : ''}${frameDelta}.`);

    if (strengthDelta > 0 && frameDelta >= 0) {
      return { label: 'dobry rozwój', details };
    }

    if (strengthDelta < 0) {
      return { label: 'spadek siły', details };
    }
  }

  details.push(`Aktualna siła: ${hive.strength}/10.`);
  details.push(`Aktualne ramki: ${hive.frameCount}.`);
  return { label: hive.strength >= 7 ? 'stabilny rozwój' : 'do obserwacji', details };
}

export function analyzeQueen(state: ApiaryState, hive: Hive, now = new Date()): HiveAnalysis['queen'] {
  const queenAge = now.getFullYear() - hive.queen.year;
  const inspections = state.inspections.filter(item => item.hiveId === hive.id);
  const problemInspections = inspections.filter(item => !item.queenSeen && !item.eggs && !item.larvae);
  const details = [
    `Rasa i linia: ${hive.queen.breed} · ${hive.queen.line}.`,
    `Rocznik: ${hive.queen.year}.`,
    `Data poddania: ${hive.queen.introducedAt}.`
  ];

  if (problemInspections.length > 0) {
    details.push(`Przeglądy z problemem matki: ${problemInspections.length}.`);
    return { label: 'wymaga kontroli', details };
  }

  if (queenAge >= 3) {
    details.push('Matka starsza, warto planować wymianę.');
    return { label: 'rozważyć wymianę', details };
  }

  if (inspections.some(item => item.eggs || item.larvae || item.cappedBrood)) {
    details.push('Historia wskazuje obecność czerwienia.');
    return { label: 'matka stabilna', details };
  }

  return { label: 'brak pełnych danych', details };
}

export function analyzeHive(state: ApiaryState, hive: Hive, now = new Date()): HiveAnalysis {
  return {
    hive,
    risk: analyzeHiveRisk(state, hive, now),
    recommendations: buildHiveRecommendations(state, hive, now),
    development: analyzeHiveDevelopment(state, hive),
    queen: analyzeQueen(state, hive, now)
  };
}

export function analyzeApiary(state: ApiaryState, now = new Date()): ApiaryAssistantSummary {
  const analyses = state.hives.map(hive => analyzeHive(state, hive, now));
  const highRiskCount = analyses.filter(item => item.risk.level === 'high' || item.risk.level === 'critical').length;
  const openTasks = getOpenTasks(state.tasks).length;
  const recommendations = analyses.flatMap(item => item.recommendations).sort((a, b) => priorityValue(b.priority) - priorityValue(a.priority));

  return {
    health: highRiskCount > 2 ? 'risk' : highRiskCount > 0 || openTasks > 5 ? 'watch' : 'stable',
    highRiskCount,
    openTasks,
    recommendations
  };
}

function priorityValue(priority: Priority): number {
  return { low: 1, medium: 2, high: 3, urgent: 4 }[priority];
}

export function recommendationToTask(recommendation: Recommendation, state: ApiaryState): Task {
  const hive = state.hives.find(item => item.id === recommendation.hiveId);
  return {
    id: `task-rec-${Date.now()}-${recommendation.id}`,
    hiveId: recommendation.hiveId,
    apiaryId: hive?.apiaryId ?? '',
    title: recommendation.title,
    dueDate: recommendation.dueDate,
    priority: recommendation.priority,
    status: 'open',
    type: recommendation.taskType,
    description: recommendation.reason,
    createdAt: new Date().toISOString().slice(0, 10),
    targetAction: recommendation.targetAction,
    reminderAt: `${recommendation.dueDate}T07:00`,
    source: 'automatic'
  };
}
