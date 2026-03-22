import { Button } from "../ui/button";

interface DeleteButtonProps {
    documentId: string;
    className?: string;
}

export default function DeleteButton({documentId, className}: Readonly<DeleteButtonProps>) {
  return(
    <form>
      <Button className="fixed bottom-10 right-10 bg-red-900 hover:bg-red-800 hover:shadow-red-800/30 hover:shadow-lg text-white font-medium rounded-2xl text-[15px] tracking-[-0.01em] h-10 w-30 transition-all duration-200 hover:-translate-y-px active:translate-y-0 cursor-pointer">
          Delete
      </Button>
    </form>
  );
}