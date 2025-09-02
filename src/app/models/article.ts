export interface Article {
  title: string;
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
