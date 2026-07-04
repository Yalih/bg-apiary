# Sprint 2.0.4 - UI Component System

## Cel

Sprint 2.0.4 tworzy wspólny system komponentów UI dla BG Apiary. Celem jest spójny interfejs, który można rozwijać w kolejnych sprintach bez kopiowania stylów między ekranami jak średniowieczny skryba przepisujący błędy.

## Zakres wykonany

Dodano komponenty:

- `Button` - przyciski z wariantami `primary`, `secondary`, `ghost`, `danger`, rozmiarami `sm`, `md`, `lg` i opcją `fullWidth`.
- `Card` - karta z nagłówkiem, eyebrow, akcjami i tonami wizualnymi.
- `Badge` - etykiety statusu dla neutral, honey, success, warning, danger i info.
- `Input` - pole tekstowe z etykietą, hintem, błędem i ikoną.
- `Select` - lista wyboru z etykietą, hintem i błędem.
- `Modal` - dostępne okno dialogowe z backdropem, nagłówkiem i stopką akcji.
- `EmptyState` - gotowy wzorzec dla braku danych.
- `PageHeader` - spójny nagłówek strony z akcjami.

## Pliki dodane

```text
src/components/ui/Button.tsx
src/components/ui/Card.tsx
src/components/ui/Badge.tsx
src/components/ui/Input.tsx
src/components/ui/Select.tsx
src/components/ui/Modal.tsx
src/components/ui/EmptyState.tsx
src/components/ui/PageHeader.tsx
src/components/ui/index.ts
src/styles/ui.css
docs/SPRINT_2_0_4_UI_COMPONENTS.md
```

## Pliki zmienione

```text
src/main.tsx
index.html
package.json
public/manifest.webmanifest
README.md
CHANGELOG.md
docs/CHANGELOG.md
```

## Zasady użycia

Import zbiorczy:

```tsx
import { Button, Card, Badge, Input, Select, Modal, EmptyState, PageHeader } from './components/ui';
```

Przykład:

```tsx
<Card eyebrow="Pasieka" title="Stan rodzin" tone="honey" actions={<Button size="sm">Dodaj</Button>}>
  <Badge tone="success" dot>Stabilnie</Badge>
</Card>
```

## Kryteria akceptacji

- Komponenty istnieją jako realne pliki TSX.
- Style komponentów są w `src/styles/ui.css`.
- `ui.css` jest podłączony w `src/main.tsx`.
- Build produkcyjny przechodzi.
- Nie ruszano backendu ani bazy danych.
- Nie przebudowywano dashboardu w tym sprincie.

## Wynik testu

```bash
npm install
npm run build
```

Status: build przechodzi.
