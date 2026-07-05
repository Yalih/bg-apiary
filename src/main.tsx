import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalErrorBoundary } from './components/system/GlobalErrorBoundary';
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
import './styles/sprint2.css';
import './styles/fix-2-6-1-navigation.css';
import { registerServiceWorker } from './pwa/registerServiceWorker';

registerServiceWorker();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalErrorBoundary>
      <App />
    </GlobalErrorBoundary>
  </React.StrictMode>
);
