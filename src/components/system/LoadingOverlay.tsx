interface LoadingOverlayProps {
  message?: string;
}

export function LoadingOverlay({ message = 'Łączenie z backendem BG Apiary...' }: LoadingOverlayProps) {
  return (
    <main className="loading-overlay">
      <div className="loading-overlay__spinner" aria-hidden="true" />
      <p>{message}</p>
    </main>
  );
}
