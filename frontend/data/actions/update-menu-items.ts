"use server"

import { api } from "@/data/data-api";
import { type CreateUpdateFormState, CreateUpdateFormSchema } from "@/data/validation/menu";
import { getStrapiURL } from "@/lib/utils";
import { queryMenuItem } from "@/lib/constants";
import { services } from "@/data/services";
import { TMenuItem } from "@/types";
import { z } from "zod";

export async function updateAction(
  prevState: CreateUpdateFormState,
  formData: FormData
): Promise<CreateUpdateFormState> {
  
  const rawFields = Object.fromEntries(formData);

  // Normalize the file field
  const menuImage = formData.get("MenuImage");

  const fields = {
    ...rawFields,
    MenuImage:
      menuImage instanceof File && menuImage.size > 0
        ? menuImage
        : undefined,
  };
  
  const validatedFields = CreateUpdateFormSchema.safeParse(fields);

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

  var imageId;

  if (validatedFields.data.MenuImage) {
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

    imageId = fileUploadResponse.data[0].id;
  } else {
    const baseUrl = getStrapiURL();
    const url = new URL(`/api/menu-items/${validatedFields.data.documentId}`, baseUrl);
    url.search = queryMenuItem;
    const currentData = await api.get<TMenuItem>(url.href)

    imageId = currentData.data?.MenuImage.id!;
  }

  const responseData = await services.updateService(
    validatedFields.data.documentId,
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
    message: "Successfully updated menu item.",
    strapiErrors: null,
    zodErrors: null,
    data: {
      ...prevState.data,
      ...fields,
    },
  };
}