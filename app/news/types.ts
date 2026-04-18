export interface WpMedia {
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
    sizes?: {
      medium?: { source_url: string; width: number; height: number };
      large?: { source_url: string; width: number; height: number };
    };
  };
}

export interface WpPost {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: WpMedia[];
  };
}
