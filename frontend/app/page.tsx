import Image from "next/image";
import { auth0 } from "@/lib/auth0";
import LoginButton from "@/components/auth0/LoginButton";
import LogoutButton from "@/components/auth0/LogoutButton";
import Profile from "@/components/auth0/Profile";
import MenuItem from "@/components/cards/menu-item";

export default async function Home() {
  const session = await auth0.getSession();
  const user = session?.user;

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 md:w-225 h-75 md:h-112.5 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-100 md:w-150 h-50 md:h-75 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-sm md:max-w-md">
        <div className="bg-white/4 backdrop-blur-2xl border border-white/8 rounded-3xl shadow-2xl shadow-black/60 overflow-hidden">
          <div className="h-px bg-linear-to-r from-transparent via-blue-500/60 to-transparent" />

          <MenuItem />
        </div>
      </div>
    </main>
  );
}
