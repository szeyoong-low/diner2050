// Adapted from Paul Bratslavsky's "Epic Next.js 15 Tutorial"
// https://strapi.io/blog/epic-next-js-15-tutorial-part-1-learn-next-js-by-building-a-real-life-project

export type TCreateUpdateFormState = {
  success?: boolean;
  message?: string;
  data?: {
    documentId?: string;
    Name?: string;
    Description?: string;
    Category?: string;
    Price?: number;
    MenuImage?: File;
  };
  strapiErrors?: {
    status: number;
    name: string;
    message: string;
    details?: Record<string, string[]>;
  } | null;
  zodErrors?: {
    documentId?: string[];
    Name?: string[];
    Description?: string[];
    Category?: string[];
    Price?: string[];
    MenuImage?: string[];
  } | null;
};