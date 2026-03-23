import { z } from "zod";

export const UpdateFormSchema = z.object({
  documentId: z
    .string()
    .min(1, "Document ID is required"),
  Name: z
    .string()
    .min(1, "Name of menu item is required"),
  Description: z
    .string(),
  Category: z
    .enum(["Appetisers", "Mains", "Desserts", "Drinks"]),
  Price: z
    .coerce
    .number()
    .min(0, "Price must be a positive number"),
  MenuImage: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size > 0, "Image is required")
    .refine((file) => !file || file.size <= 5000000, "Image must be less than 5MB")
    .refine(
      (file) =>
        !file ||
        ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Image must be JPEG, PNG, or WebP format"
    )
});

export type UpdateFormValues = z.infer<typeof UpdateFormSchema>;

export type UpdateFormState = {
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

export const DeleteFormSchema = z.object({
  documentId: z.string().min(1, "Document ID is required"),
});

export type DeleteFormValues = z.infer<typeof DeleteFormSchema>;

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