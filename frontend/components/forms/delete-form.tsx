"use client"

import { actions } from "@/data/actions";
import DeleteButton from "@/components/buttons/delete-button";
import { type TDeleteFormState } from "@/data/validation/delete-menu-items";
import { toast } from "sonner";
import { useActionState } from "react";

const INITIAL_DELETE_STATE: TDeleteFormState = {
  success: false,
  message: undefined,
  strapiErrors: null,
  zodErrors: null,
};

interface IDeleteFormProps {
    documentId: string;
}

export default function DeleteForm({documentId}: Readonly<IDeleteFormProps>) {
  const [deleteFormState, deleteFormAction] = useActionState(
    actions.deleteAction,
    INITIAL_DELETE_STATE
  );
  
  return(
      <form
        action={deleteFormAction}
        onSubmit={() => {toast.dismiss(); toast.success("Deleted menu item.")}}
      >
        <input type="hidden" name="documentId" value={documentId} />
        <DeleteButton />
      </form>
  );
}