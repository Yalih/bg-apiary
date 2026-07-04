import { useState } from 'react';
import type { ApiaryState } from '../models/apiary';
import type { TestUser } from '../auth/auth';
import { Section } from '../components/Section';

interface MorePageProps {
  state: ApiaryState;
  user: TestUser;
  onLogout: () => void;
  onResetDemo: () => void;
  onClearMyData: () => void;
  onBackup: () => void;
  onReports: () => void;
  onQueens: () => void;
  onInventory: () => void;
  onHoney: () => void;
  onHealth: () => void;
  onSeasonPlan: () => void;
  onPlatform20: () => void;
  onPlatform: () => void;
  onCreateApiary: () => void;
  onCreateHive: (apiaryId: string) => void;
  onDeleteApiary: (apiaryId: string) => void;
  onDeleteHive: (hiveId: string) => void;
}

export function MorePage({
  state,
  user,
  onLogout,
  onClearMyData,
  onBackup,
  onReports,
  onQueens,
  onInventory,
  onHoney,
  onHealth,
  onSeasonPlan,
  onPlatform20,
  onPlatform,
  onCreateApiary,
  onCreateHive,
  onDeleteApiary,
  onDeleteHive
}: MorePageProps) {
  const [apiaryToDelete, setApiaryToDelete] = useState(state.apiaries[0]?.id ?? '');
  const [hiveToDelete, setHiveToDelete] = useState(state.hives[0]?.id ?? '');
  const [apiaryForHive, setApiaryForHive] = useState(state.apiaries[0]?.id ?? '');

  return (
    <>
      <div className="page-header">
        <span>Centrum administracyjne</span>
        <h1>Więcej</h1>
        <p>Konto, synchronizacja, współdzielenie, uprawnienia, dziennik zmian, wersje danych, kopia zapasowa i zarządzanie danymi. Moduły pracy są w głównym menu, bo w końcu ktoś posprzątał.</p>
      </div>

      <Section title="Konto i profil">
        <div className="card profile-card">
          <strong>Zalogowano jako: {user.name}</strong>
          <p>{user.email}</p>
          <small>Konto lokalne / gotowe pod chmurę. Backend niepodłączony, dane nadal działają offline-first lokalnie.</small>
          <button className="wide-action" onClick={onLogout}>Wyloguj</button>
        </div>
      </Section>

      <Section title="Administracja 2.0 RC2">
        <div className="card platform-card admin-hub-card">
          <button className="wide-action" onClick={onPlatform}>☁️ Synchronizacja i konto</button>
          <button className="wide-action" onClick={onPlatform}>👥 Współdzielenie</button>
          <button className="wide-action" onClick={onPlatform}>🔐 Uprawnienia</button>
          <button className="wide-action" onClick={onPlatform}>🧾 Dziennik zmian</button>
          <button className="wide-action" onClick={onPlatform}>🕘 Wersje danych</button>
          <button className="wide-action" onClick={onBackup}>💾 Kopia zapasowa</button>
          <small>Funkcje chmurowe są gotowe architektonicznie. Backend nie jest podłączony, bo nie będziemy udawać, że kliknięcie w localStorage wysyła satelitę.</small>
        </div>
      </Section>

      <Section title="Zarządzanie danymi">
        <div className="card data-management-card">
          <p>Twoje konto ma własny zapis. Nowe konta startują puste, bo tak działa rzeczywistość, gdy nikt nie podrzuca fikcyjnej pasieki.</p>
          <div className="summary-strip">
            <span>{state.apiaries.length} pasieki</span>
            <span>{state.hives.length} uli</span>
            <span>{state.tasks.length} zadań</span>
          </div>

          <button className="wide-action" onClick={onCreateApiary}>🐝 Dodaj pasiekę</button>

          <label>
            Pasieka dla nowego ula
            <select value={apiaryForHive} onChange={event => setApiaryForHive(event.target.value)} disabled={state.apiaries.length === 0}>
              {state.apiaries.length === 0 && <option>Najpierw dodaj pasiekę</option>}
              {state.apiaries.map(apiary => <option key={apiary.id} value={apiary.id}>{apiary.name}</option>)}
            </select>
          </label>
          <button className="wide-action" disabled={!apiaryForHive} onClick={() => onCreateHive(apiaryForHive)}>➕ Dodaj ul</button>

          <button className="wide-action" onClick={onReports}>📊 Raporty</button>
          <button className="wide-action" onClick={onQueens}>👑 Katalog matek</button>
          <button className="wide-action" onClick={onInventory}>📦 Magazyn pasieczny</button>
          <button className="wide-action" onClick={onHoney}>🍯 Miodobrania i sprzedaż</button>
          <button className="wide-action" onClick={onHealth}>❤️ Zdrowie pasieki</button>
          <button className="wide-action" onClick={onSeasonPlan}>📅 Plan sezonu</button>
          <button className="wide-action" onClick={onPlatform}>☁️ Platforma 2.0 / synchronizacja</button>
          <button className="wide-action" onClick={onBackup}>💾 Kopia zapasowa / import</button>
        </div>
      </Section>

      <Section title="Usuwanie danych">
        <div className="card danger-zone-card">
          <strong>Strefa ostrożności</strong>
          <p>Usuwanie kasuje też powiązaną historię. Aplikacja zapyta o potwierdzenie, bo przypadkowe kliknięcia to sport narodowy ekranów dotykowych.</p>

          <label>
            Usuń pasiekę
            <select value={apiaryToDelete} onChange={event => setApiaryToDelete(event.target.value)} disabled={state.apiaries.length === 0}>
              {state.apiaries.length === 0 && <option>Brak pasiek</option>}
              {state.apiaries.map(apiary => <option key={apiary.id} value={apiary.id}>{apiary.name}</option>)}
            </select>
          </label>
          <button className="danger" disabled={!apiaryToDelete} onClick={() => onDeleteApiary(apiaryToDelete)}>Usuń pasiekę z danymi</button>

          <label>
            Usuń ul
            <select value={hiveToDelete} onChange={event => setHiveToDelete(event.target.value)} disabled={state.hives.length === 0}>
              {state.hives.length === 0 && <option>Brak uli</option>}
              {state.hives.map(hive => <option key={hive.id} value={hive.id}>{hive.name}</option>)}
            </select>
          </label>
          <button className="danger" disabled={!hiveToDelete} onClick={() => onDeleteHive(hiveToDelete)}>Usuń ul z historią</button>

          <button className="danger" onClick={onClearMyData}>Wyczyść moje dane</button>
        </div>
      </Section>

      <Section title="RealUser RC">
        <div className="card">
          <ul>
            <li>Nowe konto startuje puste.</li>
            <li>Brak automatycznych danych demo.</li>
            <li>Kopia zapasowa i import działają na aktualnym koncie.</li>
            <li>Magazyn pasieczny działa osobno dla aktualnego użytkownika.</li>
            <li>Miodobrania, partie i sprzedaż działają osobno dla aktualnego użytkownika.</li>
            <li>Usuwanie pasieki usuwa powiązane ule i historię.</li>
            <li>Usuwanie ula usuwa jego zadania, przeglądy, karmienia, notatki, zdjęcia, decyzje i kontrole matki.</li>
          </ul>
        </div>
      </Section>
    </>
  );
}
