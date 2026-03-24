import { z } from "zod";

export const DeleteFormSchema = z.object({
  documentId: z.string().min(1, "Document ID is required"),
});

// Adapted from Paul Bratslavsky's "Epic Next.js 15 Tutorial"
// https://strapi.io/blog/epic-next-js-15-tutorial-part-1-learn-next-js-by-building-a-real-life-project

export type TDeleteFormState = {
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