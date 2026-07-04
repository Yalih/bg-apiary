import type { ApiaryState } from '../models/apiary';
import { createEmptyState } from '../storage/emptyState';

function getApiaryHiveIds(state: ApiaryState, apiaryId: string): Set<string> {
  return new Set(state.hives.filter(hive => hive.apiaryId === apiaryId).map(hive => hive.id));
}

function removeHiveReferences(state: ApiaryState, hiveIds: Set<string>, apiaryId?: string): ApiaryState {
  const hasHive = (hiveId?: string) => Boolean(hiveId && hiveIds.has(hiveId));
  const hasApiary = (value?: string) => Boolean(apiaryId && value === apiaryId);
  const harvestIds = new Set((state.honeyHarvests ?? []).filter(item => hasApiary(item.apiaryId) || item.hiveIds.some(id => hiveIds.has(id))).map(item => item.id));
  const batchIds = new Set((state.honeyBatches ?? []).filter(item => hasApiary(item.apiaryId) || item.hiveIds.some(id => hiveIds.has(id)) || item.sources.some(source => hasHive(source.hiveId) || hasApiary(source.apiaryId) || Boolean(source.harvestId && harvestIds.has(source.harvestId)))).map(item => item.id));
  const taskIds = new Set(state.tasks.filter(item => hasHive(item.hiveId) || hasApiary(item.apiaryId)).map(item => item.id));
  const photoIds = new Set(state.photos.filter(item => hasHive(item.hiveId)).map(item => item.id));

  return {
    ...state,
    hives: state.hives.filter(hive => !hiveIds.has(hive.id)),
    inspections: state.inspections.filter(item => !hasHive(item.hiveId)),
    feedings: state.feedings.filter(item => !hasHive(item.hiveId)),
    events: state.events.filter(item => !hasHive(item.hiveId)),
    decisionEvents: (state.decisionEvents ?? []).filter(item => !hasHive(item.hiveId)),
    queenControls: (state.queenControls ?? []).filter(item => !hasHive(item.hiveId)),
    notes: state.notes.filter(item => !hasHive(item.hiveId)),
    photos: state.photos.filter(item => !hasHive(item.hiveId)),
    tasks: state.tasks.filter(item => !taskIds.has(item.id)),
    workTours: (state.workTours ?? []).map(tour => ({
      ...tour,
      taskIds: tour.taskIds.filter(id => !taskIds.has(id)),
      completedTaskIds: tour.completedTaskIds.filter(id => !taskIds.has(id)),
      currentHiveId: hasHive(tour.currentHiveId) ? undefined : tour.currentHiveId
    })).filter(tour => tour.taskIds.length > 0 || !apiaryId),
    inventoryItems: (state.inventoryItems ?? []).filter(item => !hasHive(item.linkedHiveId) && !hasApiary(item.linkedApiaryId)),
    inventoryMovements: (state.inventoryMovements ?? []).filter(item => !hasHive(item.hiveId) && !hasApiary(item.apiaryId) && !Boolean(item.taskId && taskIds.has(item.taskId))),
    honeyHarvests: (state.honeyHarvests ?? []).filter(item => !harvestIds.has(item.id)),
    honeyBatches: (state.honeyBatches ?? []).filter(item => !batchIds.has(item.id)).map(batch => ({
      ...batch,
      hiveIds: batch.hiveIds.filter(id => !hiveIds.has(id)),
      sources: batch.sources.filter(source => !hasHive(source.hiveId) && !hasApiary(source.apiaryId) && !Boolean(source.harvestId && harvestIds.has(source.harvestId)) && !Boolean(source.batchId && batchIds.has(source.batchId))),
      mixedFromBatchIds: batch.mixedFromBatchIds?.filter(id => !batchIds.has(id))
    })),
    honeyJarStocks: (state.honeyJarStocks ?? []).filter(item => !batchIds.has(item.batchId)),
    honeySales: (state.honeySales ?? []).filter(item => !batchIds.has(item.batchId)),
    honeyLabels: (state.honeyLabels ?? []).filter(item => !batchIds.has(item.batchId)),
    varroaMeasurements: (state.varroaMeasurements ?? []).filter(item => !hasHive(item.hiveId)),
    treatments: (state.treatments ?? []).filter(item => !hasHive(item.hiveId)),
    healthChecks: (state.healthChecks ?? []).filter(item => !hasHive(item.hiveId)),
    hiveTransfers: (state.hiveTransfers ?? []).filter(item => !hasHive(item.hiveId) && !hasApiary(item.fromApiaryId) && !hasApiary(item.toApiaryId)),
    hiveQuarantines: (state.hiveQuarantines ?? []).filter(item => !hasHive(item.hiveId)),
    seasonPlans: (state.seasonPlans ?? []).map(plan => ({
      ...plan,
      items: plan.items.filter(item => !hasHive(item.hiveId) && !hasApiary(item.apiaryId)),
      goals: plan.goals.filter(goal => !hasApiary(goal.apiaryId)),
      nectarFlows: plan.nectarFlows.filter(flow => !hasApiary(flow.apiaryId))
    })),
    syncQueue: (state.syncQueue ?? []).filter(item => !(item.entityType === 'hive' && hiveIds.has(item.entityId)) && !(item.entityType === 'apiary' && hasApiary(item.entityId)) && !(item.entityType === 'task' && taskIds.has(item.entityId))),
    syncConflicts: (state.syncConflicts ?? []).filter(item => !(item.entityType === 'hive' && hiveIds.has(item.entityId)) && !(item.entityType === 'apiary' && hasApiary(item.entityId))),
    sharedMembers: (state.sharedMembers ?? []).filter(item => !hasApiary(item.apiaryId)),
    auditLog: (state.auditLog ?? []).filter(item => !(item.entityType === 'hive' && hiveIds.has(item.entityId)) && !(item.entityType === 'apiary' && hasApiary(item.entityId)) && !(item.entityType === 'task' && taskIds.has(item.entityId))),
    dataVersions: (state.dataVersions ?? []).filter(item => !(item.entityType === 'hive' && hiveIds.has(item.entityId)) && !(item.entityType === 'apiary' && hasApiary(item.entityId)) && !(item.entityType === 'task' && taskIds.has(item.entityId))),
    hiveAIProfiles: (state.hiveAIProfiles ?? []).filter(item => !hasHive(item.hiveId)),
    colonyScores: (state.colonyScores ?? []).filter(item => !hasHive(item.hiveId)),
    recommendations20: (state.recommendations20 ?? []).filter(item => !hasHive(item.hiveId) && !hasApiary(item.apiaryId)),
    predictions: (state.predictions ?? []).filter(item => !hasHive(item.hiveId)),
    photoAnalyses: (state.photoAnalyses ?? []).filter(item => !Boolean(item.photoId && photoIds.has(item.photoId)) && !hasHive(item.hiveId)),
    lastOpenedHiveId: state.lastOpenedHiveId && hiveIds.has(state.lastOpenedHiveId) ? undefined : state.lastOpenedHiveId
  };
}

export function deleteHiveData(state: ApiaryState, hiveId: string): ApiaryState {
  return removeHiveReferences(state, new Set([hiveId]));
}

export function deleteApiaryData(state: ApiaryState, apiaryId: string): ApiaryState {
  const hiveIds = getApiaryHiveIds(state, apiaryId);
  const cleaned = removeHiveReferences(state, hiveIds, apiaryId);
  return {
    ...cleaned,
    apiaries: cleaned.apiaries.filter(apiary => apiary.id !== apiaryId)
  };
}

export function clearUserData(): ApiaryState {
  return createEmptyState();
}
