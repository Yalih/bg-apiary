import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { applyThemePreference, getStoredThemePreference } from './theme';
import { registerServiceWorker } from './pwa/registerServiceWorker';
import './styles/design-tokens.css';
import './styles/layout.css';
import './styles/ui.css';
import './styles/mobile-polish.css';
import './styles/final-polish.css';
import './styles.css';
import './styles/bgApiaryAssetPack.css';
import './styles/premiumVisualSystem21.css';
import './styles/premiumDashboard21.css';
import './styles/premiumHiveExperience21.css';
import './styles/hiveDetailsIconPolish21.css';
import './styles/apiaryLocationDashboard21.css';
import './styles/apiaryMapPolish21.css';
import './styles/gpsLocation21.css';
import './styles/apiaryEditGps21.css';

applyThemePreference(getStoredThemePreference());
registerServiceWorker();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
