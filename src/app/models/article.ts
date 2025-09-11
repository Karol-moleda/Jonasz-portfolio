import { LocalizedText } from './localized.types';

export interface Article {
  title: LocalizedText | string;
  publication: string;
  location: string;
  date: string;
  author?: string;
  url: string;
  mainImage?: {
    asset: {
      url: string;
    };
    alt?: string;
    caption?: string;
  }
}
