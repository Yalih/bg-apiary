import type { View } from '../App';

export const RC2_MAIN_VIEW: View = 'dashboard';

export const RC2_BOTTOM_NAV_LABELS = ['Panel', 'Pasieki', 'Prace', 'Asystent', 'Więcej'] as const;

export const RC2_MORE_ADMIN_SECTIONS = [
  'Konto i profil',
  'Synchronizacja',
  'Współdzielenie',
  'Uprawnienia',
  'Dziennik zmian',
  'Wersje danych',
  'Kopia zapasowa',
  'Zarządzanie danymi',
  'Informacje o aplikacji'
] as const;

export const RC2_MAIN_USER_PATHS = [
  'nowy użytkownik → pusty Panel → dodaj pasiekę / importuj backup',
  'użytkownik z danymi → Panel → najważniejsze prace / alerty / rekomendacje',
  'użytkownik → Prace → Ul → Formularz',
  'użytkownik → Panel → wyszukiwarka → ul/pasieka/zadanie',
  'użytkownik → Więcej → kopia zapasowa / synchronizacja / konto'
] as const;

export const RC2_POLISH_LABELS = {
  dashboard: 'Panel',
  backup: 'Kopia zapasowa',
  sync: 'Synchronizacja',
  auditLog: 'Dziennik zmian',
  permissions: 'Uprawnienia',
  sharing: 'Współdzielenie'
} as const;

export function isRc2MainExperienceVisible() {
  return RC2_MAIN_VIEW === 'dashboard' && RC2_BOTTOM_NAV_LABELS[0] === 'Panel';
}
