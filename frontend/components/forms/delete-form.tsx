"use client"

import { actions } from "@/data/actions";
import DeleteButton from "../buttons/delete-button";
import { type DeleteFormState } from "@/data/validation/delete-menu-items";
import { toast } from "sonner";
import { useActionState } from "react";

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
  
  return(
      <form action={deleteFormAction} onSubmit={() => toast.success("Deleted menu item.")}>
        <input type="hidden" name="documentId" value={documentId} />
        <DeleteButton />
      </form>
  );
}