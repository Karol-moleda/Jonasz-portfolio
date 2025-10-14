# Instrukcja dodawania galerii w Sanity

## Jak dodać nową galerię zdjęć

1. **Otwórz Sanity Studio** (prawdopodobnie dostępne pod `http://localhost:3333` lub podobnym adresem)

2. **Wybierz "Concert gallery"** z menu po lewej stronie

3. **Kliknij "Create new"** żeby stworzyć nową galerię

4. **Wypełnij podstawowe informacje:**
   - **Tytuł galerii** - podaj nazwę galerii (np. "Klub Studio", "Koncert w Krakowie")
   - **Miejsce koncertu** - wybierz lokalizację z listy
   - **Data koncertu** - opcjonalnie podaj datę
   - **Opis galerii** - opcjonalny krótki opis

5. **Dodawanie zdjęć (DRAG & DROP):**
   - W sekcji "Zdjęcia" możesz teraz **przeciągnąć i upuścić wiele zdjęć naraz**
   - Po przeciągnięciu zdjęć do obszaru, Sanity automatycznie je przetworzy
   - **Nie musisz dodawać opisu do każdego zdjęcia** - pole "Alt text" jest teraz opcjonalne
   - Jeśli nie podasz alt tekstu, zostanie automatycznie wygenerowany z nazwy galerii

6. **Zapisz** galerię klikając "Publish"

## Zmiany które zostały wprowadzone

✅ **Usunięto obowiązkowe pole "Alt text"** - teraz można dodawać zdjęcia bez opisów
✅ **Usunięto pole "Autor zdjęcia"** - uprościliśmy formularz
✅ **Dodano obsługę drag & drop** dla wielu plików naraz
✅ **Automatyczne generowanie alt tekstu** na podstawie nazwy galerii
✅ **Dodano ograniczenia formatu plików** (.jpg, .jpeg, .png, .webp)

## Efekt

Teraz zamiast dodawać 30 zdjęć po jednym i wypełniać formularz dla każdego, możesz:
1. Przeciągnąć wszystkie 30 zdjęć naraz
2. Podać tylko nazwę galerii i podstawowe informacje
3. Zapisać - gotowe!

Alt tekst dla zdjęć będzie automatycznie generowany jako: "Nazwa galerii - Zdjęcie 1", "Nazwa galerii - Zdjęcie 2", itd.