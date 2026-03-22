export type TMenuImage = {
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