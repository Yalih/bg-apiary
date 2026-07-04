import type {
  ApiaryState,
  HoneyBatch,
  HoneyBatchSource,
  HoneyBatchStatus,
  HoneyCustomer,
  HoneyHarvest,
  HoneyJarStock,
  HoneyLabel,
  HoneyPaymentMethod,
  HoneySale,
  HoneyType
} from '../models/apiary';

export const HONEY_TYPES: Array<{ value: HoneyType; label: string; color: string }> = [
  { value: 'rzepakowy', label: 'Rzepakowy', color: 'jasny' },
  { value: 'akacjowy', label: 'Akacjowy', color: 'jasnozłoty' },
  { value: 'lipowy', label: 'Lipowy', color: 'złoty' },
  { value: 'wielokwiatowy', label: 'Wielokwiatowy', color: 'bursztynowy' },
  { value: 'gryczany', label: 'Gryczany', color: 'ciemny' },
  { value: 'spadziowy', label: 'Spadziowy', color: 'ciemny bursztyn' },
  { value: 'nawłociowy', label: 'Nawłociowy', color: 'żółty' },
  { value: 'faceliowy', label: 'Faceliowy', color: 'jasny bursztyn' },
  { value: 'wrzosowy', label: 'Wrzosowy', color: 'czerwonawy' },
  { value: 'inny', label: 'Inny', color: 'miodowy' }
];

export const JAR_SIZES = [250, 400, 500, 720, 900];

export function honeyTypeLabel(type: HoneyType): string {
  return HONEY_TYPES.find(item => item.value === type)?.label ?? 'Inny';
}

export function honeyStatusLabel(status: HoneyBatchStatus): string {
  return {
    do_rozlania: 'Do rozlania',
    gotowa: 'Gotowa',
    w_sprzedazy: 'W sprzedaży',
    wyprzedana: 'Wyprzedana'
  }[status];
}

export function paymentLabel(method: HoneyPaymentMethod): string {
  return {
    gotowka: 'Gotówka',
    blik: 'BLIK',
    przelew: 'Przelew',
    karta: 'Karta',
    inne: 'Inne'
  }[method];
}

export function generateBatchNumber(existing: HoneyBatch[], date = new Date()): string {
  const year = date.getFullYear();
  const count = existing.filter(batch => batch.batchNumber.includes(`BG-${year}-`)).length + 1;
  return `BG-${year}-${String(count).padStart(3, '0')}`;
}

export function createHoneyHarvest(input: Omit<HoneyHarvest, 'id'>): HoneyHarvest {
  return { id: `honey-harvest-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, ...input };
}

export function createHoneyBatch(input: Omit<HoneyBatch, 'id' | 'batchNumber' | 'remainingKg' | 'status'>, existing: HoneyBatch[]): HoneyBatch {
  return {
    id: `honey-batch-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    batchNumber: generateBatchNumber(existing, new Date(`${input.date}T12:00:00`)),
    remainingKg: input.weightKg,
    status: 'do_rozlania',
    ...input
  };
}

export function createBatchFromHarvest(harvest: HoneyHarvest, existing: HoneyBatch[]): HoneyBatch {
  const sources: HoneyBatchSource[] = harvest.hiveIds.map(hiveId => ({
    harvestId: harvest.id,
    hiveId,
    apiaryId: harvest.apiaryId,
    weightKg: Math.round((harvest.weightAfterKg / Math.max(1, harvest.hiveIds.length)) * 100) / 100,
    sharePercent: Math.round((100 / Math.max(1, harvest.hiveIds.length)) * 100) / 100
  }));

  return createHoneyBatch({
    date: harvest.date,
    apiaryId: harvest.apiaryId,
    hiveIds: harvest.hiveIds,
    honeyType: harvest.honeyType,
    color: HONEY_TYPES.find(type => type.value === harvest.honeyType)?.color ?? 'miodowy',
    weightKg: harvest.weightAfterKg,
    moisturePercent: 18,
    location: 'magazyn miodu',
    notes: harvest.notes,
    sources
  }, existing);
}

