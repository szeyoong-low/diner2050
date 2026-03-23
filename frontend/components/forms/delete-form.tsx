"use client"

import { actions } from "@/data/actions";
import { type DeleteFormState } from "@/data/validation/delete-menu-items";
import { toast } from "sonner";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import DeleteButton from "../buttons/delete-button";

const INITIAL_DELETE_STATE: DeleteFormState = {
  success: false,
  message: undefined,
  strapiErrors: null,
  zodErrors: null,
};

interface DeleteFormProps {
    documentId: string;
}

export default function DeleteForm({documentId}: Readonly<DeleteFormProps>) {
  const [deleteFormState, deleteFormAction] = useActionState(
    actions.deleteAction,
    INITIAL_DELETE_STATE
  );
  const status = useFormStatus();

  function renderToast() {
    if (deleteFormState?.strapiErrors) {
      toast.error(deleteFormState.strapiErrors.message)
    } else if (deleteFormState?.message && !deleteFormState?.success) {
      toast.error(deleteFormState.message)
    } else {
      toast.success("Successfully deleted!")
    }
  }
  
  return(
    <div>
      <form action={deleteFormAction} onSubmit={renderToast}>
        <input type="hidden" name="documentId" value={documentId} />
        <DeleteButton formStatus={status} />
      </form>
    </div>
  );
}