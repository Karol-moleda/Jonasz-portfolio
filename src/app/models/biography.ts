export interface Biography {
  title: string;
  heroImage?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  sections: {
    heading: string;
    content: any[];
  }[];
  timeline: {
    date: string;
    title: string;
    description: string;
  }[];
}
