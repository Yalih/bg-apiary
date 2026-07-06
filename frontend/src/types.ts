export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export type Apiary = {
  id: string;
  name: string;
  location?: string | null;
  description?: string | null;
  status: string;
};

export type HiveStatus = 'OK' | 'OBSERVE' | 'ACTION' | 'UNKNOWN' | 'INACTIVE';

export type Hive = {
  id: string;
  apiaryId: string;
  name: string;
  hiveType?: string | null;
  status: HiveStatus;
  strength?: number | null;
  lastInspectionAt?: string | null;
  notes?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type Queen = {
  id: string;
  hiveId?: string | null;
  name?: string | null;
  line?: string | null;
  race?: string | null;
  year?: number | null;
  markingColor?: string | null;
  status: string;
  layingRating?: number | null;
};

export type Inspection = {
  id: string;
  hiveId: string;
  inspectedAt: string;
  mood?: string | null;
  strength?: number | null;
  queenSeen?: boolean | null;
  eggs?: boolean | null;
  openBrood?: boolean | null;
  cappedBrood?: boolean | null;
  foodLevel?: string | null;
  pollenLevel?: string | null;
  queenCells?: number | null;
  framesAdded?: number | null;
  framesRemoved?: number | null;
  note?: string | null;
};

export type Feeding = {
  id: string;
  hiveId: string;
  fedAt: string;
  type: string;
  amount?: number | null;
  unit?: string | null;
  purpose?: string | null;
  note?: string | null;
};

export type Treatment = {
  id: string;
  hiveId: string;
  treatedAt: string;
  product: string;
  dose?: string | null;
  method?: string | null;
  stage?: string | null;
  nextCheckAt?: string | null;
  note?: string | null;
};

export type Task = {
  id: string;
  hiveId?: string | null;
  title: string;
  description?: string | null;
  dueAt?: string | null;
  priority: string;
  status: string;
  source?: string | null;
};

export type Note = {
  id: string;
  hiveId?: string | null;
  title?: string | null;
  body: string;
  context?: string | null;
  createdAt: string;
};

export type ResourceName = 'apiaries' | 'hives' | 'queens' | 'inspections' | 'feedings' | 'treatments' | 'tasks' | 'notes' | 'photos';
