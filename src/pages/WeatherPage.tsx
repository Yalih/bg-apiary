import { useEffect, useState } from 'react';
import type { ApiaryState } from '../models/apiary';
import { BgApiaryIcon } from '../components/bgapiary/BgApiaryIcon';
import { getCurrentNectarFlow } from '../logic/nectarAccuracy21';
import {
  AccurateWeatherSnapshot,
  buildDashboardWeatherCard,
  buildMissingLocationWeather,
  fetchOpenMeteoWeatherForApiary,
  getApiaryCoordinates,
  selectApiaryForWeather
} from '../logic/weatherAccuracy21';

interface WeatherPageProps {
  state: ApiaryState;
  onBack: () => void;
}

export function WeatherPage({ state, onBack }: WeatherPageProps) {
  const apiary = selectApiaryForWeather(state);
  const [weather, setWeather] = useState<AccurateWeatherSnapshot>(() => buildMissingLocationWeather(apiary));
  const coords = getApiaryCoordinates(apiary ?? undefined);

  useEffect(() => {
    let cancelled = false;
    if (!apiary) {
      setWeather(buildMissingLocationWeather(null));
      return;
    }
    if (!coords) {
      setWeather(buildMissingLocationWeather(apiary));
      return;
    }
    fetchOpenMeteoWeatherForApiary(apiary).then(snapshot => {
      if (!cancelled) setWeather(snapshot);
    });
    return () => {
      cancelled = true;
    };
  }, [apiary?.id, coords?.latitude, coords?.longitude]);

  const card = buildDashboardWeatherCard(weather);
  const nectar = getCurrentNectarFlow(state, apiary, weather);
  const forecast = [
    { day: 'Dziś', temp: weather.temperatureC ?? 0, rain: weather.precipitationMm ?? 0, icon: 'pogoda' as const },
    { day: '+1 dzień', temp: weather.temperatureC ?? 0, rain: weather.precipitationMm ?? 0, icon: 'pogoda' as const },
    { day: '+2 dni', temp: weather.temperatureC ?? 0, rain: weather.precipitationMm ?? 0, icon: 'pogoda' as const },
    { day: '+3 dni', temp: weather.temperatureC ?? 0, rain: weather.precipitationMm ?? 0, icon: 'pogoda' as const }
  ];

  return (
    <div className="bgs-weather-page">
      <button className="back-button premium-back" onClick={onBack}>‹ Pulpit</button>
      <section className="bgs-weather-hero">
        <div>
          <span>Pogoda</span>
          <h1>{apiary?.name ?? 'Pasieka'}</h1>
          <p>{card.sourceLabel}</p>
        </div>
        <button className="bgs-refresh-button" aria-label="Odśwież pogodę">↻</button>
      </section>

      <section className="bgs-weather-current">
        <BgApiaryIcon name="pogoda" label="Pogoda" size={72} />
        <div>
          <span>Aktualnie</span>
          <strong>{card.title}</strong>
          <p>{card.recommendation}</p>
        </div>
      </section>

      <section className="bgs-weather-grid">
        <article><span>Odczuwalna</span><strong>{Math.round(weather.apparentTemperatureC ?? weather.temperatureC ?? 0)}°C</strong></article>
        <article><span>Wiatr</span><strong>{Math.round(weather.windKmh ?? 0)} km/h</strong></article>
        <article><span>Opady</span><strong>{weather.precipitationMm ?? 0} mm</strong></article>
        <article><span>Wilgotność</span><strong>{Math.round(weather.humidityPct ?? 0)}%</strong></article>
        <article><span>UV</span><strong>{Math.round(weather.uvIndex ?? 0)}</strong></article>
        <article><span>Zachmurzenie</span><strong>{Math.round(weather.cloudCoverPct ?? 0)}%</strong></article>
      </section>

      <section className="bgs-recommendation-card">
        <span>Rekomendacja dla pszczelarza</span>
        <strong>{weather.recommendation}</strong>
        <p>{weather.source === 'missing-location' ? 'Dodaj współrzędne pasieki, aby prognoza była dokładna.' : 'Dane pogodowe z Open-Meteo dla lokalizacji pasieki.'}</p>
      </section>

      <section className="bgs-forecast-list">
        {forecast.map(item => (
          <article key={item.day}>
            <BgApiaryIcon name={item.icon} label="Prognoza" />
            <div>
              <strong>{item.day}</strong>
              <span>{Math.round(item.temp)}°C · opady {item.rain} mm</span>
            </div>
          </article>
        ))}
      </section>

      <section className="bgs-recommendation-card">
        <span>Pożytek a pogoda</span>
        <strong>{nectar.name}</strong>
        <p>{nectar.recommendation} · {nectar.label}</p>
      </section>
    </div>
  );
}
