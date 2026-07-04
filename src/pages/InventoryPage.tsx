import { useState } from 'react';
import type { ApiaryState, InventoryCategory, InventoryItem, InventoryMovementType, InventoryUnit } from '../models/apiary';
import { Section } from '../components/Section';
import { StatCard } from '../components/StatCard';
import {
  INVENTORY_CATEGORIES,
  INVENTORY_UNITS,
  buildInventoryReport,
  buildShoppingList,
  categoryIcon,
  categoryLabel,
  createInventoryItem,
  createInventoryMovement,
  getInventoryStatus,
  inventoryStatusLabel,
  unitLabel
} from '../logic/inventory';

interface InventoryPageProps {
  state: ApiaryState;
  onBack: () => void;
  onAddItem: (item: InventoryItem) => void;
  onAddMovement: (movement: ReturnType<typeof createInventoryMovement>) => void;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

export function InventoryPage({ state, onBack, onAddItem, onAddMovement }: InventoryPageProps) {
  const [category, setCategory] = useState<InventoryCategory | 'all'>('all');
  const [query, setQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [movementItemId, setMovementItemId] = useState('');
  const [movementQty, setMovementQty] = useState(1);
  const [movementType, setMovementType] = useState<InventoryMovementType>('in');
  const report = buildInventoryReport(state);
  const shopping = buildShoppingList(state.inventoryItems ?? []);

  const filtered = (state.inventoryItems ?? []).filter(item => {
    const okCategory = category === 'all' || item.category === category;
    const q = query.trim().toLowerCase();
    const okQuery = !q || [item.name, item.description, item.location, item.supplier, item.batchNumber, categoryLabel(item.category)].join(' ').toLowerCase().includes(q);
    return okCategory && okQuery;
  });

  function addStarterItem(form: HTMLFormElement) {
    const data = new FormData(form);
    const item = createInventoryItem({
      category: data.get('category') as InventoryCategory,
      name: String(data.get('name') ?? ''),
      description: String(data.get('description') ?? ''),
      quantity: Number(data.get('quantity') ?? 0),
      unit: data.get('unit') as InventoryUnit,
      minQuantity: Number(data.get('minQuantity') ?? 0),
      optimalQuantity: Number(data.get('optimalQuantity') ?? 0),
      location: String(data.get('location') ?? ''),
      supplier: String(data.get('supplier') ?? ''),
      batchNumber: String(data.get('batchNumber') ?? ''),
      expiryDate: String(data.get('expiryDate') ?? ''),
      purchasePrice: Number(data.get('purchasePrice') ?? 0),
      purchaseDate: String(data.get('purchaseDate') ?? ''),
      invoiceNumber: String(data.get('invoiceNumber') ?? '')
    });
    onAddItem(item);
    form.reset();
    setShowForm(false);
  }

  function submitMovement() {
    if (!movementItemId) return;
    onAddMovement(createInventoryMovement({
      itemId: movementItemId,
      date: today(),
      type: movementType,
      quantity: movementQty,
      reason: 'Ręczna zmiana magazynu',
      note: ''
    }));
    setMovementQty(1);
  }

  return (
    <>
      <button className="back-button" onClick={onBack}>‹ Więcej</button>

      <section className="inventory-hero">
        <div>
          <span>Magazyn 1.6</span>
          <h1>Magazyn Pasieczny</h1>
          <p>Sprzęt, ramki, korpusy, pokarm, leki, matki zapasowe i odkłady. Wreszcie wiadomo, czego brakuje, zanim człowiek stoi przy ulu z pustymi rękami.</p>
        </div>
        <div className="inventory-badge">
          <strong>{report.alerts}</strong>
          <small>alerty</small>
        </div>
      </section>

      <div className="reports-kpi-grid compact">
        <StatCard label="Pozycje" value={report.totalItems} />
        <StatCard label="Ruchy" value={report.totalMovements} />
        <StatCard label="Zakupy" value={shopping.length} />
        <StatCard label="Wartość" value={`${report.totalValue} zł`} />
      </div>

      <Section title="Kategorie">
        <div className="inventory-category-grid">
          {report.byCategory.map(item => (
            <button key={item.category} className={`inventory-category-card ${category === item.category ? 'active' : ''}`} onClick={() => setCategory(category === item.category ? 'all' : item.category)}>
              <strong>{item.icon} {item.label}</strong>
              <span>{item.itemCount} pozycji</span>
              <small>{item.alerts} alertów</small>
            </button>
          ))}
        </div>
      </Section>

      <div className="form-card inventory-tools">
        <label>
          Szukaj w magazynie
          <input value={query} onChange={event => setQuery(event.target.value)} placeholder="ramki, cukier, Apiwarol, lokalizacja..." />
        </label>
        <button className="wide-action" onClick={() => setShowForm(!showForm)}>{showForm ? 'Zamknij formularz' : '+ Dodaj pozycję magazynu'}</button>
      </div>

      {showForm && (
        <Section title="Nowa pozycja">
          <form className="form-card" onSubmit={event => { event.preventDefault(); addStarterItem(event.currentTarget); }}>
            <label>Kategoria
              <select name="category">{INVENTORY_CATEGORIES.map(item => <option key={item.value} value={item.value}>{item.icon} {item.label}</option>)}</select>
            </label>
            <label>Nazwa<input name="name" required placeholder="np. Ramki WP z węzą" /></label>
            <label>Opis<textarea name="description" /></label>
            <div className="two-cols">
              <label>Ilość<input name="quantity" type="number" step="0.01" defaultValue="0" /></label>
              <label>Jednostka<select name="unit">{INVENTORY_UNITS.map(unit => <option key={unit} value={unit}>{unitLabel(unit)}</option>)}</select></label>
            </div>
            <div className="two-cols">
              <label>Minimum<input name="minQuantity" type="number" step="0.01" defaultValue="0" /></label>
              <label>Optimum<input name="optimalQuantity" type="number" step="0.01" defaultValue="0" /></label>
            </div>
            <label>Lokalizacja<input name="location" placeholder="np. garaż, magazyn, bus" /></label>
            <div className="two-cols">
              <label>Producent/sklep<input name="supplier" /></label>
              <label>Partia<input name="batchNumber" /></label>
            </div>
            <div className="two-cols">
              <label>Ważne do<input name="expiryDate" type="date" /></label>
              <label>Cena<input name="purchasePrice" type="number" step="0.01" defaultValue="0" /></label>
            </div>
            <button className="primary full">Zapisz pozycję</button>
          </form>
        </Section>
      )}

      <Section title="Ręczna zmiana stanu">
        <div className="form-card inventory-movement-form">
          <label>Pozycja
            <select value={movementItemId} onChange={event => setMovementItemId(event.target.value)}>
              <option value="">Wybierz pozycję</option>
              {(state.inventoryItems ?? []).map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </label>
          <div className="two-cols">
            <label>Typ
              <select value={movementType} onChange={event => setMovementType(event.target.value as InventoryMovementType)}>
                <option value="in">Przyjęcie</option>
                <option value="out">Zużycie</option>
                <option value="adjustment">Korekta</option>
              </select>
            </label>
            <label>Ilość<input type="number" step="0.01" value={movementQty} onChange={event => setMovementQty(Number(event.target.value))} /></label>
          </div>
          <button className="wide-action" disabled={!movementItemId} onClick={submitMovement}>Zapisz ruch magazynowy</button>
        </div>
      </Section>

      <Section title={`Pozycje magazynu: ${filtered.length}`}>
        {filtered.length === 0 ? <div className="empty-card">Brak pozycji w magazynie. Magazyn bez rzeczy, śmiała koncepcja.</div> : filtered.map(item => {
          const status = getInventoryStatus(item);
          return (
            <div className={`card inventory-item-card status-${status}`} key={item.id}>
              <div className="inventory-item-head">
                <span>{categoryIcon(item.category)}</span>
                <div>
                  <strong>{item.name}</strong>
                  <p>{categoryLabel(item.category)} · {item.location || 'brak lokalizacji'}</p>
                </div>
                <b>{inventoryStatusLabel(status)}</b>
              </div>
              <div className="inventory-meta">
                <span>Stan: {item.quantity} {unitLabel(item.unit)}</span>
                <span>Min: {item.minQuantity}</span>
                <span>Optimum: {item.optimalQuantity}</span>
                {item.expiryDate && <span>Ważne do: {item.expiryDate}</span>}
                {item.batchNumber && <span>Partia: {item.batchNumber}</span>}
              </div>
            </div>
          );
        })}
      </Section>

      <Section title="Lista zakupów">
        {shopping.length === 0 ? <div className="empty-card">Brak zakupów do uzupełnienia.</div> : shopping.map(item => (
          <div className="card shopping-item-card" key={item.itemId}>
            <strong>□ {item.name}</strong>
            <p>Dokupić: {item.neededQuantity} {unitLabel(item.unit)} · {categoryLabel(item.category)}</p>
          </div>
        ))}
      </Section>
    </>
  );
}
