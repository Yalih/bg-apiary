import type { View } from '../App';
import { BgApiaryIcon } from './bgapiary/BgApiaryIcon';
import { BG_APIARY_NAV } from '../logic/bgApiaryPremium20';

interface BottomNavProps {
  view: View;
  onNavigate: (view: View) => void;
}

export const bottomNavItems: Array<{ view: View; label: string; iconName: 'pulpit' | 'ule' | 'zadania' | 'planSezonu' | 'wiecej' }> = [
  { view: 'dashboard', label: BG_APIARY_NAV[0], iconName: 'pulpit' },
  { view: 'apiaries', label: BG_APIARY_NAV[1], iconName: 'ule' },
  { view: 'assistant', label: BG_APIARY_NAV[2], iconName: 'zadania' },
  { view: 'workCenter', label: BG_APIARY_NAV[3], iconName: 'planSezonu' },
  { view: 'more', label: BG_APIARY_NAV[4], iconName: 'wiecej' }
];

export function BottomNav({ view, onNavigate }: BottomNavProps) {
  return (
    <nav className="bottom-nav bgapiary-bottom-nav" aria-label="Główna nawigacja">
      {bottomNavItems.map(item => (
        <button
          key={item.view}
          className={view === item.view ? 'active' : ''}
          onClick={() => onNavigate(item.view)}
        >
          <BgApiaryIcon name={item.iconName} label={item.label === "+" ? "Dodaj" : item.label} />
          <small>{item.label}</small>
        </button>
      ))}
    </nav>
  );
}
