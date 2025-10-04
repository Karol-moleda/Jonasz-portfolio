# System zarządzania biletami - Instrukcja

## Opis funkcjonalności

Nowy system zarządzania biletami umożliwia elastyczne zarządzanie różnymi typami koncertów:

### Typy koncertów:

1. **Wstęp wolny** (`free`) - koncerty bezpłatne
2. **Bilety płatne** (`paid`) - koncerty wymagające zakupu biletów
3. **Wymagana rejestracja** (`registration`) - koncerty z obowiązkową rejestracją

## Jak konfigurować w Sanity Studio

### 1. Dodawanie nowego koncertu

W Sanity Studio, w sekcji koncertów, znajdziesz nową sekcję **"Ticketing Information"**:

#### Krok 1: Wybierz typ koncertu
- **Free Entry** - dla koncertów bezpłatnych
- **Paid Tickets** - dla koncertów płatnych
- **Registration Required** - dla koncertów wymagających rejestracji

#### Krok 2: Dodaj odpowiednie linki

**Dla wszystkich typów koncertów:**
- **Event Link** - link do strony wydarzenia (np. Facebook Event, strona organizatora)

**Dla koncertów płatnych (Paid Tickets):**
- **Ticket Purchase Link** - link do systemu sprzedaży biletów
- **Price** - cena biletu w trzech językach (pl/en/it)

**Dla koncertów z rejestracją (Registration Required):**
- **Registration Link** - link do formularza rejestracji

### 2. Przykłady konfiguracji

#### Koncert bezpłatny:
```
Type: Free Entry
Event Link: https://facebook.com/events/12345
Price: (ukryte)
```

#### Koncert płatny:
```
Type: Paid Tickets
Event Link: https://facebook.com/events/12345
Ticket Purchase Link: https://bilety.pl/koncert-jonasza
Price: 
  - PL: "25 zł"
  - EN: "25 PLN"
  - IT: "25 PLN"
```

#### Koncert z rejestracją:
```
Type: Registration Required
Event Link: https://facebook.com/events/12345
Registration Link: https://forms.google.com/rejestracja
```

## Jak wygląda na stronie

### Koncerty bezpłatne:
- Zielona odznaka "Wstęp wolny" 
- Przycisk "Więcej informacji" (jeśli podano Event Link)

### Koncerty płatne:
- Wyświetlana cena biletu
- Przycisk "Bilety" (link do sprzedaży)
- Przycisk "Strona wydarzenia" (jeśli podano Event Link)

### Koncerty z rejestracją:
- Przycisk "Zapisz się" (link do rejestracji)
- Przycisk "Więcej informacji" (jeśli podano Event Link)

## Kompatybilność wsteczna

System jest w pełni kompatybilny ze starymi koncertami. Jeśli koncert ma tylko pole `ticketLink` (stary system), automatycznie wyświetli się przycisk "Bilety".

## Responsive Design

System jest w pełni responsywny:
- Na urządzeniach mobilnych przyciski układają się w kolumnie
- Odznaka "Wstęp wolny" centruje się na małych ekranach
- Cena wyświetla się pod tytułem na urządzeniach mobilnych

## Tłumaczenia

System obsługuje tłumaczenia w trzech językach (pl/en/it):
- `concerts.freeEntry` - "Wstęp wolny" / "Free Entry" / "Ingresso gratuito"
- `concerts.moreInfo` - "Więcej informacji" / "More Information" / "Maggiori informazioni"
- `concerts.register` - "Zapisz się" / "Register" / "Registrati"
- `concerts.eventPage` - "Strona wydarzenia" / "Event Page" / "Pagina evento"
- `concerts.price` - "Cena" / "Price" / "Prezzo"