export function pourHoneyToJars(batch: HoneyBatch, jarSizeGrams: number, jarsCount: number, pouredAt: string): { batch: HoneyBatch; jarStock: HoneyJarStock } {
  const usedKg = Math.round((jarSizeGrams * jarsCount / 1000) * 100) / 100;
  const remainingKg = Math.max(0, Math.round((batch.remainingKg - usedKg) * 100) / 100);
  return {
    batch: {
      ...batch,
      remainingKg,
      status: remainingKg === 0 ? 'gotowa' : batch.status === 'do_rozlania' ? 'gotowa' : batch.status
    },
    jarStock: {
      id: `honey-jar-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      batchId: batch.id,
      jarSizeGrams,
      full: jarsCount,
      reserved: 0,
      sold: 0,
      pouredAt
    }
  };
}

export function sellHoney(state: ApiaryState, sale: Omit<HoneySale, 'id'>): ApiaryState {
  const id = `honey-sale-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const saleWithId: HoneySale = { id, ...sale };
  let updatedJarStocks = state.honeyJarStocks ?? [];
  let remainingToSell = sale.jarsCount;

  updatedJarStocks = updatedJarStocks.map(stock => {
    if (stock.batchId !== sale.batchId || stock.jarSizeGrams !== sale.jarSizeGrams || remainingToSell <= 0) return stock;
    const available = Math.max(0, stock.full - stock.reserved - stock.sold);
    const soldNow = Math.min(available, remainingToSell);
    remainingToSell -= soldNow;
    return { ...stock, sold: stock.sold + soldNow };
  });

  const updatedBatches = (state.honeyBatches ?? []).map(batch => {
    if (batch.id !== sale.batchId) return batch;
    const remainingJars = updatedJarStocks.filter(stock => stock.batchId === sale.batchId).reduce((sum, stock) => sum + Math.max(0, stock.full - stock.reserved - stock.sold), 0);
    return { ...batch, status: (remainingJars === 0 && batch.remainingKg === 0 ? 'wyprzedana' : 'w_sprzedazy') as HoneyBatchStatus };
  });

  return {
    ...state,
    honeySales: [saleWithId, ...(state.honeySales ?? [])],
    honeyJarStocks: updatedJarStocks,
    honeyBatches: updatedBatches
  };
}

export function createHoneyCustomer(input: Omit<HoneyCustomer, 'id' | 'createdAt'>): HoneyCustomer {
  return {
    id: `honey-customer-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    ...input
  };
}

export function createHoneyLabel(input: Omit<HoneyLabel, 'id' | 'createdAt'>): HoneyLabel {
  return {
    id: `honey-label-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    ...input
  };
}

export function mixHoneyBatches(sourceBatches: HoneyBatch[], date: string, existing: HoneyBatch[]): HoneyBatch {
  const total = Math.round(sourceBatches.reduce((sum, batch) => sum + batch.remainingKg, 0) * 100) / 100;
  const hiveIds = [...new Set(sourceBatches.flatMap(batch => batch.hiveIds))];
  const sources: HoneyBatchSource[] = sourceBatches.map(batch => ({
    batchId: batch.id,
    apiaryId: batch.apiaryId,
    weightKg: batch.remainingKg,
    sharePercent: total === 0 ? 0 : Math.round((batch.remainingKg / total) * 10000) / 100
  }));

  return createHoneyBatch({
    date,
    apiaryId: sourceBatches[0]?.apiaryId,
    hiveIds,
    honeyType: sourceBatches[0]?.honeyType ?? 'inny',
    color: sourceBatches[0]?.color ?? 'miodowy',
    weightKg: total,
    moisturePercent: sourceBatches.length ? Math.round((sourceBatches.reduce((sum, batch) => sum + batch.moisturePercent, 0) / sourceBatches.length) * 10) / 10 : 18,
    location: 'magazyn miodu',
    notes: 'Partia mieszana',
    sources,
    mixedFromBatchIds: sourceBatches.map(batch => batch.id)
  }, existing);
}

export function buildHoneyWarehouse(state: ApiaryState) {
  const batches = state.honeyBatches ?? [];
  const jars = state.honeyJarStocks ?? [];
  const totalKg = Math.round(batches.reduce((sum, batch) => sum + batch.remainingKg, 0) * 100) / 100;
  const fullJars = jars.reduce((sum, stock) => sum + Math.max(0, stock.full - stock.reserved - stock.sold), 0);
  return {
    totalKg,
    fullJars,
    batchesCount: batches.length,
    readyBatches: batches.filter(batch => batch.status === 'gotowa' || batch.status === 'w_sprzedazy').length
  };
}

export function buildSalesReport(state: ApiaryState) {
  const sales = state.honeySales ?? [];
  const totalValue = Math.round(sales.reduce((sum, sale) => sum + sale.priceTotal, 0) * 100) / 100;
  const totalKg = Math.round(sales.reduce((sum, sale) => sum + sale.weightKg, 0) * 100) / 100;
  const jars = sales.reduce((sum, sale) => sum + sale.jarsCount, 0);
  const averagePricePerKg = totalKg === 0 ? 0 : Math.round((totalValue / totalKg) * 100) / 100;
  const typeSales = sales.reduce<Record<string, number>>((acc, sale) => {
    const batch = (state.honeyBatches ?? []).find(item => item.id === sale.batchId);
    const type = batch?.honeyType ?? 'inny';
    acc[type] = (acc[type] ?? 0) + sale.weightKg;
    return acc;
  }, {});
  const bestType = Object.entries(typeSales).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'brak';

  return {
    totalValue,
    totalKg,
    jars,
    averagePricePerKg,
    bestType,
    salesCount: sales.length
  };
}

export function buildCustomerHistory(state: ApiaryState, customerId: string) {
  return (state.honeySales ?? []).filter(sale => sale.customerId === customerId);
}
