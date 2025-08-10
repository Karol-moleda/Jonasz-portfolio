import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export type Language = 'pl' | 'en';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  // Statyczne dane tłumaczeń
  private staticTranslations = {
    pl: {
      "navigation": {
        "home": "Strona główna",
        "biography": "Biografia",
        "concerts": "Koncerty",
        "articles": "Artykuły",
        "gallery": "Galeria",
        "recordings": "Nagrania",
        "contact": "Kontakt"
      },
      "home": {
        "title": "Jonasz Jochymczyk",
        "subtitle": "Pianista • Kompozytor • Artysta",
        "hero": {
          "title": "Witaj w świecie muzyki",
          "description": "Odkryj magiczny świat fortepianu w wykonaniu Jonasza Jochymczyka - wybitnego pianisty i kompozytora z Olkusza."
        },
        "biography": {
          "title": "Biografia",
          "short": "Jonasz Jochymczyk to wybitny pianista i kompozytor, którego muzyka łączy klasyczną tradycję z nowoczesnymi eksperymentami. Jego interpretacje zachwycają publiczność na całym świecie.",
          "readMore": "Czytaj więcej"
        },
        "achievements": {
          "title": "Osiągnięcia",
          "items": [
            "Laureat międzynarodowych konkursów pianistycznych",
            "Występy w prestiżowych salach koncertowych",
            "Nagrania dla wiodących wytwórni muzycznych",
            "Współpraca z wybitnymi dyrygentami i orkiestrami"
          ]
        },
        "upcomingConcerts": {
          "title": "Nadchodzące koncerty",
          "viewAll": "Zobacz wszystkie"
        }
      },
      "concerts": {
        "title": "Koncerty",
        "upcoming": "Nadchodzące",
        "archive": "Archiwum",
        "tickets": "Bilety",
        "location": "Miejsce",
        "date": "Data",
        "time": "Godzina",
        "program": "Program",
        "noConcerts": "Brak nadchodzących koncertów"
      },
      "contact": {
        "title": "Kontakt"
      },
      "footer": {
        "copyright": "© 2024 Jonasz Jochymczyk. Wszystkie prawa zastrzeżone.",
        "design": "Projekt i realizacja"
      },
      "language": {
        "pl": "Polski",
        "en": "English"
      }
    },
    en: {
      "navigation": {
        "home": "Home",
        "biography": "Biography",
        "concerts": "Concerts",
        "articles": "Articles",
        "gallery": "Gallery",
        "recordings": "Recordings",
        "contact": "Contact"
      },
      "home": {
        "title": "Jonasz Jochymczyk",
        "subtitle": "Pianist • Composer • Artist",
        "hero": {
          "title": "Welcome to the world of music",
          "description": "Discover the magical world of piano performed by Jonasz Jochymczyk - an outstanding pianist and composer from Olkusz."
        },
        "biography": {
          "title": "Biography",
          "short": "Jonasz Jochymczyk is an outstanding pianist and composer whose music combines classical tradition with modern experiments. His interpretations delight audiences around the world.",
          "readMore": "Read more"
        },
        "achievements": {
          "title": "Achievements",
          "items": [
            "Winner of international piano competitions",
            "Performances in prestigious concert halls",
            "Recordings for leading music labels",
            "Collaboration with outstanding conductors and orchestras"
          ]
        },
        "upcomingConcerts": {
          "title": "Upcoming concerts",
          "viewAll": "View all"
        }
      },
      "concerts": {
        "title": "Concerts",
        "upcoming": "Upcoming",
        "archive": "Archive",
        "tickets": "Tickets",
        "location": "Location",
        "date": "Date",
        "time": "Time",
        "program": "Program",
        "noConcerts": "No upcoming concerts"
      },
      "contact": {
        "title": "Contact"
      },
      "footer": {
        "copyright": "© 2024 Jonasz Jochymczyk. All rights reserved.",
        "design": "Design and implementation"
      },
      "language": {
        "pl": "Polski",
        "en": "English"
      }
    }
  };

  private currentLanguage = signal<Language>('pl');
  private translations = signal<any>(this.staticTranslations.pl);

  constructor(private http: HttpClient) {
    this.loadTranslations(this.currentLanguage());
  }

  getCurrentLanguage(): Language {
    return this.currentLanguage();
  }

  setLanguage(lang: Language): void {
    this.currentLanguage.set(lang);
    this.loadTranslations(lang);
  }

  private loadTranslations(lang: Language): void {
    // Użyj statycznych danych zamiast HTTP
    const translations = this.staticTranslations[lang] || {};
    this.translations.set(translations);
    
    // Fallback do HTTP jeśli statyczne dane nie są dostępne
    this.http.get(`/assets/i18n/${lang}.json`)
      .pipe(
        catchError(() => {
          console.warn(`Failed to load translations for ${lang}, using static data`);
          return of(translations);
        })
      )
      .subscribe(translations => {
        if (Object.keys(translations).length > 0) {
          this.translations.set(translations);
        }
      });
  }

  get(key: string): string {
    const keys = key.split('.');
    let value: any = this.translations();
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  }

  getArray(key: string): string[] {
    const keys = key.split('.');
    let value: any = this.translations();
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return [];
      }
    }
    
    return Array.isArray(value) ? value : [];
  }
} 