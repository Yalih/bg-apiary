import { apiRequest, unwrapData, type ApiEnvelope } from './apiClient';
import type { Hive } from '../models/apiary';

export interface BackendHive {
  id: string;
  apiaryId: string;
  hiveNumber: string;
  hiveType: string;
  status: 'ACTIVE' | 'WEAK' | 'WATCH' | 'INACTIVE' | 'LOST';
  frameCount?: number | null;
}

export interface CreateHiveRequest {
  apiaryId: string;
  hiveNumber: string;
  hiveType: string;
  status?: 'ACTIVE' | 'WEAK' | 'WATCH' | 'INACTIVE' | 'LOST';
  frameCount?: number;
}

function statusToStrength(status: BackendHive['status']): number {
  if (status === 'WEAK') return 4;
  if (status === 'WATCH') return 6;
  if (status === 'LOST' || status === 'INACTIVE') return 1;
  return 7;
}

function statusToFamily(status: BackendHive['status']): Hive['familyStatus'] {
  if (status === 'WEAK') return 'weak';
  if (status === 'WATCH') return 'medium';
  if (status === 'LOST' || status === 'INACTIVE') return 'queenless';
  return 'production';
}

export function mapBackendHive(item: BackendHive, index = 0): Hive {
  const parsedNumber = Number.parseInt(item.hiveNumber.replace(/\D/g, ''), 10);
  return {
    id: item.id,
    apiaryId: item.apiaryId,
    number: Number.isFinite(parsedNumber) ? parsedNumber : index + 1,
    name: `Ul ${item.hiveNumber}`,
    type: item.hiveType,
    frameCount: item.frameCount ?? 0,
    strength: statusToStrength(item.status),
    mood: 'normalna',
    foodLevel: 'średni',
    queen: {
      introducedAt: new Date().toISOString().slice(0, 10),
      breed: 'Nieustalona',
      line: 'Nieustalona',
      year: new Date().getFullYear(),
      status: item.status === 'LOST' ? 'queenless' : 'to_check'
    },
    lastInspectionAt: '',
    nextAction: 'Wykonać pierwszy przegląd po utworzeniu w bazie',
    notes: '',
    familyStatus: statusToFamily(item.status),
    queenHistory: [],
    mapPosition: { row: Math.floor(index / 4) + 1, column: (index % 4) + 1 }
  };
}

export async function listHives(): Promise<Hive[]> {
  const result = await apiRequest<ApiEnvelope<BackendHive[]>>('/hives');
  return unwrapData(result).map(mapBackendHive);
}

export async function createHive(input: CreateHiveRequest): Promise<Hive> {
  const result = await apiRequest<ApiEnvelope<BackendHive>>('/hives', {
    method: 'POST',
    data: input
  });
  return mapBackendHive(unwrapData(result));
}
