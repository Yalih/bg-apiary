import { FormEvent, useEffect, useMemo, useState } from 'react';
import { create, getToken, list, login, me, register, setToken, update } from './api';
import { getOfflineQueue } from './offline';
import type { Apiary, Feeding, Hive, HiveStatus, Inspection, Note, Queen, Task, Treatment, User } from './types';

type View = 'dashboard' | 'apiaries' | 'hives' | 'inspections' | 'queens' | 'feedings' | 'treatments' | 'tasks' | 'history';
type Theme = 'light' | 'dark';

const statusLabel: Record<HiveStatus, string> = {
  OK: 'OK',
  OBSERVE: 'Obserwuj',
  ACTION: 'Interwencja',
  UNKNOWN: 'Brak danych',
  INACTIVE: 'Nieaktywny',
};

const statusTone: Record<HiveStatus, string> = {
  OK: 'ok',
  OBSERVE: 'observe',
  ACTION: 'action',
  UNKNOWN: 'unknown',
  INACTIVE: 'unknown',
};

function Logo() {
  return (
    <div className="brand">
      <div className="brandMark">BG</div>
      <div>
        <strong>BG Apiary</strong>
        <span>Pasieka pod kontrolą</span>
      </div>
    </div>
  );
}

function AuthScreen({ onAuth }: { onAuth: (user: User, token: string) => void }) {
  const [mode, setMode] = useState<'login' | 'register'>('register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = mode === 'register'
        ? await register({ name, email, password })
        : await login({ email, password });
      setToken(result.token);
      onAuth(result.user, result.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nie udało się zalogować');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="authShell">
      <section className="heroPanel">
        <Logo />
        <div className="heroContent">
          <p className="eyebrow">BG Apiary 1.1.0</p>
          <h1>Twoja pasieka pod kontrolą.</h1>
          <p className="heroText">
            Przeglądy, matki, karmienia, leczenie i zadania w jednym miejscu. Szybko przy ulu, wygodnie w domu, bez chaosu w notatkach.
          </p>
          <div className="benefitsGrid">
            <span>✓ Historia każdego ula</span>
            <span>✓ Szybki przegląd</span>
            <span>✓ Praca offline</span>
            <span>✓ Zadania po kontroli</span>
          </div>
        </div>
        <div className="phoneMockup">
          <div className="mockCard hot">Ul 3 · Obserwuj</div>
          <div className="mockCard">Matka 2026 · widziana</div>
          <div className="mockCard ok">Czerw i jajka OK</div>
          <div className="mockCard">Zadanie: kontrola za 3 dni</div>
        </div>
      </section>

      <section className="authCard">
        <div className="authTabs">
          <button type="button" className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>Załóż konto</button>
          <button type="button" className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>Zaloguj</button>
        </div>
        <h2>{mode === 'register' ? 'Zacznij prowadzić pasiekę nowocześnie' : 'Wróć do swojej pasieki'}</h2>
        <p className="muted">Pierwsze dane dodasz w krótkim onboardingu po zalogowaniu.</p>
        <form onSubmit={submit} className="formStack">
          {mode === 'register' && <label>Imię<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Paweł" required /></label>}
          <label>Email<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email@przyklad.pl" required /></label>
          <label>Hasło<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" minLength={8} placeholder="minimum 8 znaków" required /></label>
          {error && <div className="errorBox">{error}</div>}
          <button className="primaryButton" disabled={loading}>{loading ? 'Pracuję...' : mode === 'register' ? 'Utwórz konto' : 'Zaloguj się'}</button>
        </form>
      </section>
    </main>
  );
}

function EmptyState({ title, text }: { title: string; text: string }) {
  return <div className="emptyState"><strong>{title}</strong><span>{text}</span></div>;
}

function StatCard({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return <div className="statCard"><span>{label}</span><strong>{value}</strong>{hint && <small>{hint}</small>}</div>;
}

function formatDate(value?: string | null) {
  if (!value) return 'brak daty';
  return new Date(value).toLocaleDateString('pl-PL');
}

function daysAgo(value?: string | null) {
  if (!value) return 'brak przeglądu';
  const days = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 86_400_000));
  if (days === 0) return 'dzisiaj';
  if (days === 1) return 'wczoraj';
  return `${days} dni temu`;
}

function addDays(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

function AppShell({ children, view, setView, theme, setTheme, user, syncCount, online, logout }: {
  children: React.ReactNode;
  view: View;
  setView: (view: View) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  user: User;
  syncCount: number;
  online: boolean;
  logout: () => void;
}) {
  const nav: { id: View; label: string }[] = [
    { id: 'dashboard', label: 'Start' },
    { id: 'hives', label: 'Ule' },
    { id: 'inspections', label: 'Przeglądy' },
    { id: 'tasks', label: 'Zadania' },
    { id: 'history', label: 'Historia' },
  ];

  return (
    <div className="appShell">
      <aside className="sidebar">
        <Logo />
        <nav>{nav.map((item) => <button key={item.id} className={view === item.id ? 'active' : ''} onClick={() => setView(item.id)}>{item.label}</button>)}</nav>
        <div className="sideFooter">
          <button onClick={() => setView('apiaries')}>Pasieki</button>
          <button onClick={() => setView('queens')}>Matki</button>
          <button onClick={() => setView('feedings')}>Karmienia</button>
          <button onClick={() => setView('treatments')}>Leczenie</button>
        </div>
      </aside>
      <section className="workspace">
        <header className="topbar">
          <div>
            <strong>{user.name}</strong>
            <span className="syncPill">{online ? 'Online' : 'Offline'} · {syncCount ? `${syncCount} do synchronizacji` : 'zsynchronizowane'}</span>
          </div>
          <div className="topActions">
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{theme === 'light' ? 'Tryb ciemny' : 'Tryb jasny'}</button>
            <button onClick={logout}>Wyloguj</button>
          </div>
        </header>
        {children}
      </section>
      <nav className="bottomNav">{nav.map((item) => <button key={item.id} className={view === item.id ? 'active' : ''} onClick={() => setView(item.id)}>{item.label}</button>)}</nav>
    </div>
  );
}

function QuickAdd({ apiaries, hives, reload }: { apiaries: Apiary[]; hives: Hive[]; reload: () => Promise<void> }) {
  const [busy, setBusy] = useState(false);

  async function createFirstApiary() {
    setBusy(true);
    try {
      const apiary = await create<Apiary>('apiaries', { name: 'Pasieka główna', location: 'Mazowieckie', description: 'Pierwsza pasieka w BG Apiary' });
      await create<Hive>('hives', { apiaryId: apiary.id, name: 'Ul 1', hiveType: 'Warszawski poszerzany', status: 'UNKNOWN', strength: 5 });
      await create<Hive>('hives', { apiaryId: apiary.id, name: 'Ul 2', hiveType: 'Warszawski poszerzany', status: 'UNKNOWN', strength: 5 });
      await reload();
    } finally {
      setBusy(false);
    }
  }

  if (apiaries.length === 0) {
    return (
      <div className="onboardingCard">
        <p className="eyebrow">Pierwszy start</p>
        <h2>Utwórz pierwszą pasiekę</h2>
        <p>Jednym kliknięciem dodasz startową pasiekę i dwa ule, potem wszystko możesz edytować. Nie wrzucamy Cię do pustej ściany, cywilizacja jednak minimalnie postępuje.</p>
        <button className="primaryButton" onClick={createFirstApiary} disabled={busy}>{busy ? 'Tworzę...' : 'Utwórz startową pasiekę'}</button>
      </div>
    );
  }

  if (hives.length === 0) {
    return <EmptyState title="Brak uli" text="Dodaj pierwszy ul w sekcji Ule. Aplikacja bez uli jest tylko drogim notatnikiem." />;
  }

  return null;
}

function Dashboard({ apiaries, hives, inspections, tasks, reload }: { apiaries: Apiary[]; hives: Hive[]; inspections: Inspection[]; tasks: Task[]; reload: () => Promise<void> }) {
  const attention = hives.filter((h) => ['OBSERVE', 'ACTION', 'UNKNOWN'].includes(h.status)).length;
  const todo = tasks.filter((t) => t.status !== 'DONE').length;
  return (
    <main className="page">
      <div className="pageHeader"><p className="eyebrow">Dashboard</p><h1>Co wymaga uwagi?</h1></div>
      <QuickAdd apiaries={apiaries} hives={hives} reload={reload} />
      <div className="statsGrid">
        <StatCard label="Pasieki" value={apiaries.length} />
        <StatCard label="Ule" value={hives.length} />
        <StatCard label="Do obserwacji" value={attention} hint="ule bez danych lub z alertem" />
        <StatCard label="Zadania" value={todo} hint="otwarte" />
      </div>
      <section className="panel">
        <h2>Ostatnie przeglądy</h2>
        {inspections.length === 0 ? <EmptyState title="Brak przeglądów" text="Dodaj pierwszy przegląd z telefonu przy ulu." /> : inspections.slice(0, 5).map((item) => (
          <div className="listRow" key={item.id}><strong>{hives.find((h) => h.id === item.hiveId)?.name || 'Ul'}</strong><span>{formatDate(item.inspectedAt)} · siła {item.strength ?? '-'}/10</span></div>
        ))}
      </section>
    </main>
  );
}

function ApiariesView({ apiaries, reload }: { apiaries: Apiary[]; reload: () => Promise<void> }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  async function submit(e: FormEvent) {
    e.preventDefault();
    await create<Apiary>('apiaries', { name, location });
    setName(''); setLocation(''); await reload();
  }
  return <main className="page"><div className="pageHeader"><p className="eyebrow">Pasieki</p><h1>Twoje lokalizacje</h1></div><form className="inlineForm" onSubmit={submit}><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nazwa pasieki" required /><input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Lokalizacja" /><button>Dodaj</button></form><div className="cardGrid">{apiaries.map((a) => <article className="dataCard" key={a.id}><h3>{a.name}</h3><p>{a.location || 'Brak lokalizacji'}</p><span className="badge ok">{a.status}</span></article>)}</div></main>;
}

type TimelineItem = {
  id: string;
  date: string;
  type: string;
  title: string;
  detail: string;
  tone: 'ok' | 'observe' | 'action' | 'unknown';
};

function buildHiveTimeline(
  hive: Hive,
  inspections: Inspection[],
  feedings: Feeding[],
  treatments: Treatment[],
  tasks: Task[],
  notes: Note[],
  queens: Queen[],
): TimelineItem[] {
  return [
    ...inspections.filter((item) => item.hiveId === hive.id).map((item) => ({
      id: `inspection-${item.id}`,
      date: item.inspectedAt,
      type: 'Przegląd',
      title: `Siła ${item.strength ?? '-'}/10`,
      detail: [
        item.queenSeen ? 'matka widziana' : 'matka niepotwierdzona',
        item.eggs ? 'jajka OK' : null,
        item.foodLevel ? `pokarm: ${item.foodLevel}` : null,
        item.note,
      ].filter(Boolean).join(' · '),
      tone: item.strength && item.strength >= 7 ? 'ok' : 'observe',
    } as TimelineItem)),
    ...feedings.filter((item) => item.hiveId === hive.id).map((item) => ({
      id: `feeding-${item.id}`,
      date: item.fedAt,
      type: 'Karmienie',
      title: item.type,
      detail: `${item.amount ?? ''}${item.unit ?? ''} ${item.note ?? ''}`.trim(),
      tone: 'ok',
    } as TimelineItem)),
    ...treatments.filter((item) => item.hiveId === hive.id).map((item) => ({
      id: `treatment-${item.id}`,
      date: item.treatedAt,
      type: 'Leczenie',
      title: item.product,
      detail: [item.dose, item.method, item.note].filter(Boolean).join(' · '),
      tone: 'action',
    } as TimelineItem)),
    ...tasks.filter((item) => item.hiveId === hive.id).map((item) => ({
      id: `task-${item.id}`,
      date: item.dueAt || new Date().toISOString(),
      type: 'Zadanie',
      title: item.title,
      detail: `${item.status} · ${item.priority}`,
      tone: item.status === 'DONE' ? 'ok' : 'observe',
    } as TimelineItem)),
    ...notes.filter((item) => item.hiveId === hive.id).map((item) => ({
      id: `note-${item.id}`,
      date: item.createdAt,
      type: 'Notatka',
      title: item.title || 'Notatka',
      detail: item.body,
      tone: 'unknown',
    } as TimelineItem)),
    ...queens.filter((item) => item.hiveId === hive.id).map((item) => ({
      id: `queen-${item.id}`,
      date: new Date().toISOString(),
      type: 'Matka',
      title: item.line || item.name || `Matka ${item.year ?? ''}`,
      detail: `${item.status}${item.layingRating ? ` · czerwienie ${item.layingRating}/10` : ''}`,
      tone: item.status === 'ACTIVE' || item.status === 'ACCEPTED' ? 'ok' : 'observe',
    } as TimelineItem)),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function HiveDetailPanel({
  hive,
  apiary,
  timeline,
  queen,
  reload,
}: {
  hive: Hive;
  apiary?: Apiary;
  timeline: TimelineItem[];
  queen?: Queen;
  reload: () => Promise<void>;
}) {
  const [status, setStatus] = useState<HiveStatus>(hive.status);
  const [strength, setStrength] = useState(hive.strength ?? 5);
  const [note, setNote] = useState(hive.notes ?? '');
  const [quickNote, setQuickNote] = useState('');
  const [busy, setBusy] = useState('');

  useEffect(() => {
    setStatus(hive.status);
    setStrength(hive.strength ?? 5);
    setNote(hive.notes ?? '');
    setQuickNote('');
  }, [hive.id, hive.status, hive.strength, hive.notes]);

  async function saveHive() {
    setBusy('save');
    try {
      await update<Hive>('hives', hive.id, { status, strength, notes: note });
      await reload();
    } finally {
      setBusy('');
    }
  }

  async function addFastInspection() {
    setBusy('inspection');
    try {
      await create<Inspection>('inspections', {
        hiveId: hive.id,
        inspectedAt: new Date().toISOString(),
        strength,
        queenSeen: true,
        eggs: true,
        openBrood: true,
        cappedBrood: true,
        foodLevel: 'średni',
        note: quickNote || 'Szybki przegląd z karty ula',
      });
      await update<Hive>('hives', hive.id, { status: strength >= 7 ? 'OK' : 'OBSERVE', strength });
      await reload();
    } finally {
      setBusy('');
    }
  }

  async function addQueenCheckTask() {
    setBusy('task');
    try {
      await create<Task>('tasks', {
        hiveId: hive.id,
        title: 'Sprawdzić matkę',
        description: 'Zadanie dodane z karty ula',
        dueAt: addDays(3),
        priority: 'NORMAL',
        status: 'TODO',
        source: 'hive.quick_action',
      });
      await reload();
    } finally {
      setBusy('');
    }
  }

  async function addFeeding() {
    setBusy('feeding');
    try {
      await create<Feeding>('feedings', {
        hiveId: hive.id,
        fedAt: new Date().toISOString(),
        type: 'Syrop 1:1',
        amount: 1,
        unit: 'l',
        purpose: 'Pobudzenie / uzupełnienie',
        note: quickNote || null,
      });
      await reload();
    } finally {
      setBusy('');
    }
  }

  async function addNote() {
    if (!quickNote.trim()) return;
    setBusy('note');
    try {
      await create<Note>('notes', {
        hiveId: hive.id,
        title: 'Notatka z ula',
        body: quickNote,
        context: 'hive',
      });
      setQuickNote('');
      await reload();
    } finally {
      setBusy('');
    }
  }

  return (
    <aside className="hiveDetailPanel">
      <div className="detailHeader">
        <div>
          <p className="eyebrow">Karta ula</p>
          <h2>{hive.name}</h2>
          <p className="muted">{apiary?.name || 'Pasieka'} · {hive.hiveType || 'typ nieznany'} · ostatni przegląd {daysAgo(hive.lastInspectionAt)}</p>
        </div>
        <span className={`badge ${statusTone[hive.status]}`}>{statusLabel[hive.status]}</span>
      </div>

      <div className="detailStats">
        <StatCard label="Siła" value={`${hive.strength ?? '-'}/10`} />
        <StatCard label="Matka" value={queen?.year || '—'} hint={queen?.line || queen?.status || 'brak danych'} />
        <StatCard label="Zdarzenia" value={timeline.length} hint="w historii ula" />
      </div>

      <section className="panel compactPanel">
        <h3>Szybka aktualizacja</h3>
        <div className="detailFormGrid">
          <label>Status
            <select value={status} onChange={(e) => setStatus(e.target.value as HiveStatus)}>
              <option value="OK">OK</option>
              <option value="OBSERVE">Obserwuj</option>
              <option value="ACTION">Interwencja</option>
              <option value="UNKNOWN">Brak danych</option>
              <option value="INACTIVE">Nieaktywny</option>
            </select>
          </label>
          <label>Siła: {strength}/10
            <input type="range" min="0" max="10" value={strength} onChange={(e) => setStrength(Number(e.target.value))} />
          </label>
        </div>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Stała notatka o ulu" />
        <button className="primaryButton" onClick={saveHive} disabled={busy === 'save'}>{busy === 'save' ? 'Zapisuję...' : 'Zapisz kartę ula'}</button>
      </section>

      <section className="panel compactPanel">
        <h3>Szybkie akcje przy ulu</h3>
        <textarea value={quickNote} onChange={(e) => setQuickNote(e.target.value)} placeholder="Krótka notatka do akcji, np. pszczoły spokojne, dodać ramkę..." />
        <div className="quickActions">
          <button onClick={addFastInspection} disabled={Boolean(busy)}>+ Przegląd</button>
          <button onClick={addQueenCheckTask} disabled={Boolean(busy)}>+ Zadanie matka</button>
          <button onClick={addFeeding} disabled={Boolean(busy)}>+ Karmienie 1 l</button>
          <button onClick={addNote} disabled={Boolean(busy) || !quickNote.trim()}>+ Notatka</button>
        </div>
      </section>

      <section className="panel compactPanel">
        <h3>Historia ula</h3>
        <div className="hiveTimeline">
          {timeline.length === 0 ? <EmptyState title="Brak historii ula" text="Dodaj przegląd, karmienie, leczenie albo notatkę." /> : timeline.slice(0, 8).map((item) => (
            <article className={`timelineCard ${item.tone}`} key={item.id}>
              <span>{formatDate(item.date)} · {item.type}</span>
              <strong>{item.title}</strong>
              {item.detail && <p>{item.detail}</p>}
            </article>
          ))}
        </div>
      </section>
    </aside>
  );
}

function HivesView({
  apiaries,
  hives,
  inspections,
  queens,
  feedings,
  treatments,
  tasks,
  notes,
  reload,
}: {
  apiaries: Apiary[];
  hives: Hive[];
  inspections: Inspection[];
  queens: Queen[];
  feedings: Feeding[];
  treatments: Treatment[];
  tasks: Task[];
  notes: Note[];
  reload: () => Promise<void>;
}) {
  const [name, setName] = useState('');
  const [apiaryId, setApiaryId] = useState('');
  const [hiveType, setHiveType] = useState('Warszawski poszerzany');
  const [selectedHiveId, setSelectedHiveId] = useState('');
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | HiveStatus>('ALL');

  const selectedHive = hives.find((hive) => hive.id === selectedHiveId) || hives[0];
  const selectedTimeline = selectedHive ? buildHiveTimeline(selectedHive, inspections, feedings, treatments, tasks, notes, queens) : [];
  const selectedQueen = selectedHive ? queens.find((queen) => queen.hiveId === selectedHive.id && ['ACTIVE', 'ACCEPTED', 'WATCH'].includes(queen.status)) : undefined;

  const filteredHives = hives.filter((hive) => {
    const matchesQuery = `${hive.name} ${hive.hiveType ?? ''}`.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || hive.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  async function submit(e: FormEvent) {
    e.preventDefault();
    const targetApiaryId = apiaryId || apiaries[0]?.id;
    if (!targetApiaryId) return;
    const hive = await create<Hive>('hives', { name, apiaryId: targetApiaryId, hiveType, status: 'UNKNOWN', strength: 5 });
    setName('');
    setSelectedHiveId(hive.id);
    await reload();
  }

  return (
    <main className="page">
      <div className="pageHeader">
        <p className="eyebrow">Ule 1.1.0</p>
        <h1>Ule i historia rodziny</h1>
        <p className="muted">Nowy moduł uli: karta ula, status, szybkie akcje i historia zdarzeń. W końcu coś, co przypomina narzędzie, a nie tabelkę z ambicjami.</p>
      </div>

      <form className="inlineForm" onSubmit={submit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="np. Ul 1" required />
        <select value={apiaryId} onChange={(e) => setApiaryId(e.target.value)} required>
          <option value="">Wybierz pasiekę</option>
          {apiaries.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
        </select>
        <input value={hiveType} onChange={(e) => setHiveType(e.target.value)} placeholder="Typ ula" />
        <button disabled={apiaries.length === 0}>Dodaj ul</button>
      </form>

      {apiaries.length === 0 && <EmptyState title="Najpierw dodaj pasiekę" text="Ul musi do czegoś należeć. Nawet w cyfrowej pasiece obowiązuje minimum porządku." />}

      <section className="hiveModuleLayout">
        <div className="hiveListPanel">
          <div className="hiveToolbar">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Szukaj ula..." />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as 'ALL' | HiveStatus)}>
              <option value="ALL">Wszystkie statusy</option>
              <option value="OK">OK</option>
              <option value="OBSERVE">Obserwuj</option>
              <option value="ACTION">Interwencja</option>
              <option value="UNKNOWN">Brak danych</option>
              <option value="INACTIVE">Nieaktywny</option>
            </select>
          </div>

          <div className="hiveCardGrid">
            {filteredHives.length === 0 ? <EmptyState title="Brak uli" text="Dodaj ul albo zmień filtr." /> : filteredHives.map((hive) => {
              const hiveQueen = queens.find((queen) => queen.hiveId === hive.id && ['ACTIVE', 'ACCEPTED', 'WATCH'].includes(queen.status));
              const openTasks = tasks.filter((task) => task.hiveId === hive.id && task.status !== 'DONE').length;
              return (
                <button type="button" className={`hiveSelectableCard ${selectedHive?.id === hive.id ? 'selected' : ''}`} key={hive.id} onClick={() => setSelectedHiveId(hive.id)}>
                  <div className="hiveCardTop">
                    <div>
                      <h3>{hive.name}</h3>
                      <p>{apiaries.find((apiary) => apiary.id === hive.apiaryId)?.name || 'Pasieka'} · {hive.hiveType || 'typ nieznany'}</p>
                    </div>
                    <span className={`badge ${statusTone[hive.status]}`}>{statusLabel[hive.status]}</span>
                  </div>
                  <div className="hiveMetrics">
                    <span><strong>{hive.strength ?? '-'}/10</strong><small>siła</small></span>
                    <span><strong>{daysAgo(hive.lastInspectionAt)}</strong><small>przegląd</small></span>
                    <span><strong>{openTasks}</strong><small>zadania</small></span>
                  </div>
                  <p className="hiveQueenLine">{hiveQueen ? `Matka ${hiveQueen.year ?? ''} · ${hiveQueen.line || hiveQueen.status}` : 'Brak danych o matce'}</p>
                </button>
              );
            })}
          </div>
        </div>

        {selectedHive ? (
          <HiveDetailPanel
            hive={selectedHive}
            apiary={apiaries.find((apiary) => apiary.id === selectedHive.apiaryId)}
            queen={selectedQueen}
            timeline={selectedTimeline}
            reload={reload}
          />
        ) : (
          <EmptyState title="Wybierz ul" text="Karta ula pojawi się po wybraniu rodziny." />
        )}
      </section>
    </main>
  );
}

function InspectionsView({ hives, inspections, reload }: { hives: Hive[]; inspections: Inspection[]; reload: () => Promise<void> }) {
  const [hiveId, setHiveId] = useState('');
  const [strength, setStrength] = useState(6);
  const [note, setNote] = useState('');
  async function submit(e: FormEvent) {
    e.preventDefault();
    const targetHiveId = hiveId || hives[0]?.id;
    if (!targetHiveId) return;
    await create<Inspection>('inspections', { hiveId: targetHiveId, inspectedAt: new Date().toISOString(), strength, queenSeen: true, eggs: true, openBrood: true, cappedBrood: true, foodLevel: 'średni', note });
    setNote(''); await reload();
  }
  return <main className="page"><div className="pageHeader"><p className="eyebrow">Przeglądy</p><h1>Szybki przegląd ula</h1></div><form className="inspectionForm" onSubmit={submit}><select value={hiveId} onChange={(e) => setHiveId(e.target.value)}>{hives.map((h) => <option key={h.id} value={h.id}>{h.name}</option>)}</select><label>Siła rodziny: {strength}/10<input type="range" min="0" max="10" value={strength} onChange={(e) => setStrength(Number(e.target.value))} /></label><textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Notatka po przeglądzie" /><button className="primaryButton">Zapisz przegląd</button></form><section className="panel"><h2>Historia przeglądów</h2>{inspections.map((i) => <div className="listRow" key={i.id}><strong>{hives.find((h) => h.id === i.hiveId)?.name}</strong><span>{new Date(i.inspectedAt).toLocaleString('pl-PL')} · siła {i.strength}/10 · {i.note}</span></div>)}</section></main>;
}

function SimpleModule({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) {
  return <main className="page"><div className="pageHeader"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div>{children}</main>;
}


function recordTitle(
  type: 'queens' | 'feedings' | 'treatments' | 'tasks',
  item: Queen | Feeding | Treatment | Task,
) {
  if (type === 'queens') {
    const queen = item as Queen;
    return queen.line || queen.name || `Matka ${queen.year ?? ''}`.trim();
  }
  if (type === 'feedings') return (item as Feeding).type;
  if (type === 'treatments') return (item as Treatment).product;
  return (item as Task).title;
}

function recordSubtitle(
  type: 'queens' | 'feedings' | 'treatments' | 'tasks',
  item: Queen | Feeding | Treatment | Task,
  hives: Hive[],
) {
  const hiveName = hives.find((h) => h.id === item.hiveId)?.name || 'Pasieka';
  if (type === 'queens') return `${hiveName} · ${(item as Queen).status}`;
  if (type === 'feedings') {
    const feeding = item as Feeding;
    return `${hiveName} · ${feeding.amount ?? ''}${feeding.unit ?? ''}`.trim();
  }
  if (type === 'treatments') return `${hiveName} · ${(item as Treatment).method || 'leczenie'}`;
  return `${hiveName} · ${(item as Task).status}`;
}

function RecordsView({ type, hives, reload, queens, feedings, treatments, tasks }: { type: 'queens' | 'feedings' | 'treatments' | 'tasks'; hives: Hive[]; reload: () => Promise<void>; queens: Queen[]; feedings: Feeding[]; treatments: Treatment[]; tasks: Task[] }) {
  const [hiveId, setHiveId] = useState('');
  const [text, setText] = useState('');
  const labels = { queens: ['Matki', 'linia / opis matki'], feedings: ['Karmienia', 'np. syrop 1:1 1,5 l'], treatments: ['Leczenie', 'np. Apiwarol / kwas szczawiowy'], tasks: ['Zadania', 'np. sprawdzić matkę za 3 dni'] } as const;
  const data: Array<Queen | Feeding | Treatment | Task> = type === 'queens' ? queens : type === 'feedings' ? feedings : type === 'treatments' ? treatments : tasks;
  async function submit(e: FormEvent) {
    e.preventDefault();
    const selectedHive = hiveId || hives[0]?.id;
    if (!selectedHive) return;
    if (type === 'queens') await create<Queen>('queens', { hiveId: selectedHive, line: text, year: new Date().getFullYear(), status: 'WATCH' });
    if (type === 'feedings') await create<Feeding>('feedings', { hiveId: selectedHive, type: text, amount: 1, unit: 'l', fedAt: new Date().toISOString() });
    if (type === 'treatments') await create<Treatment>('treatments', { hiveId: selectedHive, product: text, treatedAt: new Date().toISOString() });
    if (type === 'tasks') await create<Task>('tasks', { hiveId: selectedHive, title: text, priority: 'NORMAL', status: 'TODO' });
    setText(''); await reload();
  }
  return <SimpleModule eyebrow={labels[type][0]} title={labels[type][0]}><form className="inlineForm" onSubmit={submit}><select value={hiveId} onChange={(e) => setHiveId(e.target.value)}>{hives.map((h) => <option key={h.id} value={h.id}>{h.name}</option>)}</select><input value={text} onChange={(e) => setText(e.target.value)} placeholder={labels[type][1]} required /><button>Dodaj</button></form><section className="panel">{data.length === 0 ? <EmptyState title="Brak wpisów" text="Dodaj pierwszy wpis." /> : data.map((item) => <div className="listRow" key={item.id}><strong>{recordTitle(type, item)}</strong><span>{recordSubtitle(type, item, hives)}</span></div>)}</section></SimpleModule>;
}

function HistoryView({ hives, inspections, feedings, treatments, tasks, notes }: { hives: Hive[]; inspections: Inspection[]; feedings: Feeding[]; treatments: Treatment[]; tasks: Task[]; notes: Note[] }) {
  const timeline = [
    ...inspections.map((x) => ({ date: x.inspectedAt, type: 'Przegląd', hiveId: x.hiveId, text: x.note || `Siła ${x.strength}/10` })),
    ...feedings.map((x) => ({ date: x.fedAt, type: 'Karmienie', hiveId: x.hiveId, text: `${x.type} ${x.amount ?? ''}${x.unit ?? ''}` })),
    ...treatments.map((x) => ({ date: x.treatedAt, type: 'Leczenie', hiveId: x.hiveId, text: x.product })),
    ...tasks.map((x) => ({ date: x.dueAt || new Date().toISOString(), type: 'Zadanie', hiveId: x.hiveId || '', text: x.title })),
    ...notes.map((x) => ({ date: x.createdAt, type: 'Notatka', hiveId: x.hiveId || '', text: x.body })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return <SimpleModule eyebrow="Historia" title="Oś czasu pasieki"><section className="timeline">{timeline.length === 0 ? <EmptyState title="Brak historii" text="Historia pojawi się po dodaniu przeglądów, karmień i zadań." /> : timeline.map((item, index) => <div className="timelineItem" key={`${item.type}-${index}`}><span>{formatDate(item.date)}</span><strong>{item.type} · {hives.find((h) => h.id === item.hiveId)?.name || 'Pasieka'}</strong><p>{item.text}</p></div>)}</section></SimpleModule>;
}

export function App() {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<View>('dashboard');
  const [theme, setTheme] = useState<Theme>('light');
  const [online, setOnline] = useState(navigator.onLine);
  const [syncCount, setSyncCount] = useState(0);
  const [loading, setLoading] = useState(Boolean(getToken()));
  const [apiaries, setApiaries] = useState<Apiary[]>([]);
  const [hives, setHives] = useState<Hive[]>([]);
  const [queens, setQueens] = useState<Queen[]>([]);
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [feedings, setFeedings] = useState<Feeding[]>([]);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  async function reload() {
    const [a, h, q, i, f, tr, ta, n] = await Promise.all([
      list<Apiary>('apiaries'),
      list<Hive>('hives'),
      list<Queen>('queens'),
      list<Inspection>('inspections'),
      list<Feeding>('feedings'),
      list<Treatment>('treatments'),
      list<Task>('tasks'),
      list<Note>('notes'),
    ]);
    setApiaries(a); setHives(h); setQueens(q); setInspections(i); setFeedings(f); setTreatments(tr); setTasks(ta); setNotes(n);
    setSyncCount((await getOfflineQueue()).length);
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); };
  }, []);

  useEffect(() => {
    if (!getToken()) return;
    me().then((result) => { setUser(result.user); return reload(); }).catch(() => setToken(null)).finally(() => setLoading(false));
  }, []);

  const content = useMemo(() => {
    if (view === 'dashboard') return <Dashboard apiaries={apiaries} hives={hives} inspections={inspections} tasks={tasks} reload={reload} />;
    if (view === 'apiaries') return <ApiariesView apiaries={apiaries} reload={reload} />;
    if (view === 'hives') return <HivesView apiaries={apiaries} hives={hives} inspections={inspections} queens={queens} feedings={feedings} treatments={treatments} tasks={tasks} notes={notes} reload={reload} />;
    if (view === 'inspections') return <InspectionsView hives={hives} inspections={inspections} reload={reload} />;
    if (view === 'queens') return <RecordsView type="queens" hives={hives} reload={reload} queens={queens} feedings={feedings} treatments={treatments} tasks={tasks} />;
    if (view === 'feedings') return <RecordsView type="feedings" hives={hives} reload={reload} queens={queens} feedings={feedings} treatments={treatments} tasks={tasks} />;
    if (view === 'treatments') return <RecordsView type="treatments" hives={hives} reload={reload} queens={queens} feedings={feedings} treatments={treatments} tasks={tasks} />;
    if (view === 'tasks') return <RecordsView type="tasks" hives={hives} reload={reload} queens={queens} feedings={feedings} treatments={treatments} tasks={tasks} />;
    return <HistoryView hives={hives} inspections={inspections} feedings={feedings} treatments={treatments} tasks={tasks} notes={notes} />;
  }, [view, apiaries, hives, inspections, queens, feedings, treatments, tasks, notes]);

  if (loading) return <div className="loadingScreen"><Logo /><p>Ładowanie pasieki...</p></div>;
  if (!user) return <AuthScreen onAuth={(nextUser) => { setUser(nextUser); reload(); }} />;

  return <AppShell view={view} setView={setView} theme={theme} setTheme={setTheme} user={user} syncCount={syncCount} online={online} logout={() => { setToken(null); setUser(null); }} >{content}</AppShell>;
}
