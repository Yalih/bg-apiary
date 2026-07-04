import type { ApiaryState } from '../models/apiary';
import { buildHealthAlerts } from './health';
import { buildInventoryAlerts } from './rcSupport20';
import { buildPredictions20, buildRecommendations20 } from './assistant20';
import { getSyncStatus } from './sync20';

export interface DataQualityIssue {
  id: string;
  level: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  module: string;
}

export function buildDataQualityReport(state: ApiaryState): DataQualityIssue[] {
  const issues: DataQualityIssue[] = [];
  state.hives.forEach(hive => {
    if (!state.inspections.some(item => item.hiveId === hive.id)) {
      issues.push({ id: `no-inspection-${hive.id}`, level: 'warning', title: 'Ul bez przeglądu', message: `${hive.name} nie ma zapisanego przeglądu.`, module: 'ule' });
    }
    if (!state.varroaMeasurements?.some(item => item.hiveId === hive.id)) {
      issues.push({ id: `no-health-${hive.id}`, level: 'warning', title: 'Brak danych zdrowotnych', message: `${hive.name} nie ma pomiaru warrozy.`, module: 'zdrowie' });
    }
    if (!hive.queen?.breed || hive.queen.breed === 'nieznana') {
      issues.push({ id: `no-queen-${hive.id}`, level: 'info', title: 'Niepełne dane matki', message: `${hive.name} ma niepełne dane matki.`, module: 'matki' });
    }
    if (!state.photos.some(item => item.hiveId === hive.id)) {
      issues.push({ id: `no-photo-${hive.id}`, level: 'info', title: 'Ul bez zdjęć', message: `${hive.name} nie ma zdjęć w historii.`, module: 'zdjęcia' });
    }
  });

  state.apiaries.forEach(apiary => {
    if (!apiary.location) {
      issues.push({ id: `no-location-${apiary.id}`, level: 'info', title: 'Pasieka bez lokalizacji', message: `${apiary.name} nie ma wpisanej lokalizacji.`, module: 'pasieki' });
    }
  });

  state.honeyBatches?.forEach(batch => {
    if (!batch.moisturePercent) {
      issues.push({ id: `no-moisture-${batch.id}`, level: 'warning', title: 'Partia bez wilgotności', message: `${batch.batchNumber} nie ma wpisanej wilgotności.`, module: 'miód' });
    }
  });

  return issues;
}

export function buildNotificationCenter(state: ApiaryState) {
  const health = buildHealthAlerts(state).map(alert => ({ id: `health-${alert.hiveId}-${alert.title}`, type: 'zdrowie', priority: alert.level, title: alert.title, message: alert.message }));
  const inventory = buildInventoryAlerts(state).map(item => ({ id: `inventory-${item.id}`, type: 'magazyn', priority: 'warning', title: 'Niski stan magazynu', message: `${item.name}: ${item.quantity}` }));
  const sync = (state.syncConflicts ?? []).filter(item => !item.resolvedAt).map(item => ({ id: item.id, type: 'synchronizacja', priority: 'critical', title: 'Konflikt danych', message: `${item.entityType}: ${item.entityId}` }));
  const quality = buildDataQualityReport(state).slice(0, 10).map(item => ({ id: item.id, type: 'jakość danych', priority: item.level, title: item.title, message: item.message }));
  return [...sync, ...health, ...inventory, ...quality];
}

export function buildOwnerDashboard(state: ApiaryState) {
  const recommendations = buildRecommendations20(state);
  const predictions = buildPredictions20(state);
  const notifications = buildNotificationCenter(state);
  return {
    syncStatus: getSyncStatus(state),
    todayTasks: state.tasks.filter(task => task.status === 'open').length,
    overdueTasks: state.tasks.filter(task => task.status === 'open' && task.dueDate < new Date().toISOString().slice(0, 10)).length,
    notifications: notifications.length,
    recommendations: recommendations.length,
    predictions: predictions.length,
    dataQualityIssues: buildDataQualityReport(state).length,
    lastChanges: (state.auditLog ?? []).slice(0, 10)
  };
}

export function buildRcAuditSummary(state: ApiaryState) {
  const owner = buildOwnerDashboard(state);
  return {
    ready: true,
    cloudReadyMessage: 'Gotowe pod chmurę bez podłączonego backendu.',
    aiReadyMessage: 'Gotowe pod AI bez realnej analizy zdjęć online.',
    ownerDashboard: owner,
    dataQualityIssues: buildDataQualityReport(state).length,
    notifications: buildNotificationCenter(state).length
  };
}
