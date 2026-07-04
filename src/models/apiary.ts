export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'open' | 'in_progress' | 'done' | 'cancelled';
export type TaskType = 'inspection' | 'feeding' | 'queen' | 'treatment' | 'expansion' | 'harvest' | 'wintering' | 'note' | 'other';
export type WorkCategory = 'inspection' | 'feeding' | 'queen' | 'expansion' | 'treatment' | 'harvest' | 'wintering' | 'split' | 'note' | 'other';
export type TaskTargetAction = 'open_hive' | 'inspection' | 'feeding' | 'note' | 'queen_replacement';
export type HiveCondition = 'ok' | 'attention' | 'urgent';

export type FamilyStatus =
  | 'development'
  | 'production'
  | 'strong'
  | 'medium'
  | 'weak'
  | 'queenless'
  | 'suspected_queenless'
  | 'queen_replacement'
  | 'swarm_risk'
  | 'after_swarm'
  | 'combine'
  | 'sick'
  | 'robbery'
  | 'wintering';

export type QueenStatus =
  | 'mated'
  | 'unmated'
  | 'caged'
  | 'released'
  | 'observation'
  | 'accepted'
  | 'rejected'
  | 'queenless'
  | 'suspected_lost'
  | 'to_check'
  | 'to_replace'
  | 'replaced';

export interface Apiary {
  id: string;
  name: string;
  location: string;
  description: string;
  imageEmoji: string;
  locationName?: string;
  latitude?: number;
  longitude?: number;
}

export interface Queen {
  introducedAt: string;
  breed: string;
  line: string;
  year: number;
  status?: QueenStatus;
  origin?: string;
  breeder?: string;
  marked?: boolean;
  clippedWing?: boolean;
  acceptanceStatus?: QueenStatus;
  lastControlAt?: string;
  rating?: QueenRating;
}

export interface QueenHistoryEntry {
  id: string;
  hiveId: string;
  introducedAt: string;
  replacedAt: string;
  breed: string;
  line: string;
  year: number;
  status: QueenStatus;
  origin: string;
  marked: boolean;
  clippedWing: boolean;
  replacementReason: string;
  note: string;
}

export interface QueenRating {
  brood: number;
  calmness: number;
  development: number;
  swarmTendency: number;
  honeyPotential: number;
  gentleness: number;
  overall: number;
  note: string;
  date: string;
}

export interface QueenControl {
  id: string;
  hiveId: string;
  queenKey: string;
  date: string;
  controlType: '3d' | '7d' | '14d' | '30d' | 'manual';
  status: QueenStatus;
  eggsSeen: boolean;
  broodSeen: boolean;
  queenSeen: boolean;
  note: string;
}

export interface MapPosition {
  row: number;
  column: number;
}

export interface Hive {
  id: string;
  apiaryId: string;
  number: number;
  name: string;
  type: string;
  frameCount: number;
  strength: number;
  mood: 'spokojna' | 'normalna' | 'nerwowa';
  foodLevel: 'niski' | 'średni' | 'dobry';
  queen: Queen;
  familyStatus?: FamilyStatus;
  mapPosition?: MapPosition;
  queenHistory?: QueenHistoryEntry[];
  lastInspectionAt: string;
  nextAction: string;
  notes: string;
}

export interface Inspection {
  id: string;
  hiveId: string;
  date: string;
  summary: string;
  brood: string;
  queenSeen: boolean;
  eggs: boolean;
  larvae: boolean;
  cappedBrood: boolean;
  cells: number;
  strength: number;
  mood: Hive['mood'];
  foodLevel: Hive['foodLevel'];
  frameCount: number;
}

export interface Feeding {
  id: string;
  hiveId: string;
  date: string;
  type: string;
  amountLiters: number;
  unit: 'l' | 'kg';
  reason: string;
  note: string;
}

export interface HiveNote {
  id: string;
  hiveId: string;
  date: string;
  text: string;
}

export type PhotoLinkedType = 'hive' | 'inspection';

export interface HivePhoto {
  id: string;
  hiveId: string;
  linkedType: PhotoLinkedType;
  linkedId?: string;
  date: string;
  title: string;
  description: string;
  dataUrl: string;
}

export interface HiveEvent {
  id: string;
  hiveId: string;
  date: string;
  type: 'created' | 'inspection' | 'feeding' | 'note' | 'task' | 'status' | 'queen_replacement' | 'decision';
  title: string;
  details: string;
}

export interface DecisionEvent {
  id: string;
  hiveId: string;
  date: string;
  action: string;
  reason: string;
  expectedEffect: string;
  checkNeeded: boolean;
  checkDate?: string;
}

