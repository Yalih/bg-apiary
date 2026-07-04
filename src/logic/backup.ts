import type { ApiaryState } from '../models/apiary';

export interface BgApiaryBackup {
  version: string;
  exportedAt: string;
  state: ApiaryState;
  roadmap10plus: string[];
}

export function createBackup(state: ApiaryState): BgApiaryBackup {
  return {
    version: '2.0 FINAL',
    exportedAt: new Date().toISOString(),
    state,
    roadmap10plus: [
      'Eksport PDF',
      'Gotowe pod chmurę – backend niepodłączony',
      'Konto użytkownika',
      'Synchronizacja między telefonami',
      'Gotowe pod AI – analiza zdjęć nieaktywna',
      'Zaawansowane wykresy',
      'Udostępnianie pasieki innym użytkownikom'
    ]
  };
}

export function validateBackup(data: unknown): data is BgApiaryBackup {
  if (!data || typeof data !== 'object') return false;
  const backup = data as Partial<BgApiaryBackup>;
  const state = backup.state as Partial<ApiaryState> | undefined;
  return Boolean(
    backup.version &&
    backup.exportedAt &&
    state &&
    Array.isArray(state.apiaries) &&
    Array.isArray(state.hives) &&
    Array.isArray(state.tasks)
  );
}

export function restoreBackup(data: unknown): ApiaryState {
  if (!validateBackup(data)) {
    throw new Error('Nieprawidłowy plik kopii zapasowej BgApiary.');
  }
  return {
    ...data.state,
    photos: data.state.photos ?? [],
    notes: data.state.notes ?? [],
    events: data.state.events ?? [],
    decisionEvents: data.state.decisionEvents ?? [],
    queenControls: data.state.queenControls ?? [],
    workTours: data.state.workTours ?? [],
    workPreferences: data.state.workPreferences ?? {},
    inventoryItems: data.state.inventoryItems ?? [],
    inventoryMovements: data.state.inventoryMovements ?? [],
    honeyHarvests: data.state.honeyHarvests ?? [],
    honeyBatches: data.state.honeyBatches ?? [],
    honeyJarStocks: data.state.honeyJarStocks ?? [],
    honeyCustomers: data.state.honeyCustomers ?? [],
    honeySales: data.state.honeySales ?? [],
    honeyLabels: data.state.honeyLabels ?? [],
    varroaMeasurements: data.state.varroaMeasurements ?? [],
    treatments: data.state.treatments ?? [],
    healthChecks: data.state.healthChecks ?? [],
    hiveTransfers: data.state.hiveTransfers ?? [],
    hiveQuarantines: data.state.hiveQuarantines ?? [],
    seasonPlans: data.state.seasonPlans ?? [],
    cloudProfile: data.state.cloudProfile,
    syncQueue: data.state.syncQueue ?? [],
    syncHistory: data.state.syncHistory ?? [],
    syncConflicts: data.state.syncConflicts ?? [],
    sharedMembers: data.state.sharedMembers ?? [],
    permissionRules: data.state.permissionRules ?? [],
    auditLog: data.state.auditLog ?? [],
    dataVersions: data.state.dataVersions ?? [],
    hiveAIProfiles: data.state.hiveAIProfiles ?? [],
    colonyScores: data.state.colonyScores ?? [],
    recommendations20: data.state.recommendations20 ?? [],
    predictions: data.state.predictions ?? [],
    photoAnalyses: data.state.photoAnalyses ?? [],
    hives: data.state.hives.map(hive => ({ ...hive, queenHistory: hive.queenHistory ?? [], familyStatus: hive.familyStatus ?? 'medium' }))
  };
}

export function downloadBackup(state: ApiaryState): void {
  const backup = createBackup(state);
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const date = new Date().toISOString().slice(0, 10);
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `BgApiary-backup-${date}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}
