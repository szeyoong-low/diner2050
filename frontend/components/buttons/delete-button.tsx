"use client"

import { actions } from "@/data/actions";
import { Button } from "../ui/button";
import { type DeleteFormState } from "@/data/validation/menu";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const INITIAL_DELETE_STATE: DeleteFormState = {
  success: false,
  message: undefined,
  strapiErrors: null,
  zodErrors: null,
};

function Loader() {
  return (
    <div className="flex items-center">
      <Loader2 className="h-4 w-4 animate-spin" />
    </div>
  );
}

interface DeleteButtonProps {
    documentId: string;
}

export default function DeleteButton({documentId}: Readonly<DeleteButtonProps>) {
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
        <Button
          type="submit"
          aria-disabled={status.pending}
          disabled={status.pending}
          className="bg-red-900 hover:bg-red-800 hover:shadow-red-800/30 hover:shadow-lg text-white font-medium rounded-2xl text-[15px] tracking-[-0.01em] h-10 w-40 transition-all duration-200 hover:-translate-y-px active:translate-y-0 cursor-pointer"
          >
          {status.pending ? <Loader /> : "Delete"}
        </Button>
      </form>
    </div>
  );
}