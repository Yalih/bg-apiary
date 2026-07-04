interface WeatherWidgetProps {
  title: string;
  subtitle: string;
  recommendation: string;
  onOpenWeather: () => void;
  onOpenNectar: () => void;
}

export function WeatherWidget({ title, subtitle, recommendation, onOpenWeather, onOpenNectar }: WeatherWidgetProps) {
  return (
    <section className="dashboard-v203-weather" aria-labelledby="weather-widget-title">
      <div className="dashboard-v203-weather__visual" aria-hidden="true">
        <span>☀️</span>
        <i />
      </div>
      <div className="dashboard-v203-weather__content">
        <span>Pogoda i pożytek</span>
        <h2 id="weather-widget-title">{title}</h2>
        <p>{subtitle}</p>
        <strong>{recommendation}</strong>
      </div>
      <div className="dashboard-v203-weather__actions">
        <button onClick={onOpenWeather}>Pogoda</button>
        <button onClick={onOpenNectar}>Pożytek</button>
      </div>
    </section>
  );
}
