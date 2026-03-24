import AuthButton from "@/components/auth0/AuthButton";
import Logo from "@/components/global/logo";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default async function Header() {
  return (
    <div className="flex justify-center items-center min-w-full h-20 bg-inherit border-b border-indigo-500 p-2 sticky top-0 z-10">
      <SidebarTrigger className="absolute block left-3" />
      
      <Logo />

      <div className="flex flex-row items-center gap-4 absolute right-3">
        <div className="hidden lg:block">
          <AuthButton />
        </div>

        <ModeToggle />
      </div>
    </div>
  );
}