export interface UserDto {
  id: string;
  email: string;
  displayName: string;
  role: 'ADMIN' | 'BEEKEEPER' | 'OBSERVER';
}

export interface ApiaryDto {
  id: string;
  ownerId: string;
  name: string;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface HiveDto {
  id: string;
  apiaryId: string;
  hiveNumber: string;
  hiveType: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ErrorModel {
  message: string;
  code?: string;
  statusCode: number;
}
