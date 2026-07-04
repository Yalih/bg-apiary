interface QuickActionsProps {
  onInspection: () => void;
  onFeeding: () => void;
  onNote: () => void;
}

export function QuickActions({ onInspection, onFeeding, onNote }: QuickActionsProps) {
  return (
    <div className="quick-actions">
      <button onClick={onInspection}>+ Przegląd</button>
      <button onClick={onFeeding}>+ Karmienie</button>
      <button onClick={onNote}>+ Notatka</button>
    </div>
  );
}
