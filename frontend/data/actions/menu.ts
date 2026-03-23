"use server"

import {
  type DeleteFormState,
  type UpdateFormState,
  DeleteFormSchema,
  UpdateFormSchema,
} from "../validation/menu";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { services } from "../services";
import { z } from "zod";

export async function updateAction(
  prevState: UpdateFormState,
  formData: FormData
): Promise<UpdateFormState> {
  
  const fields = Object.fromEntries(formData);
  const image = formData.get("MenuImage") as File;

  if (!image || image.size === 0) {
    return {
      success: false,
      message: "No image provided",
      strapiErrors: null,
      zodErrors: { MenuImage: ["Image is required"] },
      data: prevState.data,
    };
  }

  const validatedFields = UpdateFormSchema.safeParse(fields);

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

  const uploadedImageId = fileUploadResponse.data[0].id;

  const responseData = await services.updateService(
    validatedFields.data.documentId,
    {
      Name: validatedFields.data.Name,
      Description: validatedFields.data.Description,
      Category: validatedFields.data.Category,
      Price: validatedFields.data.Price,
      MenuImage: uploadedImageId
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
    message: "Successfully updated menu item.",
    strapiErrors: null,
    zodErrors: null,
    data: {
      ...prevState.data,
      ...fields,
    },
  };
}

export async function deleteAction(
  prevState: DeleteFormState,
  formData: FormData
): Promise<DeleteFormState> {
  const fields = Object.fromEntries(formData);
  const validatedFields = DeleteFormSchema.safeParse(fields);

  if (!validatedFields.success) {
    const flattenedErrors = z.flattenError(validatedFields.error);
    return {
      success: false,
      message: "Validation failed.",
      strapiErrors: null,
      zodErrors: flattenedErrors.fieldErrors,
      data: {
        ...prevState.data,
        ...fields,
      },
    };
  }

  try {
    const responseData = await services.deleteService(
      validatedFields.data.documentId
    );

    if (responseData.error) {
      return {
        success: false,
        message: "Failed to delete.",
        strapiErrors: responseData.error,
        zodErrors: null,
        data: {
          ...prevState.data,
          ...fields,
        },
      };
    }

    // If we get here, deletion was successful
    revalidatePath("/");
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete. Please try again.",
      strapiErrors: null,
      zodErrors: null,
      data: {
        ...prevState.data,
        ...fields,
      },
    };
  }

  // Redirect after successful deletion (outside try/catch)
  redirect("/");
}