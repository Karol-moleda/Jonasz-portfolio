# Instrukcje obsługi wielojęzyczności w CMS

## Zmiany w schematach Sanity CMS

Zaktualizowałem schematy w Sanity CMS, aby obsługiwały wielojęzyczność:

### 1. Struktura pól językowych

Każde pole tekstowe zostało zastąpione obiektem z trzema wersjami językowymi:

```typescript
// Przed:
title: 'string'

// Po:
title: {
  pl: 'string',
  en: 'string', 
  it: 'string'
}
```

### 2. Zaktualizowane schematy

- **article.ts** - tytuł artykułu
- **biography.ts** - tytuł, nagłówki sekcji, treść, timeline
- **concert.ts** - tytuł, lokalizacja, miejsce, program

### 3. Przykład dodawania treści w CMS

W Sanity Studio będziesz widział pola w taki sposób:

```
Title:
├── Polski: "Koncert w Filharmonii"
├── English: "Concert at Philharmonic"
└── Italiano: "Concerto alla Filarmonica"
```

## Zmiany w aplikacji Angular

### 1. Nowe typy TypeScript

Utworzyłem `src/app/models/localized.types.ts`:

```typescript
export interface LocalizedText {
  pl?: string;
  en?: string;
  it?: string;
}
```

### 2. Helper functions

Utworzyłem `src/app/utils/translation.utils.ts` z funkcjami:

- `getLocalizedText()` - dla zwykłego tekstu
- `getLocalizedContent()` - dla rich text/bloków

### 3. Przykład użycia w komponencie

```typescript
// W komponencie:
getLocalizedTitle(concert: Concert): string {
  return getLocalizedText(concert.title, this.translationService.getCurrentLanguage());
}

// W template:
{{ getLocalizedTitle(concert) }}
```

## Jak dodawać nową treść

### 1. W Sanity Studio

1. Otwórz Sanity Studio
2. Wybierz typ dokumentu (np. Concert)
3. Kliknij "Create new"
4. Wypełnij pola we wszystkich językach:
   - **Polski** - obowiązkowy (fallback)
   - **English** - opcjonalny
   - **Italiano** - opcjonalny

### 2. W kodzie aplikacji

Jeśli dodajesz nowy komponent, użyj helper functions:

```typescript
import { getLocalizedText } from '../../utils/translation.utils';

// W komponencie:
getLocalizedDescription(item: YourModel): string {
  return getLocalizedText(item.description, this.translationService.getCurrentLanguage());
}
```

## Fallback języków

System automatycznie wybiera język według priorytetu:
1. Aktualnie wybrany język
2. Polski (domyślny fallback)
3. Pierwszy dostępny język

## Co zostało zaktualizowane

✅ **Schematy Sanity CMS**
- article.ts
- biography.ts  
- concert.ts

✅ **Modele TypeScript**
- article.ts
- biography.ts
- concert.ts
- localized.types.ts (nowy)

✅ **Services**
- sanity.service.ts - zapytania pobierają wszystkie języki
- translation.service.ts - używa wspólnych typów

✅ **Components**
- concerts.component.ts - przykład użycia
- articles.component.ts - przykład użycia
- header.component.ts - zaktualizowane importy

✅ **Utils**
- translation.utils.ts (nowy) - helper functions

## Następne kroki

1. **Uruchom Sanity Studio** i dodaj treści w różnych językach
2. **Przetestuj** przełączanie języków na stronie
3. **Zaktualizuj pozostałe komponenty** (biography, gallery, recordings)
4. **Dodaj walidację** w Sanity Studio (np. wymagaj polskiego języka)

## Problemy i rozwiązania

### Problem: "Property 'pl' does not exist"
**Rozwiązanie:** Zaktualizuj typy w modelach, używając `LocalizedText | string`

### Problem: Puste treści przy przełączaniu języków  
**Rozwiązanie:** Sprawdź czy dane w CMS mają wypełnione pola językowe

### Problem: Błędy TypeScript
**Rozwiązanie:** Sprawdź czy wszystkie importy używają nowych typów z `localized.types.ts`
