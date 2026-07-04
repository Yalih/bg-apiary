import { describe, expect, it } from 'vitest';
import { createEmptyState } from '../storage/emptyState';
import { deleteApiaryData, deleteHiveData } from '../logic/dataManagement';
import type { ApiaryState } from '../models/apiary';

function filledState(): ApiaryState {
  return {
    ...createEmptyState(),
    apiaries: [{ id: 'a1', name: 'Pasieka', location: 'Kolno', description: '', imageEmoji: '🐝' }],
    hives: [{ id: 'h1', apiaryId: 'a1', number: 1, name: 'Ul 1', type: 'WP', frameCount: 7, strength: 6, mood: 'normalna', foodLevel: 'dobry', queen: { introducedAt: '2026-01-01', breed: 'Krainka', line: 'Sklenar', year: 2026, status: 'mated' }, lastInspectionAt: '2026-07-01', nextAction: '', notes: '' }],
    inspections: [{ id: 'i1', hiveId: 'h1', date: '2026-07-01', summary: '', brood: '', queenSeen: true, eggs: true, larvae: true, cappedBrood: true, cells: 0, strength: 6, mood: 'normalna', foodLevel: 'dobry', frameCount: 7 }],
    feedings: [{ id: 'f1', hiveId: 'h1', date: '2026-07-01', type: 'syrop', amountLiters: 1, unit: 'l', reason: '', note: '' }],
    events: [{ id: 'e1', hiveId: 'h1', date: '2026-07-01', type: 'inspection', title: '', details: '' }],
    notes: [{ id: 'n1', hiveId: 'h1', date: '2026-07-01', text: 'notatka' }],
    photos: [{ id: 'p1', hiveId: 'h1', linkedType: 'hive', date: '2026-07-01', title: '', description: '', dataUrl: '' }],
    tasks: [{ id: 't1', hiveId: 'h1', apiaryId: 'a1', title: 'zadanie', dueDate: '2026-07-02', priority: 'medium', status: 'open', type: 'inspection', description: '', createdAt: '2026-07-01', targetAction: 'inspection' }],
    varroaMeasurements: [{ id: 'v1', hiveId: 'h1', date: '2026-07-01', method: 'alkohol', miteCount: 10, beesSampleCount: 300, infestationPercent: 3.3, riskLevel: 'wysokie', notes: '' }],
    treatments: [{ id: 'tr1', hiveId: 'h1', date: '2026-07-01', preparation: 'Apiwarol', producer: '', activeSubstance: '', dose: 1, unit: 'tabletka', quantity: 1, batchNumber: '', reason: '', status: 'w_trakcie', notes: '' }],
    healthChecks: [{ id: 'hc1', hiveId: 'h1', date: '2026-07-01', type: 'kontrola', result: 'ok', notes: '' }],
    hiveTransfers: [{ id: 'ht1', hiveId: 'h1', fromApiaryId: 'a1', toApiaryId: 'a2', date: '2026-07-01', reason: '', notes: '', queenSnapshot: { introducedAt: '2026-01-01', breed: 'Krainka', line: 'Sklenar', year: 2026 }, strengthSnapshot: 6 }],
    hiveQuarantines: [{ hiveId: 'h1', status: 'kwarantanna', since: '2026-07-01', reason: '', notes: '' }],
    honeyHarvests: [{ id: 'hh1', date: '2026-07-01', apiaryId: 'a1', hiveIds: ['h1'], honeyType: 'lipowy', framesCount: 1, weightBeforeKg: 10, weightAfterKg: 8, notes: '' }],
    honeyBatches: [{ id: 'hb1', batchNumber: 'B1', date: '2026-07-01', apiaryId: 'a1', hiveIds: ['h1'], honeyType: 'lipowy', color: '', weightKg: 2, remainingKg: 2, moisturePercent: 18, status: 'gotowa', location: '', notes: '', sources: [{ harvestId: 'hh1', hiveId: 'h1', apiaryId: 'a1', weightKg: 2 }] }],
    honeyJarStocks: [{ id: 'js1', batchId: 'hb1', jarSizeGrams: 900, full: 1, reserved: 0, sold: 0, pouredAt: '2026-07-01' }],
    honeySales: [{ id: 's1', date: '2026-07-01', batchId: 'hb1', jarSizeGrams: 900, jarsCount: 1, weightKg: .9, priceTotal: 50, paymentMethod: 'gotowka', notes: '' }],
    honeyLabels: [{ id: 'l1', batchId: 'hb1', labelName: 'Lipa', netWeightGrams: 900, qrText: '', pouredAt: '2026-07-01', createdAt: '2026-07-01' }],
    seasonPlans: [{ id: 'sp1', year: 2026, templateType: 'amatorska', scenario: 'produkcja_miodu', createdAt: '2026-01-01', items: [{ id: 'si1', month: 7, title: 'Praca', description: '', category: 'inspection', priority: 'medium', status: 'planowane', apiaryId: 'a1', hiveId: 'h1', checklist: [], dueDate: '2026-07-01', reminderOffsets: [] }], goals: [{ id: 'g1', type: 'rodziny', title: '', planned: 1, current: 1, unit: 'szt.', apiaryId: 'a1' }], nectarFlows: [{ id: 'nf1', apiaryId: 'a1', name: 'Lipa', startDate: '2026-07-01', endDate: '2026-07-10', expectedStrength: 'mocny', notes: '' }], previousSeasons: [] }],
    hiveAIProfiles: [{ hiveId: 'h1', strengthTrend: 'rosnie', queenQuality: 80, healthRisk: 10, productivity: 70, lastUpdatedAt: '2026-07-01' }],
    colonyScores: [{ hiveId: 'h1', score: 80, risk: 'low', reasons: [] }],
    recommendations20: [{ id: 'r1', hiveId: 'h1', apiaryId: 'a1', priority: 'medium', title: '', message: '', actionType: 'inspection', source: 'rules' }],
    predictions: [{ id: 'pr1', hiveId: 'h1', type: 'strength', date: '2026-07-01', horizonDays: 14, probability: .5, value: '', reason: '' }],
    photoAnalyses: [{ id: 'pa1', photoId: 'p1', hiveId: 'h1', date: '2026-07-01', tags: ['ramki'], notes: '' }],
    auditLog: [{ id: 'a1', userId: 'u1', userEmail: 'u@b.pl', action: 'update', entityType: 'hive', entityId: 'h1', date: '2026-07-01', summary: '' }],
    dataVersions: [{ id: 'dv1', entityType: 'hive', entityId: 'h1', version: 1, createdAt: '2026-07-01', createdBy: 'u1', snapshot: {} }]
  };
}

