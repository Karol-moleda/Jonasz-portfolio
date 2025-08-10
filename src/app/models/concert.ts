export interface Concert {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  venue: string;
  program?: string;
  poster?: string;
  ticketLink?: string;
  isUpcoming: boolean;
  images?: string[];
  description?: string;
} 