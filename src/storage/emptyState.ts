import type { ApiaryState } from '../models/apiary';

export function createEmptyState(): ApiaryState {
  return {
    apiaries: [],
    hives: [],
    inspections: [],
    feedings: [],
    events: [],
    decisionEvents: [],
    queenControls: [],
    workTours: [],
    workPreferences: {},
    notes: [],
    photos: [],
    tasks: [],
    inventoryItems: [],
    inventoryMovements: [],
    honeyHarvests: [],
    honeyBatches: [],
    honeyJarStocks: [],
    honeyCustomers: [],
    honeySales: [],
    honeyLabels: [],
    varroaMeasurements: [],
    treatments: [],
    healthChecks: [],
    hiveTransfers: [],
    hiveQuarantines: [],
    seasonPlans: [],
    syncQueue: [],
    syncHistory: [],
    syncConflicts: [],
    sharedMembers: [],
    permissionRules: [],
    auditLog: [],
    dataVersions: [],
    hiveAIProfiles: [],
    colonyScores: [],
    recommendations20: [],
    predictions: [],
    photoAnalyses: [],
    lastOpenedHiveId: undefined
  };
}

export function isEmptyApiaryState(state: ApiaryState): boolean {
  return state.apiaries.length === 0 && state.hives.length === 0;
}
