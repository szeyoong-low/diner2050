import AuthButton from "../auth0/AuthButton";
import Logo from "../global/logo";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default async function Header() {


  return (
    <div className="flex justify-center items-center min-w-full h-20 bg-inherit border-b border-indigo-500 p-2 fixed top-0 z-10">
      <Logo />

      <div className="flex flex-row items-center gap-4 absolute right-3">
        <div className="collapse md:visible">
          <AuthButton />
        </div>

        <ModeToggle />
      </div>
    </div>
  );
}