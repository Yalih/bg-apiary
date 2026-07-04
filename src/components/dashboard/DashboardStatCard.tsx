interface DashboardStatCardProps {
  label: string;
  value: string | number;
  description: string;
  icon: string;
  tone?: 'honey' | 'green' | 'blue' | 'red' | 'graphite';
}

export function DashboardStatCard({ label, value, description, icon, tone = 'honey' }: DashboardStatCardProps) {
  return (
    <article className={`dashboard-v203-stat dashboard-v203-stat--${tone}`}>
      <span className="dashboard-v203-stat__icon" aria-hidden="true">{icon}</span>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        <small>{description}</small>
      </div>
    </article>
  );
}
