import { ModeToggle } from "@/components/ui/mode-toggle";
import LoginButton from "../auth0/LoginButton";
import { auth0 } from "@/lib/auth0";
import LogoutButton from "../auth0/LogoutButton";
import Logo from "../global/logo";


export default async function Header() {
    const session = await auth0.getSession();
    const user = session?.user;

    return (
        <div className="flex justify-center items-center min-w-full h-20 bg-inherit border-b border-indigo-500 p-2 fixed top-0 z-10">
            <Logo />

            <div className="flex flex-row items-center gap-4 absolute right-3">
                {user ? (
                    <LogoutButton />
                ) : (
                    <LoginButton />
                )}
                
                <ModeToggle />
            </div>
        </div>
    );
}