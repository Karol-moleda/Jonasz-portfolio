import { LocalizedText } from './localized.types';

export interface Gallery {
  _id: string;
  title: LocalizedText | string;
  location: string;
  date?: string;
  description?: string;
  photos: {
    asset: { _ref: string; _type: string; url?: string };
    alt?: string;
  }[];
}
