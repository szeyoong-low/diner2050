// Adapted from Paul Bratslavsky's "Epic Next.js 15 Tutorial"
// https://strapi.io/blog/epic-next-js-15-tutorial-part-1-learn-next-js-by-building-a-real-life-project

import { categories } from "@/lib/constants";
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
    .enum(categories),
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