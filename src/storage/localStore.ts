import type { ApiaryState } from '../models/apiary';
import { createEmptyState } from './emptyState';
import { getSessionUserId, getUserStateKey } from '../auth/auth';

const LEGACY_STORAGE_KEY = 'bgapiary-state-v07a';

function keyForUser(userId?: string | null): string {
  if (userId) return getUserStateKey(userId);
  const sessionUserId = getSessionUserId();
  return sessionUserId ? getUserStateKey(sessionUserId) : LEGACY_STORAGE_KEY;
}

function normalizeStoredState(parsed: ApiaryState): ApiaryState {
  return {
    ...parsed,
    notes: parsed.notes ?? [],
    photos: parsed.photos ?? [],
    events: parsed.events ?? [],
    decisionEvents: parsed.decisionEvents ?? [],
    queenControls: parsed.queenControls ?? [],
    workTours: parsed.workTours ?? [],
    workPreferences: parsed.workPreferences ?? {},
    inventoryItems: parsed.inventoryItems ?? [],
    inventoryMovements: parsed.inventoryMovements ?? [],
    honeyHarvests: parsed.honeyHarvests ?? [],
    honeyBatches: parsed.honeyBatches ?? [],
    honeyJarStocks: parsed.honeyJarStocks ?? [],
    honeyCustomers: parsed.honeyCustomers ?? [],
    honeySales: parsed.honeySales ?? [],
    honeyLabels: parsed.honeyLabels ?? [],
    varroaMeasurements: parsed.varroaMeasurements ?? [],
    treatments: parsed.treatments ?? [],
    healthChecks: parsed.healthChecks ?? [],
    hiveTransfers: parsed.hiveTransfers ?? [],
    hiveQuarantines: parsed.hiveQuarantines ?? [],
    seasonPlans: parsed.seasonPlans ?? [],
    cloudProfile: parsed.cloudProfile,
    syncQueue: parsed.syncQueue ?? [],
    syncHistory: parsed.syncHistory ?? [],
    syncConflicts: parsed.syncConflicts ?? [],
    sharedMembers: parsed.sharedMembers ?? [],
    permissionRules: parsed.permissionRules ?? [],
    auditLog: parsed.auditLog ?? [],
    dataVersions: parsed.dataVersions ?? [],
    hiveAIProfiles: parsed.hiveAIProfiles ?? [],
    colonyScores: parsed.colonyScores ?? [],
    recommendations20: parsed.recommendations20 ?? [],
    predictions: parsed.predictions ?? [],
    photoAnalyses: parsed.photoAnalyses ?? [],
    hives: parsed.hives.map((hive, index) => ({
      ...hive,
      familyStatus: hive.familyStatus ?? (hive.strength >= 8 ? 'strong' : hive.strength <= 4 ? 'weak' : 'medium'),
      queenHistory: hive.queenHistory ?? [],
      queen: { ...hive.queen, status: hive.queen.status ?? 'mated' },
      mapPosition: hive.mapPosition ?? { row: Math.floor(index / 4) + 1, column: (index % 4) + 1 }
    })),
    tasks: parsed.tasks.map(task => ({ ...task, workCategory: task.workCategory ?? task.type }))
  };
}

export function loadStateForUser(userId: string): ApiaryState {
  if (typeof localStorage === 'undefined') return createEmptyState();

  const key = keyForUser(userId);
  const stored = localStorage.getItem(key);
  if (!stored) {
    const empty = createEmptyState();
    saveStateForUser(userId, empty);
    return empty;
  }

  try {
    return normalizeStoredState(JSON.parse(stored) as ApiaryState);
  } catch {
    const empty = createEmptyState();
    saveStateForUser(userId, empty);
    return empty;
  }
}

export function saveStateForUser(userId: string, state: ApiaryState): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(keyForUser(userId), JSON.stringify(state));
}

export function resetStateForUser(userId: string): ApiaryState {
  const empty = createEmptyState();
  saveStateForUser(userId, empty);
  return empty;
}

export function loadState(): ApiaryState {
  const userId = getSessionUserId();
  if (userId) return loadStateForUser(userId);

  if (typeof localStorage === 'undefined') return createEmptyState();
  const stored = localStorage.getItem(LEGACY_STORAGE_KEY);
  if (!stored) {
    const empty = createEmptyState();
    saveState(empty);
    return empty;
  }

  try {
    return normalizeStoredState(JSON.parse(stored) as ApiaryState);
  } catch {
    const empty = createEmptyState();
    saveState(empty);
    return empty;
  }
}

export function saveState(state: ApiaryState): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(keyForUser(), JSON.stringify(state));
}

export function resetState(): ApiaryState {
  const userId = getSessionUserId();
  if (userId) return resetStateForUser(userId);
  const empty = createEmptyState();
  saveState(empty);
  return empty;
}