export interface Task {
  id: string;
  hiveId: string;
  apiaryId: string;
  title: string;
  dueDate: string;
  priority: Priority;
  status: TaskStatus;
  type: TaskType;
  workCategory?: WorkCategory;
  description: string;
  createdAt: string;
  completedAt?: string;
  targetAction: TaskTargetAction;
  reminderAt?: string;
  source?: 'manual' | 'automatic' | 'seasonal';
}

export interface WorkTourProgress {
  id: string;
  date: string;
  apiaryId?: string;
  taskIds: string[];
  completedTaskIds: string[];
  currentHiveId?: string;
  startedAt: string;
  updatedAt: string;
}


export type InventoryCategory = 'frames' | 'boxes' | 'food' | 'medicine' | 'queens' | 'splits' | 'equipment';
export type InventoryUnit = 'pcs' | 'kg' | 'l' | 'pack' | 'set';
export type InventoryStatus = 'ok' | 'low' | 'missing';
export type InventoryMovementType = 'in' | 'out' | 'adjustment' | 'reserved';

export interface InventoryItem {
  id: string;
  category: InventoryCategory;
  name: string;
  description: string;
  quantity: number;
  unit: InventoryUnit;
  minQuantity: number;
  optimalQuantity: number;
  location: string;
  supplier?: string;
  batchNumber?: string;
  expiryDate?: string;
  purchasePrice?: number;
  purchaseDate?: string;
  invoiceNumber?: string;
  linkedHiveId?: string;
  linkedApiaryId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryMovement {
  id: string;
  itemId: string;
  date: string;
  type: InventoryMovementType;
  quantity: number;
  reason: string;
  hiveId?: string;
  apiaryId?: string;
  taskId?: string;
  note: string;
}


export type HoneyType =
  | 'rzepakowy'
  | 'akacjowy'
  | 'lipowy'
  | 'wielokwiatowy'
  | 'gryczany'
  | 'spadziowy'
  | 'nawłociowy'
  | 'faceliowy'
  | 'wrzosowy'
  | 'inny';

export type HoneyBatchStatus = 'do_rozlania' | 'gotowa' | 'w_sprzedazy' | 'wyprzedana';
export type HoneyPaymentMethod = 'gotowka' | 'blik' | 'przelew' | 'karta' | 'inne';

export interface HoneyHarvest {
  id: string;
  date: string;
  apiaryId: string;
  hiveIds: string[];
  honeyType: HoneyType;
  framesCount: number;
  weightBeforeKg: number;
  weightAfterKg: number;
  notes: string;
}

export interface HoneyBatchSource {
  harvestId?: string;
  batchId?: string;
  hiveId?: string;
  apiaryId?: string;
  weightKg: number;
  sharePercent?: number;
}

export interface HoneyBatch {
  id: string;
  batchNumber: string;
  date: string;
  apiaryId?: string;
  hiveIds: string[];
  honeyType: HoneyType;
  color: string;
  weightKg: number;
  remainingKg: number;
  moisturePercent: number;
  status: HoneyBatchStatus;
  location: string;
  notes: string;
  sources: HoneyBatchSource[];
  mixedFromBatchIds?: string[];
}

export interface HoneyJarStock {
  id: string;
  batchId: string;
  jarSizeGrams: number;
  full: number;
  reserved: number;
  sold: number;
  pouredAt: string;
}

export interface HoneyCustomer {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  notes: string;
  createdAt: string;
}

export interface HoneySale {
  id: string;
  date: string;
  customerId?: string;
  batchId: string;
  jarSizeGrams: number;
  jarsCount: number;
  weightKg: number;
  priceTotal: number;
  paymentMethod: HoneyPaymentMethod;
  notes: string;
}

export interface HoneyLabel {
  id: string;
  batchId: string;
  labelName: string;
  netWeightGrams: number;
  qrText: string;
  pouredAt: string;
  createdAt: string;
}


export type VarroaTestMethod = 'osyp' | 'cukier_puder' | 'alkohol' | 'co2' | 'inna';
export type HealthRiskLevel = 'ok' | 'obserwacja' | 'wysokie' | 'krytyczne';
export type TreatmentStatus = 'planowane' | 'w_trakcie' | 'zakonczone';
export type QuarantineStatus = 'brak' | 'obserwacja' | 'kwarantanna';

export interface VarroaMeasurement {
  id: string;
  hiveId: string;
  date: string;
  method: VarroaTestMethod;
  miteCount: number;
  beesSampleCount?: number;
  daysCount?: number;
  infestationPercent: number;
  riskLevel: HealthRiskLevel;
  notes: string;
}

export interface TreatmentRecord {
  id: string;
  hiveId: string;
  date: string;
  preparation: string;
  producer: string;
  activeSubstance: string;
  dose: number;
  unit: string;
  quantity: number;
  batchNumber: string;
  reason: string;
  nextControlDate?: string;
  status: TreatmentStatus;
  inventoryItemId?: string;
  notes: string;
}

export interface HealthCheck {
  id: string;
  hiveId: string;
  date: string;
  type: 'kontrola' | 'badanie' | 'po_leczeniu';
  result: HealthRiskLevel;
  notes: string;
}

export interface HiveTransfer {
  id: string;
  hiveId: string;
  fromApiaryId: string;
  toApiaryId: string;
  date: string;
  reason: string;
  notes: string;
  queenSnapshot: Queen;
  strengthSnapshot: number;
}

export interface HiveQuarantine {
  hiveId: string;
  status: QuarantineStatus;
  since: string;
  reason: string;
  notes: string;
}


export type SeasonTemplateType = 'amatorska' | 'towarowa' | 'produkcja_matek' | 'odklady' | 'wedrowna' | 'wlasny';
export type SeasonScenario = 'produkcja_miodu' | 'rozwoj_rodzin' | 'odklady' | 'hodowla_matek';
export type SeasonWorkStatus = 'planowane' | 'wykonane' | 'zalegle' | 'anulowane';
export type SeasonGoalType = 'rodziny' | 'miod_kg' | 'matki' | 'odklady' | 'sprzedaz' | 'sprzet';

export interface WeatherWindow {
  minTempC?: number;
  maxTempC?: number;
  noRain?: boolean;
  maxWindKmh?: number;
  note: string;
}

export interface SeasonPlanItem {
  id: string;
  month: number;
  title: string;
  description: string;
  category: TaskType;
  priority: Priority;
  status: SeasonWorkStatus;
  apiaryId?: string;
  hiveId?: string;
  checklist: Array<{ id: string; label: string; done: boolean }>;
  dueDate: string;
  reminderOffsets: number[];
  weatherWindow?: WeatherWindow;
  scenario?: SeasonScenario;
}

export interface SeasonGoal {
  id: string;
  type: SeasonGoalType;
  title: string;
  planned: number;
  current: number;
  unit: string;
  apiaryId?: string;
}

export interface NectarFlow {
  id: string;
  apiaryId: string;
  name: string;
  startDate: string;
  endDate: string;
  expectedStrength: 'slaby' | 'sredni' | 'mocny';
  notes: string;
}

export interface SeasonComparison {
  year: number;
  completionPercent: number;
  honeyKg: number;
  families: number;
  salesValue: number;
}

export interface SeasonPlan {
  id: string;
  year: number;
  templateType: SeasonTemplateType;
  scenario: SeasonScenario;
  createdAt: string;
  items: SeasonPlanItem[];
  goals: SeasonGoal[];
  nectarFlows: NectarFlow[];
  previousSeasons: SeasonComparison[];
}

export type AuthProvider = 'email' | 'google' | 'apple';
export type CloudAccountStatus = 'local_ready' | 'email_pending' | 'active' | 'disabled';
export type SyncEntityType = 'apiary' | 'hive' | 'task' | 'inspection' | 'feeding' | 'note' | 'photo' | 'inventory' | 'honey' | 'health' | 'season' | 'settings';
export type SyncOperation = 'create' | 'update' | 'delete';
export type SyncStatus = 'idle' | 'pending' | 'syncing' | 'conflict' | 'error' | 'synced';
export type SharedRole = 'administrator' | 'manager' | 'pracownik' | 'obserwator';
export type PermissionAction = 'read' | 'write' | 'delete';
export type PermissionModule = 'apiaries' | 'hives' | 'tasks' | 'reports' | 'inventory' | 'honey' | 'health' | 'season' | 'assistant' | 'backup' | 'sharing';
export type AuditAction = 'create' | 'update' | 'delete' | 'restore' | 'sync' | 'share' | 'login';
export type RecommendationPriority = 'critical' | 'high' | 'medium' | 'low';
export type PredictionType = 'strength' | 'swarm' | 'feeding' | 'queen' | 'health' | 'harvest';
export type PhotoTag = 'ramki' | 'matka' | 'czerw' | 'pylek' | 'warroza' | 'miod';

export interface CloudUserProfile {
  id: string;
  email: string;
  displayName: string;
  provider: AuthProvider;
  status: CloudAccountStatus;
  emailVerified: boolean;
  passwordResetReady: boolean;
  googleReady: boolean;
  appleReady: boolean;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SyncQueueItem {
  id: string;
  entityType: SyncEntityType;
  entityId: string;
  operation: SyncOperation;
  payload: unknown;
  createdAt: string;
  status: SyncStatus;
  retryCount: number;
}

export interface SyncHistoryItem {
  id: string;
  date: string;
  status: SyncStatus;
  changesCount: number;
  conflictsCount: number;
  message: string;
}

export interface SyncConflict {
  id: string;
  entityType: SyncEntityType;
  entityId: string;
  localVersion: unknown;
  remoteVersion: unknown;
  detectedAt: string;
  resolvedAt?: string;
  resolution?: 'local' | 'remote' | 'merge';
}

export interface SharedApiaryMember {
  id: string;
  apiaryId: string;
  userEmail: string;
  role: SharedRole;
  invitedAt: string;
  acceptedAt?: string;
  status: 'zaproszony' | 'aktywny' | 'usuniety';
}

export interface PermissionRule {
  role: SharedRole;
  module: PermissionModule;
  actions: PermissionAction[];
}

export interface AuditLogEntry {
  id: string;
  userId: string;
  userEmail: string;
  action: AuditAction;
  entityType: SyncEntityType;
  entityId: string;
  date: string;
  summary: string;
  before?: unknown;
  after?: unknown;
}

export interface DataVersion {
  id: string;
  entityType: SyncEntityType;
  entityId: string;
  version: number;
  createdAt: string;
  createdBy: string;
  snapshot: unknown;
}

export interface ColonyScore {
  hiveId: string;
  score: number;
  risk: RecommendationPriority;
  reasons: string[];
}

export interface HiveAIProfile {
  hiveId: string;
  strengthTrend: 'rosnie' | 'stabilna' | 'spada';
  queenQuality: number;
  healthRisk: number;
  productivity: number;
  lastUpdatedAt: string;
}

export interface Recommendation {
  id: string;
  hiveId?: string;
  apiaryId?: string;
  priority: RecommendationPriority;
  title: string;
  message: string;
  actionType: TaskType;
  dueDate?: string;
  source: 'rules' | 'assistant';
}

export interface Prediction {
  id: string;
  hiveId: string;
  type: PredictionType;
  date: string;
  horizonDays: number;
  probability: number;
  value: string;
  reason: string;
}

export interface PhotoAnalysis {
  id: string;
  photoId: string;
  hiveId?: string;
  date: string;
  tags: PhotoTag[];
  framesDetected?: number;
  queenVisible?: boolean;
  broodVisible?: boolean;
  pollenVisible?: boolean;
  varroaSuspicion?: boolean;
  honeyVisible?: boolean;
  notes: string;
}
export interface ApiaryState {
  apiaries: Apiary[];
  hives: Hive[];
  inspections: Inspection[];
  feedings: Feeding[];
  events: HiveEvent[];
  decisionEvents?: DecisionEvent[];
  queenControls?: QueenControl[];
  workTours?: WorkTourProgress[];
  workPreferences?: {
    lastWorkFilter?: string;
    lastSearchQuery?: string;
  };
  notes: HiveNote[];
  photos: HivePhoto[];
  tasks: Task[];
  inventoryItems?: InventoryItem[];
  inventoryMovements?: InventoryMovement[];
  honeyHarvests?: HoneyHarvest[];
  honeyBatches?: HoneyBatch[];
  honeyJarStocks?: HoneyJarStock[];
  honeyCustomers?: HoneyCustomer[];
  honeySales?: HoneySale[];
  honeyLabels?: HoneyLabel[];
  varroaMeasurements?: VarroaMeasurement[];
  treatments?: TreatmentRecord[];
  healthChecks?: HealthCheck[];
  hiveTransfers?: HiveTransfer[];
  hiveQuarantines?: HiveQuarantine[];
  seasonPlans?: SeasonPlan[];
  cloudProfile?: CloudUserProfile;
  syncQueue?: SyncQueueItem[];
  syncHistory?: SyncHistoryItem[];
  syncConflicts?: SyncConflict[];
  sharedMembers?: SharedApiaryMember[];
  permissionRules?: PermissionRule[];
  auditLog?: AuditLogEntry[];
  dataVersions?: DataVersion[];
  hiveAIProfiles?: HiveAIProfile[];
  colonyScores?: ColonyScore[];
  recommendations20?: Recommendation[];
  predictions?: Prediction[];
  photoAnalyses?: PhotoAnalysis[];
  lastOpenedHiveId?: string;
}
