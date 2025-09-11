import { LocalizedText } from './localized.types';

export interface Concert {
  id?: string;
  title: LocalizedText | string;
  date: string;
  time?: string;
  location: LocalizedText | string;
  venue?: LocalizedText | string;
  program?: LocalizedText | string;
  ticketLink?: string;
  images?: {
    asset: {
      _ref?: string;
      url?: string;
    };
  }[];
}