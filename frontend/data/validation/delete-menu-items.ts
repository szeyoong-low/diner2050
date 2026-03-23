import { z } from "zod";

export const DeleteFormSchema = z.object({
  documentId: z.string().min(1, "Document ID is required"),
});

export type DeleteFormState = {
  success?: boolean;
  message?: string;
  data?: {
    documentId?: string;
  };
  strapiErrors?: {
    status: number;
    name: string;
    message: string;
    details?: Record<string, string[]>;
  } | null;
  zodErrors?: {
    documentId?: string[];
  } | null;
};