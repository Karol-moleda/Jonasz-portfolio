export interface LocalizedText {
  pl?: string;
  en?: string;
  it?: string;
}

export interface LocalizedContent {
  pl?: any[];
  en?: any[];
  it?: any[];
}

export type Language = 'pl' | 'en' | 'it';