describe('final data deletion 2.0', () => {
  it('deleteHiveData removes all dependent records from 1.5-2.0 collections', () => {
    const cleaned = deleteHiveData(filledState(), 'h1');
    expect(cleaned.hives).toHaveLength(0);
    expect(cleaned.inspections).toHaveLength(0);
    expect(cleaned.varroaMeasurements).toHaveLength(0);
    expect(cleaned.treatments).toHaveLength(0);
    expect(cleaned.honeyHarvests).toHaveLength(0);
    expect(cleaned.honeyBatches).toHaveLength(0);
    expect(cleaned.seasonPlans?.[0].items).toHaveLength(0);
    expect(cleaned.hiveAIProfiles).toHaveLength(0);
    expect(cleaned.predictions).toHaveLength(0);
    expect(cleaned.photoAnalyses).toHaveLength(0);
    expect(cleaned.auditLog).toHaveLength(0);
    expect(cleaned.dataVersions).toHaveLength(0);
  });

  it('deleteApiaryData removes apiary and all dependent records', () => {
    const cleaned = deleteApiaryData(filledState(), 'a1');
    expect(cleaned.apiaries).toHaveLength(0);
    expect(cleaned.hives).toHaveLength(0);
    expect(cleaned.honeyHarvests).toHaveLength(0);
    expect(cleaned.seasonPlans?.[0].goals).toHaveLength(0);
    expect(cleaned.seasonPlans?.[0].nectarFlows).toHaveLength(0);
  });
});
