import { useState } from 'react';
import type { ApiaryState, HoneyPaymentMethod, HoneyType } from '../models/apiary';
import { Section } from '../components/Section';
import { StatCard } from '../components/StatCard';
import {
  HONEY_TYPES,
  JAR_SIZES,
  buildHoneyWarehouse,
  buildSalesReport,
  createBatchFromHarvest,
  createHoneyCustomer,
  createHoneyHarvest,
  createHoneyLabel,
  honeyStatusLabel,
  honeyTypeLabel,
  mixHoneyBatches,
  pourHoneyToJars,
  sellHoney
} from '../logic/honey';

interface HoneyPageProps {
  state: ApiaryState;
  onBack: () => void;
  onStateChange: (state: ApiaryState) => void;
}

type HoneyTab = 'harvests' | 'batches' | 'warehouse' | 'sales' | 'customers' | 'labels';

function today() {
  return new Date().toISOString().slice(0, 10);
}

export function HoneyPage({ state, onBack, onStateChange }: HoneyPageProps) {
  const [tab, setTab] = useState<HoneyTab>('harvests');
  const [selectedBatchId, setSelectedBatchId] = useState(state.honeyBatches?.[0]?.id ?? '');
  const warehouse = buildHoneyWarehouse(state);
  const sales = buildSalesReport(state);

  function addHarvest(form: HTMLFormElement) {
    const data = new FormData(form);
    const apiaryId = String(data.get('apiaryId') ?? '');
    const hiveIds = String(data.get('hiveIds') ?? '').split(',').map(item => item.trim()).filter(Boolean);
    const harvest = createHoneyHarvest({
      date: String(data.get('date') ?? today()),
      apiaryId,
      hiveIds,
      honeyType: data.get('honeyType') as HoneyType,
      framesCount: Number(data.get('framesCount') ?? 0),
      weightBeforeKg: Number(data.get('weightBeforeKg') ?? 0),
      weightAfterKg: Number(data.get('weightAfterKg') ?? 0),
      notes: String(data.get('notes') ?? '')
    });
    const batch = createBatchFromHarvest(harvest, state.honeyBatches ?? []);
    onStateChange({
      ...state,
      honeyHarvests: [harvest, ...(state.honeyHarvests ?? [])],
      honeyBatches: [batch, ...(state.honeyBatches ?? [])]
    });
    form.reset();
  }

  function pourSelected(form: HTMLFormElement) {
    const data = new FormData(form);
    const batch = (state.honeyBatches ?? []).find(item => item.id === selectedBatchId);
    if (!batch) return;
    const result = pourHoneyToJars(batch, Number(data.get('jarSizeGrams')), Number(data.get('jarsCount')), String(data.get('pouredAt') ?? today()));
    onStateChange({
      ...state,
      honeyBatches: (state.honeyBatches ?? []).map(item => item.id === batch.id ? result.batch : item),
      honeyJarStocks: [result.jarStock, ...(state.honeyJarStocks ?? [])]
    });
    form.reset();
  }

  function addSale(form: HTMLFormElement) {
    const data = new FormData(form);
    const newState = sellHoney(state, {
      date: String(data.get('date') ?? today()),
      customerId: String(data.get('customerId') ?? '') || undefined,
      batchId: String(data.get('batchId') ?? ''),
      jarSizeGrams: Number(data.get('jarSizeGrams')),
      jarsCount: Number(data.get('jarsCount')),
      weightKg: Math.round((Number(data.get('jarSizeGrams')) * Number(data.get('jarsCount')) / 1000) * 100) / 100,
      priceTotal: Number(data.get('priceTotal')),
      paymentMethod: data.get('paymentMethod') as HoneyPaymentMethod,
      notes: String(data.get('notes') ?? '')
    });
    onStateChange(newState);
    form.reset();
  }

  function addCustomer(form: HTMLFormElement) {
    const data = new FormData(form);
    const customer = createHoneyCustomer({
      firstName: String(data.get('firstName') ?? ''),
      lastName: String(data.get('lastName') ?? ''),
      phone: String(data.get('phone') ?? ''),
      email: String(data.get('email') ?? ''),
      notes: String(data.get('notes') ?? '')
    });
    onStateChange({ ...state, honeyCustomers: [customer, ...(state.honeyCustomers ?? [])] });
    form.reset();
  }

  function addLabel(form: HTMLFormElement) {
    const data = new FormData(form);
    const batchId = String(data.get('batchId') ?? '');
    const batch = (state.honeyBatches ?? []).find(item => item.id === batchId);
    const label = createHoneyLabel({
      batchId,
      labelName: String(data.get('labelName') ?? `Etykieta ${batch?.batchNumber ?? ''}`),
      netWeightGrams: Number(data.get('netWeightGrams')),
      qrText: `BgApiary:${batch?.batchNumber ?? batchId}`,
      pouredAt: String(data.get('pouredAt') ?? today())
    });
    onStateChange({ ...state, honeyLabels: [label, ...(state.honeyLabels ?? [])] });
    form.reset();
  }

  function createMixedBatch() {
    const sources = (state.honeyBatches ?? []).filter(batch => batch.remainingKg > 0).slice(0, 2);
    if (sources.length < 2) return;
    const mixed = mixHoneyBatches(sources, today(), state.honeyBatches ?? []);
    onStateChange({
      ...state,
      honeyBatches: [mixed, ...(state.honeyBatches ?? []).map(batch => sources.some(source => source.id === batch.id) ? { ...batch, remainingKg: 0, status: 'wyprzedana' as const } : batch)]
    });
  }

  return (
    <>
      <button className="back-button" onClick={onBack}>‹ Więcej</button>

      <section className="honey-hero">
        <div>
          <span>Miodobrania 1.7</span>
          <h1>Centrum Miodobrań</h1>
          <p>Od ula do słoika i sprzedaży. Wreszcie wiadomo, skąd pochodzi miód, ile go zostało i kto go kupił, bo pamięć ludzka bywa mniej trwała niż etykieta z długopisu.</p>
        </div>
        <div className="honey-badge">
          <strong>{warehouse.totalKg}</strong>
          <small>kg w magazynie</small>
        </div>
      </section>

      <div className="reports-kpi-grid compact">
        <StatCard label="Miodobrania" value={(state.honeyHarvests ?? []).length} />
        <StatCard label="Partie" value={(state.honeyBatches ?? []).length} />
        <StatCard label="Słoiki" value={warehouse.fullJars} />
        <StatCard label="Sprzedaż" value={`${sales.totalValue} zł`} />
      </div>

      <div className="report-tabs honey-tabs">
        {([
          ['harvests', '🍯 Miodobrania'],
          ['batches', '🏷️ Partie'],
          ['warehouse', '🫙 Magazyn'],
          ['sales', '🛒 Sprzedaż'],
          ['customers', '👤 Klienci'],
          ['labels', '🏷️ Etykiety']
        ] as Array<[HoneyTab, string]>).map(([value, label]) => (
          <button key={value} className={tab === value ? 'active' : ''} onClick={() => setTab(value)}>{label}</button>
        ))}
      </div>

      {tab === 'harvests' && (
        <>
          <Section title="Dodaj miodobranie">
            <form className="form-card" onSubmit={event => { event.preventDefault(); addHarvest(event.currentTarget); }}>
              <label>Data<input type="date" name="date" defaultValue={today()} /></label>
              <label>Pasieka<select name="apiaryId">{state.apiaries.map(apiary => <option key={apiary.id} value={apiary.id}>{apiary.name}</option>)}</select></label>
              <label>Ule źródłowe<input name="hiveIds" placeholder="id uli po przecinku lub zostaw puste dla pasieki" /></label>
              <label>Typ miodu<select name="honeyType">{HONEY_TYPES.map(type => <option key={type.value} value={type.value}>{type.label}</option>)}</select></label>
              <div className="two-cols">
                <label>Liczba ramek<input type="number" name="framesCount" defaultValue="0" /></label>
                <label>Ilość kg<input type="number" step="0.01" name="weightAfterKg" defaultValue="0" /></label>
              </div>
              <div className="two-cols">
                <label>Masa przed<input type="number" step="0.01" name="weightBeforeKg" defaultValue="0" /></label>
                <label>Uwagi<input name="notes" /></label>
              </div>
              <button className="primary full">Zapisz miodobranie i partię</button>
            </form>
          </Section>

          <Section title="Rejestr miodobrań">
            {(state.honeyHarvests ?? []).length === 0 ? <div className="empty-card">Brak miodobrań. Pszczoły jeszcze nie podpisały protokołu wydania miodu.</div> : (state.honeyHarvests ?? []).map(item => (
              <div className="card honey-card" key={item.id}>
                <strong>{item.date} · {honeyTypeLabel(item.honeyType)}</strong>
                <p>{item.weightAfterKg} kg · {item.framesCount} ramek · ule: {item.hiveIds.length || 'cała pasieka'}</p>
              </div>
            ))}
          </Section>
        </>
      )}

      {tab === 'batches' && (
        <>
          <Section title="Partie miodu">
            <button className="wide-action" disabled={(state.honeyBatches ?? []).filter(batch => batch.remainingKg > 0).length < 2} onClick={createMixedBatch}>Utwórz partię mieszaną z 2 pierwszych partii</button>
            {(state.honeyBatches ?? []).length === 0 ? <div className="empty-card">Brak partii miodu.</div> : (state.honeyBatches ?? []).map(batch => (
              <div className={`card honey-batch-card status-${batch.status}`} key={batch.id}>
                <div className="honey-card-head">
                  <strong>{batch.batchNumber}</strong>
                  <span>{honeyStatusLabel(batch.status)}</span>
                </div>
                <p>{honeyTypeLabel(batch.honeyType)} · {batch.remainingKg}/{batch.weightKg} kg · wilgotność {batch.moisturePercent}%</p>
                <div className="entry-tags">
                  <span>Źródła: {batch.sources.length}</span>
                  <span>Ule: {batch.hiveIds.length}</span>
                  {batch.mixedFromBatchIds?.length ? <span>Partia mieszana</span> : null}
                </div>
              </div>
            ))}
          </Section>
        </>
      )}

      {tab === 'warehouse' && (
        <>
          <Section title="Rozlew do słoików">
            <form className="form-card" onSubmit={event => { event.preventDefault(); pourSelected(event.currentTarget); }}>
              <label>Partia<select value={selectedBatchId} onChange={event => setSelectedBatchId(event.target.value)}>{(state.honeyBatches ?? []).map(batch => <option key={batch.id} value={batch.id}>{batch.batchNumber}</option>)}</select></label>
              <div className="two-cols">
                <label>Rozmiar słoika<select name="jarSizeGrams">{JAR_SIZES.map(size => <option key={size} value={size}>{size} g</option>)}</select></label>
                <label>Liczba słoików<input type="number" name="jarsCount" defaultValue="1" /></label>
              </div>
              <label>Data rozlania<input type="date" name="pouredAt" defaultValue={today()} /></label>
              <button className="primary full">Rozlej do słoików</button>
            </form>
          </Section>

          <Section title="Magazyn miodu">
            {(state.honeyJarStocks ?? []).length === 0 ? <div className="empty-card">Brak rozlanych słoików.</div> : (state.honeyJarStocks ?? []).map(stock => {
              const batch = (state.honeyBatches ?? []).find(item => item.id === stock.batchId);
              return (
                <div className="card jar-stock-card" key={stock.id}>
                  <strong>{batch?.batchNumber ?? 'Partia'} · {stock.jarSizeGrams} g</strong>
                  <p>Pełne: {stock.full} · zarezerwowane: {stock.reserved} · sprzedane: {stock.sold}</p>
                </div>
              );
            })}
          </Section>
        </>
      )}

      {tab === 'sales' && (
        <>
          <Section title="Dodaj sprzedaż">
            <form className="form-card" onSubmit={event => { event.preventDefault(); addSale(event.currentTarget); }}>
              <label>Data<input type="date" name="date" defaultValue={today()} /></label>
              <label>Klient<select name="customerId"><option value="">Bez klienta</option>{(state.honeyCustomers ?? []).map(c => <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>)}</select></label>
              <label>Partia<select name="batchId">{(state.honeyBatches ?? []).map(batch => <option key={batch.id} value={batch.id}>{batch.batchNumber}</option>)}</select></label>
              <div className="two-cols">
                <label>Słoik<select name="jarSizeGrams">{JAR_SIZES.map(size => <option key={size} value={size}>{size} g</option>)}</select></label>
                <label>Liczba<input type="number" name="jarsCount" defaultValue="1" /></label>
              </div>
              <div className="two-cols">
                <label>Kwota<input type="number" step="0.01" name="priceTotal" defaultValue="0" /></label>
                <label>Płatność<select name="paymentMethod"><option value="gotowka">Gotówka</option><option value="blik">BLIK</option><option value="przelew">Przelew</option><option value="karta">Karta</option><option value="inne">Inne</option></select></label>
              </div>
              <label>Uwagi<input name="notes" /></label>
              <button className="primary full">Zapisz sprzedaż</button>
            </form>
          </Section>

          <Section title="Raport sprzedaży">
            <div className="reports-kpi-grid compact">
              <StatCard label="Sprzedano" value={`${sales.totalKg} kg`} />
              <StatCard label="Słoiki" value={sales.jars} />
              <StatCard label="Wartość" value={`${sales.totalValue} zł`} />
              <StatCard label="Cena/kg" value={`${sales.averagePricePerKg} zł`} />
            </div>
          </Section>
        </>
      )}

      {tab === 'customers' && (
        <>
          <Section title="Dodaj klienta">
            <form className="form-card" onSubmit={event => { event.preventDefault(); addCustomer(event.currentTarget); }}>
              <div className="two-cols">
                <label>Imię<input name="firstName" required /></label>
                <label>Nazwisko<input name="lastName" /></label>
              </div>
              <div className="two-cols">
                <label>Telefon<input name="phone" /></label>
                <label>Email<input name="email" /></label>
              </div>
              <label>Notatki<textarea name="notes" /></label>
              <button className="primary full">Zapisz klienta</button>
            </form>
          </Section>
          <Section title="Klienci">
            {(state.honeyCustomers ?? []).length === 0 ? <div className="empty-card">Brak klientów.</div> : (state.honeyCustomers ?? []).map(c => (
              <div className="card honey-card" key={c.id}>
                <strong>{c.firstName} {c.lastName}</strong>
                <p>{c.phone} · {c.email}</p>
              </div>
            ))}
          </Section>
        </>
      )}

      {tab === 'labels' && (
        <>
          <Section title="Generator etykiet">
            <form className="form-card" onSubmit={event => { event.preventDefault(); addLabel(event.currentTarget); }}>
              <label>Partia<select name="batchId">{(state.honeyBatches ?? []).map(batch => <option key={batch.id} value={batch.id}>{batch.batchNumber}</option>)}</select></label>
              <label>Nazwa etykiety<input name="labelName" placeholder="np. Pasieka BGS - Lipa" /></label>
              <div className="two-cols">
                <label>Masa netto<select name="netWeightGrams">{JAR_SIZES.map(size => <option key={size} value={size}>{size} g</option>)}</select></label>
                <label>Data rozlania<input type="date" name="pouredAt" defaultValue={today()} /></label>
              </div>
              <button className="primary full">Utwórz etykietę</button>
            </form>
          </Section>
          <Section title="Etykiety">
            {(state.honeyLabels ?? []).length === 0 ? <div className="empty-card">Brak etykiet.</div> : (state.honeyLabels ?? []).map(label => (
              <div className="card honey-label-card" key={label.id}>
                <strong>{label.labelName}</strong>
                <p>{label.netWeightGrams} g · QR: {label.qrText}</p>
              </div>
            ))}
          </Section>
        </>
      )}
    </>
  );
}
