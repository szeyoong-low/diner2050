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