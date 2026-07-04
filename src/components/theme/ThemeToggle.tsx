import { useEffect, useMemo, useState } from 'react';
import {
  applyThemePreference,
  getStoredThemePreference,
  getSystemTheme,
  storeThemePreference,
  type ThemePreference
} from '../../theme';

const themeOptions: Array<{ value: ThemePreference; label: string; short: string; icon: string }> = [
  { value: 'light', label: 'Tryb jasny', short: 'Jasny', icon: '☀️' },
  { value: 'dark', label: 'Tryb ciemny', short: 'Ciemny', icon: '🌙' },
  { value: 'system', label: 'Tryb systemowy', short: 'System', icon: '💻' }
];

export function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>(() => getStoredThemePreference());
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => getSystemTheme());

  useEffect(() => {
    applyThemePreference(preference);
    storeThemePreference(preference);
  }, [preference]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      setSystemTheme(media.matches ? 'dark' : 'light');
      if (getStoredThemePreference() === 'system') {
        applyThemePreference('system');
      }
    };

    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const activeOption = useMemo(
    () => themeOptions.find(option => option.value === preference) ?? themeOptions[2],
    [preference]
  );

  const cycleTheme = () => {
    const currentIndex = themeOptions.findIndex(option => option.value === preference);
    const nextOption = themeOptions[(currentIndex + 1) % themeOptions.length];
    setPreference(nextOption.value);
  };

  return (
    <div className="theme-toggle" aria-label="Wybór motywu aplikacji">
      <button
        type="button"
        className="theme-toggle__button"
        onClick={cycleTheme}
        aria-label={`Zmień motyw. Aktualnie: ${activeOption.label}`}
        title={`Motyw: ${activeOption.short}`}
      >
        <span aria-hidden="true">{activeOption.icon}</span>
        <strong>{activeOption.short}</strong>
        {preference === 'system' && <small>{systemTheme === 'dark' ? 'ciemny' : 'jasny'}</small>}
      </button>

      <div className="theme-toggle__segments" role="group" aria-label="Tryb kolorystyczny">
        {themeOptions.map(option => (
          <button
            key={option.value}
            type="button"
            className={option.value === preference ? 'is-active' : ''}
            onClick={() => setPreference(option.value)}
            aria-pressed={option.value === preference}
            title={option.label}
          >
            <span aria-hidden="true">{option.icon}</span>
            <span>{option.short}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
