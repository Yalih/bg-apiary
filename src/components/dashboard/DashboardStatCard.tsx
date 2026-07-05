interface DashboardStatCardProps {
  label: string;
  value: string | number;
  note: string;
  tone?: 'gold' | 'green' | 'blue' | 'red';
}

export function DashboardStatCard({ label, value, note, tone = 'gold' }: DashboardStatCardProps) {
  return (
    <article className={`dashboard-stat-card-v23 tone-${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  );
}
