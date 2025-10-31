import { LocalizedText, LocalizedContent } from './localized.types';

export interface Biography {
  title: LocalizedText | string;
  heroImage?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  sections: {
    heading: LocalizedText | string;
    content: LocalizedContent | any[];
  }[];
  timeline: {
    year: string;
    event: LocalizedText | string;
    location: LocalizedText | string;
    achievement: LocalizedText | string;
    details?: LocalizedText | string;
  }[];
}
