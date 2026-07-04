import { useState } from 'react';
import type { ApiaryState, QuarantineStatus, TreatmentStatus, VarroaTestMethod } from '../models/apiary';
import { Section } from '../components/Section';
import { StatCard } from '../components/StatCard';
import { addInventoryMovement } from '../logic/inventory';
import {
  MEDICINE_PREPARATIONS,
  buildHealthAlerts,
  buildHealthReport,
  createTreatment,
  createVarroaMeasurement,
  riskLabel,
  setHiveQuarantine,
  transferHive,
  treatmentToInventoryMovement
} from '../logic/health';

interface HealthPageProps {
  state: ApiaryState;
  onBack: () => void;
  onStateChange: (state: ApiaryState) => void;
}

type HealthTab = 'warroza' | 'leczenie' | 'alerty' | 'przenosiny' | 'raport';

function today() {
  return new Date().toISOString().slice(0, 10);
}

export function HealthPage({ state, onBack, onStateChange }: HealthPageProps) {
  const [tab, setTab] = useState<HealthTab>('warroza');
  const report = buildHealthReport(state);
  const alerts = buildHealthAlerts(state);

  function addVarroa(form: HTMLFormElement) {
    const data = new FormData(form);
    const measurement = createVarroaMeasurement({
      hiveId: String(data.get('hiveId') ?? ''),
      date: String(data.get('date') ?? today()),
      method: data.get('method') as VarroaTestMethod,
      miteCount: Number(data.get('miteCount') ?? 0),
      beesSampleCount: Number(data.get('beesSampleCount') ?? 300),
      daysCount: Number(data.get('daysCount') ?? 1),
      notes: String(data.get('notes') ?? '')
    });
    onStateChange({ ...state, varroaMeasurements: [measurement, ...(state.varroaMeasurements ?? [])] });
    form.reset();
  }

  function addTreatment(form: HTMLFormElement) {
    const data = new FormData(form);
    const treatment = createTreatment({
      hiveId: String(data.get('hiveId') ?? ''),
      date: String(data.get('date') ?? today()),
      preparation: String(data.get('preparation') ?? ''),
      producer: String(data.get('producer') ?? ''),
      activeSubstance: String(data.get('activeSubstance') ?? ''),
      dose: Number(data.get('dose') ?? 0),
      unit: String(data.get('unit') ?? ''),
      quantity: Number(data.get('quantity') ?? 0),
      batchNumber: String(data.get('batchNumber') ?? ''),
      reason: String(data.get('reason') ?? ''),
      nextControlDate: String(data.get('nextControlDate') ?? ''),
      status: data.get('status') as TreatmentStatus,
      inventoryItemId: String(data.get('inventoryItemId') ?? '') || undefined,
      notes: String(data.get('notes') ?? '')
    });
    let nextState: ApiaryState = { ...state, treatments: [treatment, ...(state.treatments ?? [])] };
    const movement = treatmentToInventoryMovement(treatment);
    if (movement) nextState = addInventoryMovement(nextState, movement);
    onStateChange(nextState);
    form.reset();
  }

  function addTransfer(form: HTMLFormElement) {
    const data = new FormData(form);
    const hiveId = String(data.get('hiveId') ?? '');
    const hive = state.hives.find(item => item.id === hiveId);
    if (!hive) return;
    onStateChange(transferHive(state, {
      hiveId,
      fromApiaryId: hive.apiaryId,
      toApiaryId: String(data.get('toApiaryId') ?? ''),
      date: String(data.get('date') ?? today()),
      reason: String(data.get('reason') ?? ''),
      notes: String(data.get('notes') ?? '')
    }));
    form.reset();
  }

  function addQuarantine(form: HTMLFormElement) {
    const data = new FormData(form);
    onStateChange(setHiveQuarantine(
      state,
      String(data.get('hiveId') ?? ''),
      data.get('status') as QuarantineStatus,
      String(data.get('reason') ?? ''),
      String(data.get('notes') ?? '')
    ));
    form.reset();
  }

  return (
    <>
      <button className="back-button" onClick={onBack}>‹ Więcej</button>

      <section className="health-hero">
        <div>
          <span>Zdrowie 1.8</span>
          <h1>Centrum Zdrowia Pasieki</h1>
          <p>Warroza, leczenie, kontrole, alerty i przenoszenie uli. Bo rodzina pszczela to nie tylko miód, tylko też regularny przegląd biologicznej rzeczywistości.</p>
        </div>
        <div className="health-badge">
          <strong>{report.alerts}</strong>
          <small>alerty</small>
        </div>
      </section>

      <div className="reports-kpi-grid compact">
        <StatCard label="Rodziny" value={report.hives} />
        <StatCard label="Zdrowe" value={report.healthy} />
        <StatCard label="Leczone" value={report.treated} />
        <StatCard label="Wysoka warroza" value={report.highVarroa} />
      </div>

      <div className="report-tabs health-tabs">
        {([
          ['warroza', '🦠 Warroza'],
          ['leczenie', '💊 Leczenie'],
          ['alerty', '⚠️ Alerty'],
          ['przenosiny', '🔄 Przenoszenie uli'],
          ['raport', '📈 Raport']
        ] as Array<[HealthTab, string]>).map(([value, label]) => (
          <button key={value} className={tab === value ? 'active' : ''} onClick={() => setTab(value)}>{label}</button>
        ))}
      </div>

      {tab === 'warroza' && (
        <>
          <Section title="Dodaj pomiar warrozy">
            <form className="form-card" onSubmit={event => { event.preventDefault(); addVarroa(event.currentTarget); }}>
              <label>Ul<select name="hiveId">{state.hives.map(hive => <option key={hive.id} value={hive.id}>{hive.name}</option>)}</select></label>
              <label>Data<input type="date" name="date" defaultValue={today()} /></label>
              <label>Metoda<select name="method"><option value="osyp">Osyp naturalny</option><option value="cukier_puder">Test cukrowy</option><option value="alkohol">Test alkoholowy</option><option value="co2">CO₂</option><option value="inna">Inna</option></select></label>
              <div className="two-cols">
                <label>Liczba roztoczy<input type="number" name="miteCount" defaultValue="0" /></label>
                <label>Liczba pszczół / dni<input type="number" name="beesSampleCount" defaultValue="300" /></label>
              </div>
              <label>Dni osypu<input type="number" name="daysCount" defaultValue="1" /></label>
              <label>Uwagi<input name="notes" /></label>
              <button className="primary full">Zapisz pomiar</button>
            </form>
          </Section>

          <Section title="Historia warrozy">
            {(state.varroaMeasurements ?? []).length === 0 ? <div className="empty-card">Brak pomiarów warrozy.</div> : (state.varroaMeasurements ?? []).map(item => (
              <div className={`card health-card risk-${item.riskLevel}`} key={item.id}>
                <strong>{item.date} · {riskLabel(item.riskLevel)}</strong>
                <p>{item.method} · roztocza: {item.miteCount} · wynik: {item.infestationPercent}</p>
              </div>
            ))}
          </Section>
        </>
      )}

      {tab === 'leczenie' && (
        <>
          <Section title="Dodaj leczenie">
            <form className="form-card" onSubmit={event => { event.preventDefault(); addTreatment(event.currentTarget); }}>
              <label>Ul<select name="hiveId">{state.hives.map(hive => <option key={hive.id} value={hive.id}>{hive.name}</option>)}</select></label>
              <label>Data<input type="date" name="date" defaultValue={today()} /></label>
              <label>Preparat<select name="preparation">{MEDICINE_PREPARATIONS.map(item => <option key={item}>{item}</option>)}</select></label>
              <div className="two-cols">
                <label>Producent<input name="producer" /></label>
                <label>Substancja<input name="activeSubstance" /></label>
              </div>
              <div className="two-cols">
                <label>Dawka<input type="number" step="0.01" name="dose" defaultValue="0" /></label>
                <label>Jednostka<input name="unit" placeholder="tabletka, ml, pasek" /></label>
              </div>
              <div className="two-cols">
                <label>Ilość z magazynu<input type="number" step="0.01" name="quantity" defaultValue="0" /></label>
                <label>Seria<input name="batchNumber" /></label>
              </div>
              <label>Pozycja magazynu<select name="inventoryItemId"><option value="">Bez magazynu</option>{(state.inventoryItems ?? []).filter(item => item.category === 'medicine').map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
              <label>Powód<input name="reason" /></label>
              <label>Następna kontrola<input type="date" name="nextControlDate" /></label>
              <label>Status<select name="status"><option value="planowane">Planowane</option><option value="w_trakcie">W trakcie</option><option value="zakonczone">Zakończone</option></select></label>
              <label>Uwagi<input name="notes" /></label>
              <button className="primary full">Zapisz leczenie</button>
            </form>
          </Section>

          <Section title="Historia leczenia">
            {(state.treatments ?? []).length === 0 ? <div className="empty-card">Brak leczenia.</div> : (state.treatments ?? []).map(item => (
              <div className="card treatment-card" key={item.id}>
                <strong>{item.date} · {item.preparation}</strong>
                <p>{item.dose} {item.unit} · kontrola: {item.nextControlDate || 'brak'}</p>
              </div>
            ))}
          </Section>
        </>
      )}

      {tab === 'alerty' && (
        <>
          <Section title="Alerty zdrowotne">
            {alerts.length === 0 ? <div className="empty-card">Brak alertów zdrowotnych.</div> : alerts.map((alert, index) => (
              <div className={`card health-card risk-${alert.level}`} key={`${alert.hiveId}-${index}`}>
                <strong>{alert.title}</strong>
                <p>{state.hives.find(hive => hive.id === alert.hiveId)?.name ?? 'Ul'} · {alert.message}</p>
              </div>
            ))}
          </Section>

          <Section title="Obserwacja i kwarantanna">
            <form className="form-card" onSubmit={event => { event.preventDefault(); addQuarantine(event.currentTarget); }}>
              <label>Ul<select name="hiveId">{state.hives.map(hive => <option key={hive.id} value={hive.id}>{hive.name}</option>)}</select></label>
              <label>Status<select name="status"><option value="brak">Brak</option><option value="obserwacja">Obserwacja</option><option value="kwarantanna">Kwarantanna</option></select></label>
              <label>Powód<input name="reason" /></label>
              <label>Uwagi<input name="notes" /></label>
              <button className="primary full">Zapisz oznaczenie</button>
            </form>
          </Section>
        </>
      )}

      {tab === 'przenosiny' && (
        <>
          <Section title="Przenieś ul">
            <form className="form-card" onSubmit={event => { event.preventDefault(); addTransfer(event.currentTarget); }}>
              <label>Ul<select name="hiveId">{state.hives.map(hive => <option key={hive.id} value={hive.id}>{hive.name}</option>)}</select></label>
              <label>Nowa pasieka<select name="toApiaryId">{state.apiaries.map(apiary => <option key={apiary.id} value={apiary.id}>{apiary.name}</option>)}</select></label>
              <label>Data<input type="date" name="date" defaultValue={today()} /></label>
              <label>Powód<input name="reason" /></label>
              <label>Notatka<input name="notes" /></label>
              <button className="primary full">Przenieś ul</button>
            </form>
          </Section>

          <Section title="Historia przeniesień">
            {(state.hiveTransfers ?? []).length === 0 ? <div className="empty-card">Brak przeniesień uli.</div> : (state.hiveTransfers ?? []).map(item => (
              <div className="card transfer-card" key={item.id}>
                <strong>{item.date} · {state.hives.find(hive => hive.id === item.hiveId)?.name ?? 'Ul'}</strong>
                <p>Z {item.fromApiaryId} do {item.toApiaryId} · siła: {item.strengthSnapshot}/10 · matka: {item.queenSnapshot.breed} {item.queenSnapshot.line}</p>
              </div>
            ))}
          </Section>
        </>
      )}

      {tab === 'raport' && (
        <Section title="Raport zdrowia pasieki">
          <div className="reports-kpi-grid compact">
            <StatCard label="Zdrowe" value={report.healthy} />
            <StatCard label="Leczone" value={report.treated} />
            <StatCard label="Śr. wynik" value={report.averageInfestation} />
            <StatCard label="Kontrole" value={report.controlsDue} />
          </div>
        </Section>
      )}
    </>
  );
}
