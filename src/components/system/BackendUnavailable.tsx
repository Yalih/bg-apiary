interface BackendUnavailableProps {
  message?: string;
  onRetry: () => void;
}

export function BackendUnavailable({ message, onRetry }: BackendUnavailableProps) {
  return (
    <main className="backend-unavailable">
      <section className="backend-unavailable__card">
        <span className="backend-unavailable__eyebrow">BG Apiary API</span>
        <h1>Backend unavailable</h1>
        <p>
          Aplikacja działa już w trybie klient-serwer. Dane pasiek, uli i przeglądów nie są zapisywane w localStorage.
          Backend musi być dostępny, żeby kontynuować pracę.
        </p>
        {message && <pre>{message}</pre>}
        <button className="primary" type="button" onClick={onRetry}>Ponów połączenie</button>
      </section>
    </main>
  );
}
