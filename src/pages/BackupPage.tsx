import { useState } from 'react';
import type { ApiaryState } from '../models/apiary';
import { createBackup, downloadBackup, restoreBackup, validateBackup } from '../logic/backup';
import { Section } from '../components/Section';
import { StatCard } from '../components/StatCard';
import { getGlobalStats } from '../logic/statistics';

interface BackupPageProps {
  state: ApiaryState;
  onRestore: (state: ApiaryState) => void;
}

export function BackupPage({ state, onRestore }: BackupPageProps) {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const stats = getGlobalStats(state);
  const backup = createBackup(state);

  function exportNow() {
    downloadBackup(state);
    setMessage('Eksport rozpoczęty. Zapisz plik w bezpiecznym miejscu, nie w cyfrowej szufladzie bez nazwy.');
    setMessageType('success');
  }

  async function handleImport(file?: File) {
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (!validateBackup(data)) {
        setMessage('Ten plik nie wygląda jak kopia BgApiary. Import przerwany.');
        setMessageType('error');
        return;
      }
      onRestore(restoreBackup(data));
      setMessage('Kopia przywrócona i zapisana lokalnie w tej przeglądarce.');
      setMessageType('success');
    } catch {
      setMessage('Nie udało się odczytać pliku kopii. Sprawdź, czy to poprawny JSON z BgApiary.');
      setMessageType('error');
    }
  }

  return (
    <>
      <section className="backup-hero">
        <div>
          <span>Kopia zapasowa</span>
          <h1>Eksport i import danych</h1>
          <p>Dane są zapisane lokalnie w tej przeglądarce. Eksportuj kopię regularnie, bo localStorage nie jest sejfem, tylko szufladą z etykietą.</p>
        </div>
        <div className="backup-version">
          <strong>{backup.version}</strong>
          <small>wersja backupu</small>
        </div>
      </section>

      <div className="backup-stats-grid">
        <StatCard label="Pasieki" value={stats.apiaries} />
        <StatCard label="Ule" value={stats.hives} />
        <StatCard label="Zdjęcia" value={stats.photos} />
        <StatCard label="Zadania" value={stats.openTasks} />
      </div>

      {message && <div className={`card backup-message backup-message-${messageType}`}><strong>{message}</strong></div>}

      <Section title="Eksport JSON">
        <div className="card backup-action-card">
          <strong>Co zawiera kopia?</strong>
          <p>Pasieki, ule, przeglądy, karmienia, notatki, zdjęcia, historię, zadania, wersję backupu i roadmapę.</p>
          <button className="primary full" onClick={exportNow}>Eksportuj dane</button>
        </div>
      </Section>

      <Section title="Import kopii">
        <div className="form-card backup-import-panel">
          <div className="backup-warning">
            <strong>Uwaga</strong>
            <p>Import przywraca dane z pliku i zapisuje je lokalnie. Używaj tylko kopii wygenerowanej przez BgApiary.</p>
          </div>
          <label>
            Plik JSON
            <input type="file" accept="application/json,.json" onChange={event => handleImport(event.target.files?.[0])} />
          </label>
        </div>
      </Section>

      <Section title="Plan 1.1+">
        <div className="card roadmap-card">
          <p>Te rzeczy są celowo odłożone na następny etap, żeby 1.0.x pozostało stabilne.</p>
          <ul>
            {backup.roadmap10plus.map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </Section>
    </>
  );
}
