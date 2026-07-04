export type ThemePreference = 'light' | 'dark' | 'system';

export const THEME_STORAGE_KEY = 'bg-apiary-theme-preference';

export const themePreferences: ThemePreference[] = ['light', 'dark', 'system'];

export function isThemePreference(value: string | null): value is ThemePreference {
  return value === 'light' || value === 'dark' || value === 'system';
}

export function getStoredThemePreference(): ThemePreference {
  if (typeof window === 'undefined') return 'system';
  const value = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isThemePreference(value) ? value : 'system';
}

export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function resolveTheme(preference: ThemePreference): 'light' | 'dark' {
  return preference === 'system' ? getSystemTheme() : preference;
}

export function applyThemePreference(preference: ThemePreference): 'light' | 'dark' {
  const resolvedTheme = resolveTheme(preference);

  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    root.dataset.themeMode = preference;

    if (preference === 'system') {
      root.removeAttribute('data-theme');
    } else {
      root.dataset.theme = preference;
    }

    root.style.colorScheme = resolvedTheme;
  }

  return resolvedTheme;
}

export function storeThemePreference(preference: ThemePreference): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(THEME_STORAGE_KEY, preference);
}
