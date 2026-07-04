import type { ApiaryState } from '../models/apiary';
import { BgApiaryIllustration } from '../components/bgapiary/BgApiaryIllustration';
import { getCurrentNectarFlow } from '../logic/nectarAccuracy21';
import { buildMissingLocationWeather, getApiaryCoordinates, selectApiaryForWeather } from '../logic/weatherAccuracy21';

interface NectarPageProps {
  state: ApiaryState;
  onBack: () => void;
}

export function NectarPage({ state, onBack }: NectarPageProps) {
  const apiary = selectApiaryForWeather(state);
  const coords = getApiaryCoordinates(apiary ?? undefined);
  const weather = buildMissingLocationWeather(apiary);
  const nectar = getCurrentNectarFlow(state, apiary, coords ? { ...weather, source: 'offline-cache', recommendation: 'Dane pogodowe z Open-Meteo' } : weather);
  const progress = nectar.phase === 'start' ? 25 : nectar.phase === 'pełnia' ? 55 : nectar.phase === 'końcówka' ? 82 : 0;

  return (
    <div className="bgs-nectar-page">
      <button className="back-button premium-back" onClick={onBack}>‹ Pulpit</button>
      <section className="bgs-nectar-hero-page">
        <div>
          <span>Pożytek</span>
          <h1>{nectar.name}</h1>
          <p>{nectar.phase} · {nectar.strength}</p>
        </div>
        <BgApiaryIllustration name="pozytekLipa" label="Ilustracja pożytku" />
      </section>

      <section className="bgs-nectar-status-card">
        <span>{nectar.label}</span>
        <strong>{nectar.name}</strong>
        <p>{nectar.recommendation}</p>
        <div className="bgs-season-progress">
          <i style={{ width: `${progress}%` }} />
        </div>
        <div className="bgs-season-labels">
          <small>Start</small>
          <small>Pełnia</small>
          <small>Końcówka</small>
        </div>
      </section>

      <section className="bgs-recommendation-card">
        <span>Źródło</span>
        <strong>{nectar.source === 'manual' ? 'Dane lokalne pasieki' : 'Kalendarz lokalny'}</strong>
        <p>{coords ? 'Pożytek połączony z lokalizacją pasieki i pogodą.' : 'Dodaj lokalizację pasieki, aby dokładniej ocenić pożytek.'}</p>
      </section>
    </div>
  );
}
