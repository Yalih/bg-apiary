import type {
  ApiaryState,
  HealthRiskLevel,
  Hive,
  HiveQuarantine,
  HiveTransfer,
  InventoryMovement,
  QuarantineStatus,
  TreatmentRecord,
  VarroaMeasurement,
  VarroaTestMethod
} from '../models/apiary';
import { createInventoryMovement } from './inventory';

export const MEDICINE_PREPARATIONS = [
  'Apiwarol',
  'Biowar',
  'Bayvarol',
  'VarroMed',
  'Api Life Var',
  'ApiGuard',
  'Kwas szczawiowy',
  'Kwas mrówkowy',
  'Tymol',
  'Inny'
];

export function calculateInfestationPercent(method: VarroaTestMethod, miteCount: number, beesSampleCount = 300, daysCount = 1): number {
  if (method === 'osyp') return Math.round((miteCount / Math.max(1, daysCount)) * 100) / 100;
  return Math.round((miteCount / Math.max(1, beesSampleCount)) * 10000) / 100;
}

export function getHealthRiskLevel(method: VarroaTestMethod, infestationPercent: number): HealthRiskLevel {
  if (method === 'osyp') {
    if (infestationPercent >= 10) return 'krytyczne';
    if (infestationPercent >= 5) return 'wysokie';
    if (infestationPercent >= 2) return 'obserwacja';
    return 'ok';
  }
  if (infestationPercent >= 6) return 'krytyczne';
  if (infestationPercent >= 3) return 'wysokie';
  if (infestationPercent >= 1) return 'obserwacja';
  return 'ok';
}

export function riskLabel(level: HealthRiskLevel): string {
  return {
    ok: 'OK',
    obserwacja: 'Obserwacja',
    wysokie: 'Wysokie ryzyko',
    krytyczne: 'Krytyczne'
  }[level];
}

export function createVarroaMeasurement(input: Omit<VarroaMeasurement, 'id' | 'infestationPercent' | 'riskLevel'>): VarroaMeasurement {
  const infestationPercent = calculateInfestationPercent(input.method, input.miteCount, input.beesSampleCount, input.daysCount);
  return {
    id: `varroa-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    infestationPercent,
    riskLevel: getHealthRiskLevel(input.method, infestationPercent),
    ...input
  };
}

export function createTreatment(input: Omit<TreatmentRecord, 'id'>): TreatmentRecord {
  return {
    id: `treatment-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    ...input
  };
}

export function treatmentToInventoryMovement(treatment: TreatmentRecord): InventoryMovement | undefined {
  if (!treatment.inventoryItemId) return undefined;
  return createInventoryMovement({
    itemId: treatment.inventoryItemId,
    date: treatment.date,
    type: 'out',
    quantity: treatment.quantity,
    reason: `Leczenie: ${treatment.preparation}`,
    hiveId: treatment.hiveId,
    note: `${treatment.dose} ${treatment.unit}. ${treatment.reason}`
  });
}

export function buildHealthAlerts(state: ApiaryState) {
  const measurements = state.varroaMeasurements ?? [];
  const treatments = state.treatments ?? [];
  const quarantines = state.hiveQuarantines ?? [];
  return state.hives.flatMap(hive => {
    const hiveMeasurements = measurements.filter(item => item.hiveId === hive.id).sort((a, b) => b.date.localeCompare(a.date));
    const last = hiveMeasurements[0];
    const hiveTreatments = treatments.filter(item => item.hiveId === hive.id);
    const quarantine = quarantines.find(item => item.hiveId === hive.id && item.status !== 'brak');
    const alerts: Array<{ hiveId: string; level: HealthRiskLevel; title: string; message: string }> = [];

    if (!last) alerts.push({ hiveId: hive.id, level: 'obserwacja', title: 'Brak pomiaru warrozy', message: 'Rodzina nie ma zapisanego badania warrozy.' });
    if (last && (last.riskLevel === 'wysokie' || last.riskLevel === 'krytyczne')) alerts.push({ hiveId: hive.id, level: last.riskLevel, title: 'Wysoka warroza', message: `${last.infestationPercent}% / osyp dzienny według metody ${last.method}.` });
    if (hiveTreatments.some(item => item.nextControlDate && item.nextControlDate < new Date().toISOString().slice(0, 10) && item.status !== 'zakonczone')) {
      alerts.push({ hiveId: hive.id, level: 'wysokie', title: 'Zaległa kontrola leczenia', message: 'Minął termin kontroli po leczeniu.' });
    }
    if (quarantine) alerts.push({ hiveId: hive.id, level: quarantine.status === 'kwarantanna' ? 'krytyczne' : 'obserwacja', title: quarantine.status === 'kwarantanna' ? 'Kwarantanna' : 'Obserwacja', message: quarantine.reason });

    return alerts;
  });
}

export function buildHealthReport(state: ApiaryState) {
  const alerts = buildHealthAlerts(state);
  const treatedHiveIds = new Set((state.treatments ?? []).map(item => item.hiveId));
  const highVarroaHiveIds = new Set((state.varroaMeasurements ?? []).filter(item => item.riskLevel === 'wysokie' || item.riskLevel === 'krytyczne').map(item => item.hiveId));
  const avgInfestation = (state.varroaMeasurements ?? []).length
    ? Math.round(((state.varroaMeasurements ?? []).reduce((sum, item) => sum + item.infestationPercent, 0) / (state.varroaMeasurements ?? []).length) * 100) / 100
    : 0;

  return {
    hives: state.hives.length,
    healthy: Math.max(0, state.hives.length - new Set(alerts.map(item => item.hiveId)).size),
    treated: treatedHiveIds.size,
    highVarroa: highVarroaHiveIds.size,
    alerts: alerts.length,
    averageInfestation: avgInfestation,
    treatments: (state.treatments ?? []).length,
    controlsDue: (state.treatments ?? []).filter(item => item.nextControlDate && item.nextControlDate >= new Date().toISOString().slice(0, 10)).length
  };
}

export function transferHive(state: ApiaryState, input: Omit<HiveTransfer, 'id' | 'queenSnapshot' | 'strengthSnapshot'>): ApiaryState {
  const hive = state.hives.find(item => item.id === input.hiveId);
  if (!hive) return state;
  const transfer: HiveTransfer = {
    id: `hive-transfer-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    queenSnapshot: hive.queen,
    strengthSnapshot: hive.strength,
    ...input
  };

  return {
    ...state,
    hives: state.hives.map(item => item.id === input.hiveId ? { ...item, apiaryId: input.toApiaryId } : item),
    tasks: state.tasks.map(task => task.hiveId === input.hiveId ? { ...task, apiaryId: input.toApiaryId } : task),
    hiveTransfers: [transfer, ...(state.hiveTransfers ?? [])],
    events: [{
      id: `event-transfer-${Date.now()}`,
      hiveId: input.hiveId,
      date: input.date,
      type: 'status',
      title: 'Przeniesienie ula',
      details: `Z ${input.fromApiaryId} do ${input.toApiaryId}. ${input.reason}`
    }, ...state.events]
  };
}

export function setHiveQuarantine(state: ApiaryState, hiveId: string, status: QuarantineStatus, reason: string, notes: string): ApiaryState {
  const existing = state.hiveQuarantines ?? [];
  const entry: HiveQuarantine = {
    hiveId,
    status,
    since: new Date().toISOString().slice(0, 10),
    reason,
    notes
  };

  return {
    ...state,
    hiveQuarantines: [entry, ...existing.filter(item => item.hiveId !== hiveId)]
  };
}
