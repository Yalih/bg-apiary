interface QuickActionCardProps {
  title: string;
  description: string;
  icon: string;
  onClick: () => void;
}

export function QuickActionCard({ title, description, icon, onClick }: QuickActionCardProps) {
  return (
    <button className="quick-action-card-v23" onClick={onClick}>
      <span aria-hidden="true">{icon}</span>
      <strong>{title}</strong>
      <small>{description}</small>
    </button>
  );
}
