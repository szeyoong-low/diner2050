"use client"

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export default function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      className="bg-red-900 hover:bg-red-800 hover:shadow-red-800/30 hover:shadow-lg text-white font-medium rounded-2xl text-[15px] tracking-[-0.01em] h-10 w-40 transition-all duration-200 hover:-translate-y-px active:translate-y-0 cursor-pointer"
    >
      Delete
    </Button>
  );
}