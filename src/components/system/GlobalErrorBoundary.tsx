import React from 'react';

interface GlobalErrorBoundaryState {
  hasError: boolean;
  message?: string;
}

export class GlobalErrorBoundary extends React.Component<React.PropsWithChildren, GlobalErrorBoundaryState> {
  state: GlobalErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): GlobalErrorBoundaryState {
    return { hasError: true, message: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="backend-unavailable">
          <section className="backend-unavailable__card">
            <span className="backend-unavailable__eyebrow">BG Apiary</span>
            <h1>Wystąpił błąd aplikacji</h1>
            <p>Odśwież stronę. Jeśli problem wraca, sprawdź logi wdrożenia.</p>
            {this.state.message && <pre>{this.state.message}</pre>}
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
