// Adapted from auth0's Next.js SDK tutorial
// https://auth0.com/docs/quickstart/webapp/nextjs

import { auth0 } from "@/lib/auth0";
import AuthButton from "@/components/auth0/AuthButton";
import { loaders } from "@/data/loaders";
import { MenuGrid } from "@/components/cards/menu-grid";
import { validateApiResponse } from "@/lib/error-handler";
import StandardButton from "@/components/buttons/standard-button";

export default async function Home() {
  const data = await loaders.getMenuItems();
  const menuItemsRetrieved = validateApiResponse(data);
  const session = await auth0.getSession();

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 md:w-225 h-75 md:h-112.5 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-100 md:w-150 h-50 md:h-75 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="lg:hidden w-40">
          <AuthButton />
        </div>

        <MenuGrid menuItems={menuItemsRetrieved} className="grow min-h-[calc(100vh-80px)]" />

        { session &&
          <StandardButton src="/create" className="fixed bottom-10 right-10 w-60">
            Create menu item
          </StandardButton>
        }
      </div>
    </main>
  );
}
