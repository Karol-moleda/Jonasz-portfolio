import { LocalizedText } from './localized.types';

export interface Concert {
  id?: string;
  title: LocalizedText | string;
  date: string;
  time?: string;
  location: LocalizedText | string;
  venue?: LocalizedText | string;
  program?: LocalizedText | string;
  ticketLink?: string; // Keep for backward compatibility
  ticketing?: {
    type: 'free' | 'paid' | 'registration';
    eventLink?: string;
    ticketLink?: string;
    registrationLink?: string;
    price?: LocalizedText | string;
  };
  poster?: {
    asset: {
      _ref?: string;
      url?: string;
    };
    alt?: string;
  };
  images?: {
    asset: {
      _ref?: string;
      url?: string;
    };
  }[];
}