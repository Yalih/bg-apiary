import { apiRequest, unwrapData, type ApiEnvelope } from './apiClient';
import type { Apiary } from '../models/apiary';

export interface BackendApiary {
  id: string;
  name: string;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  _count?: { hives?: number };
}

export interface CreateApiaryRequest {
  name: string;
  address?: string;
  latitude?: number;
  longitude?: number;
}

export function mapBackendApiary(item: BackendApiary): Apiary {
  return {
    id: item.id,
    name: item.name,
    location: item.address ?? 'Brak lokalizacji',
    description: item._count?.hives ? `${item._count.hives} uli w pasiece` : 'Pasieka z bazy danych PostgreSQL',
    imageEmoji: '🐝',
    locationName: item.address ?? undefined,
    latitude: item.latitude ?? undefined,
    longitude: item.longitude ?? undefined
  };
}

export async function listApiaries(): Promise<Apiary[]> {
  const result = await apiRequest<ApiEnvelope<BackendApiary[]>>('/apiaries');
  return unwrapData(result).map(mapBackendApiary);
}

export async function createApiary(input: CreateApiaryRequest): Promise<Apiary> {
  const result = await apiRequest<ApiEnvelope<BackendApiary>>('/apiaries', {
    method: 'POST',
    data: input
  });
  return mapBackendApiary(unwrapData(result));
}
