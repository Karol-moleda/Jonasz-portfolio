# LISTA ZMIAN - Co musisz zaktualizować po wprowadzeniu wielojęzyczności

## ✅ ZROBIONE - Schematy CMS
- `article.ts` - tytuł jest teraz obiektem {pl, en, it}
- `biography.ts` - tytuł, nagłówki sekcji, treść, timeline  
- `concert.ts` - tytuł, lokalizacja, miejsce, program
- `recording.ts` - tytuł, opis
- `gallery.ts` - tytuł

## ✅ ZROBIONE - Komponenty Angular

### 1. Concerts Component
- ✅ Dodane helper functions
- ✅ Zaktualizowany template HTML

### 2. Articles Component  
- ✅ Dodane helper functions
- ✅ Zaktualizowany template HTML

### 3. Biography Component
- ✅ Dodane helper functions
- ✅ Zaktualizowany template HTML
- ✅ Zaktualizowana funkcja `sectionHtml()`

### 4. Home Component
- ✅ Dodane helper functions dla koncertów
- ✅ Zaktualizowany template HTML

## ❌ DO ZROBIENIA - Pozostałe komponenty

### 5. Recordings Component
```typescript
// Trzeba dodać w recordings.component.ts:
import { getLocalizedText } from '../../utils/translation.utils';

getLocalizedTitle(recording: Recording): string {
  return getLocalizedText(recording.title, this.translationService.getCurrentLanguage());
}

getLocalizedDescription(recording: Recording): string {
  return getLocalizedText(recording.description, this.translationService.getCurrentLanguage());
}
```

```html
<!-- W recordings.component.html zamień: -->
{{ recording.title }} → {{ getLocalizedTitle(recording) }}
{{ recording.description }} → {{ getLocalizedDescription(recording) }}
```

### 6. Gallery Component
```typescript
// Trzeba dodać w gallery.component.ts:
import { getLocalizedText } from '../../utils/translation.utils';

getLocalizedTitle(gallery: Gallery): string {
  return getLocalizedText(gallery.title, this.translationService.getCurrentLanguage());
}
```

```html
<!-- W gallery.component.html zamień: -->
{{ gallery.title }} → {{ getLocalizedTitle(gallery) }}
```

## ❌ DO ZROBIENIA - Modele TypeScript

### 7. Recording Model
```typescript
// W src/app/models/recording.ts dodaj:
import { LocalizedText } from './localized.types';

export interface Recording {
  title: LocalizedText | string;
  description: LocalizedText | string;
  // ... reszta pól
}
```

### 8. Gallery Model  
```typescript
// W src/app/models/galerry.ts dodaj:
import { LocalizedText } from './localized.types';

export interface Gallery {
  title: LocalizedText | string;
  // ... reszta pól
}
```

## ❌ DO ZROBIENIA - Sanity Service

### 9. Zaktualizuj zapytania w sanity.service.ts
```typescript
// Zmień getRecording():
*[_type == "recording"] | order(date desc) {
  title{pl, en, it},
  description{pl, en, it},
  // ... reszta
}

// Zmień getGalleries():
*[_type == "gallery"]{
  title{pl, en, it},
  // ... reszta
}
```

## INSTRUKCJA KROK PO KROK

### Krok 1: Zapisz obecne dane z CMS
Przed uruchomieniem nowego Sanity Studio, upewnij się że masz backup swoich danych!

### Krok 2: Uruchom nowe schematy
```bash
cd jonasz
sanity deploy
```

### Krok 3: Dodaj treści w CMS
W Sanity Studio będziesz musiał **przepisać** wszystkie istniejące treści, bo struktura się zmieniła:
- Stare: `title: "Tekst"`  
- Nowe: `title: {pl: "Tekst", en: "Text", it: "Testo"}`

### Krok 4: Dokończ komponenty
1. Zaktualizuj Recordings Component
2. Zaktualizuj Gallery Component  
3. Zaktualizuj modele TypeScript
4. Zaktualizuj zapytania w Sanity Service

### Krok 5: Testuj
Przetestuj wszystkie strony po przełączeniu języków.

## BŁĘDY KTÓRE MOGĄ WYSTĄPIĆ

### "Cannot read property 'pl' of undefined"
**Przyczyna:** Stare dane w CMS mają jeszcze starą strukturę
**Rozwiązanie:** Dodaj nowe treści w CMS lub zrób migrację danych

### "Property 'title' does not exist"  
**Przyczyna:** Model TypeScript nie został zaktualizowany
**Rozwiązanie:** Dodaj `LocalizedText | string` do typu

### Puste treści na stronie
**Przyczyna:** Brak tłumaczeń w wybranym języku
**Rozwiązanie:** Dodaj treści we wszystkich językach lub sprawdź fallback

## PLAN AWARYJNY

Jeśli coś się zepsuje, możesz:
1. Wrócić do starych schematów (commit przed zmianami)
2. Albo dokończyć wszystkie zmiany używając tej listy

Zalecam dokończenie wszystkich zmian - system będzie wtedy w pełni wielojęzyczny! 🌍
