export type TMenuImage = {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
};

export type TMenuItem = {
  documentId: string;
  Name: string;
  Category: string;
  Description: string;
  Price: number;
  MenuImage: TMenuImage;
};

// Adapted from Paul Bratslavsky's "Epic Next.js 15 Tutorial"
// https://strapi.io/blog/epic-next-js-15-tutorial-part-1-learn-next-js-by-building-a-real-life-project

export type TStrapiResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    status: number;
    name: string;
    message: string;
    details?: Record<string, string[]>;
  };
  status: number;
};