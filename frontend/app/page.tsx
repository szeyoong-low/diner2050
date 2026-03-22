import AuthButton from "@/components/auth0/AuthButton";
import MenuItem from "@/components/cards/menu-item";

export default async function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 md:w-225 h-75 md:h-112.5 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-100 md:w-150 h-50 md:h-75 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="md:hidden w-40">
          <AuthButton />
        </div>


        <MenuItem />
      </div>
    </main>
  );
}
