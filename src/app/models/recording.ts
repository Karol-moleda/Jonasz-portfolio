import { LocalizedText } from './localized.types';

export interface Recording {
  _id: string;
  _createdAt: string;
  title: LocalizedText | string;
  description?: LocalizedText | string;
  date?: string; 
  status: 'current' | 'archival';
  videoUrl: string;
  thumbnail?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  tags?: string[];
}