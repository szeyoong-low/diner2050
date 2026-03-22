"use server"

import { type DeleteFormState, DeleteFormSchema } from "../validation/menu";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { services } from "../services";
import { z } from "zod";

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
      message: "Validation failed",
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