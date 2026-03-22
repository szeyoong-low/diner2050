import { Button } from "@/components/ui/button";

export default function SubmitButton() {
  return (
    <Button
      type="submit"
      className="bg-blue-600 hover:bg-blue-500 hover:shadow-blue-600/30 hover:shadow-lg text-white font-medium rounded-2xl text-[15px] tracking-[-0.01em] h-10 w-40 transition-all duration-200 hover:-translate-y-px active:translate-y-0 cursor-pointer"
    >
      Submit
    </Button>
  )
}