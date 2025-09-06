export interface Recording {
  _id: string;
  _createdAt: string;
  title: string;
  description?: string;
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