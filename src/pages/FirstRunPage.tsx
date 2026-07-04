interface FirstRunPageProps {
  onCreateApiary: () => void;
  onImportBackup: () => void;
}

export function FirstRunPage({ onCreateApiary, onImportBackup }: FirstRunPageProps) {
  return (
    <main className="first-run-screen">
      <section className="first-run-card">
        <div className="first-run-hero">
          <span>Nowe konto</span>
          <h1>Witaj w BgApiary</h1>
          <p>Tu nie ma cudzych uli ani danych demo. Zaczynasz od własnej pasieki, jak człowiek, który jednak szanuje porządek.</p>
        </div>

        <div className="first-run-actions">
          <button className="primary full" onClick={onCreateApiary}>🐝 Dodaj pierwszą pasiekę</button>
          <button className="wide-action secondary-map-action" onClick={onImportBackup}>💾 Importuj backup</button>
        </div>

        <div className="auth-note">
          Dane są lokalne i przypisane do aktualnego konta testowego. Każdy użytkownik ma własny zapis w localStorage.
        </div>
      </section>
    </main>
  );
}
