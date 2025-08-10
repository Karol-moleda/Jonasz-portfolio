import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export type Language = 'pl' | 'en' | 'it';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLanguage = signal<Language>('pl');
  private translations = signal<any>({});

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
    // Ładuj tłumaczenia z plików JSON w assets; fallback na en -> pl
  this.http.get(`/i18n/${lang}.json`)
      .pipe(
        catchError(() => {
          console.warn(`Failed to load translations for ${lang}, falling back to en`);
      return this.http.get(`/i18n/en.json`).pipe(
            catchError(() => {
              console.warn(`Failed to load translations for en, falling back to pl`);
        return this.http.get(`/i18n/pl.json`).pipe(
                catchError(() => {
                  console.error('Failed to load all translation files');
                  return of({});
                })
              );
            })
          );
        })
      )
      .subscribe((translations: any) => {
        this.translations.set(translations || {});
      });
  }

  get(key: string): string {
    const keys = key.split('.');
    let value: any = this.translations();
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // zwróć klucz jeśli nie znaleziono
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