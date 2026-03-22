"use client"

import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

interface DeleteButtonProps {
    documentId: string;
}

function Loader() {
  return (
    <div className="flex items-center">
      <Loader2 className="h-4 w-4 animate-spin" />
    </div>
  );
}

export default function DeleteButton({documentId}: Readonly<DeleteButtonProps>) {
  const status = useFormStatus();

  return(
    <form>
      <input type="hidden" name="documentId" value={documentId} />
      <Button
        type="submit"
        aria-disabled={status.pending}
        disabled={status.pending}
        className="fixed bottom-10 right-10 bg-red-900 hover:bg-red-800 hover:shadow-red-800/30 hover:shadow-lg text-white font-medium rounded-2xl text-[15px] tracking-[-0.01em] h-10 w-30 transition-all duration-200 hover:-translate-y-px active:translate-y-0 cursor-pointer"
      >
        {status.pending ? <Loader /> : "Delete"}
      </Button>
    </form>
  );
}