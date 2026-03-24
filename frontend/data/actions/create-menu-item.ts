// Adapted from Paul Bratslavsky's "Epic Next.js 15 Tutorial"
// https://strapi.io/blog/epic-next-js-15-tutorial-part-1-learn-next-js-by-building-a-real-life-project

"use server"

import { CreateFormSchema } from "@/data/validation/create-menu-item";
import { type TCreateUpdateFormState } from "@/data/validation";
import { services } from "@/data/services";
import { z } from "zod";

export async function createAction(
  prevState: TCreateUpdateFormState,
  formData: FormData
): Promise<TCreateUpdateFormState> {
  
  const fields = Object.fromEntries(formData);  
  const validatedFields = CreateFormSchema.safeParse(fields);

  if (!validatedFields.success) {
    const flattenedErrors = z.flattenError(validatedFields.error);
    return {
      success: false,
      message: "Validation failed",
      strapiErrors: null,
      zodErrors: flattenedErrors.fieldErrors,
      data: {
        ...prevState.data,
        ...fields,
      },
    };
  }

  const fileUploadResponse = await services.fileUploadService(
    validatedFields.data.MenuImage
  );

  if (!fileUploadResponse.success || !fileUploadResponse.data) {
    return {
      success: false,
      message: "Failed to upload image",
      strapiErrors: fileUploadResponse.error,
      zodErrors: null,
      data: prevState.data,
    };
  }

  const imageId = fileUploadResponse.data[0].id;

  const responseData = await services.createService(
    {
      Name: validatedFields.data.Name,
      Description: validatedFields.data.Description,
      Category: validatedFields.data.Category,
      Price: validatedFields.data.Price,
      MenuImage: imageId,
    }
  );

  if (!responseData) {
    return {
      success: false,
      message: "Oops! Something went wrong. Please try again.",
      strapiErrors: null,
      zodErrors: null,
      data: {
        ...prevState.data,
        ...fields,
      },
    };
  }

  if (responseData.error || !responseData.success) {
    return {
      success: false,
      message: "Failed to update menu item.",
      strapiErrors: responseData.error,
      zodErrors: null,
      data: {
        ...prevState.data,
        ...fields,
      },
    };
  }

  return {
    success: true,
    message: `Successfully created ${responseData.data?.Name}!`,
    strapiErrors: responseData.error,
    zodErrors: null,
    data: {
      ...prevState.data,
      ...fields,
      documentId: responseData.data?.documentId
    },
  };
}