import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './styles.css';

const APP_VERSION = '1.0.4';
const VERSION_KEY = 'bg_apiary_app_version';
const RELOAD_KEY = 'bg_apiary_reloaded_for_1_0_4';

async function prepareServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  try {
    const previous = localStorage.getItem(VERSION_KEY);

    if (previous !== APP_VERSION) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.unregister()));

      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => caches.delete(key)));
      }

      localStorage.setItem(VERSION_KEY, APP_VERSION);

      if (navigator.serviceWorker.controller && !sessionStorage.getItem(RELOAD_KEY)) {
        sessionStorage.setItem(RELOAD_KEY, '1');
        window.location.reload();
        return;
      }
    }

    await navigator.serviceWorker.register(`/sw.js?v=${APP_VERSION}`, { updateViaCache: 'none' });
  } catch {
    // PWA cache cleanup is best-effort. App must still render.
  }
}

window.addEventListener('load', () => {
  void prepareServiceWorker();
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
