import { auth0 } from "@/lib/auth0";
import EditingMode from "@/components/views/editing-mode";
import { loaders } from "@/data/loaders";
import { notFound } from "next/navigation";
import { validateApiResponse } from "@/lib/error-handler";
import ViewingMode from "@/components/views/viewing-mode";

interface ISingleMenuItemProps {
  params: {
    menuId: string;
  };
}

export default async function SingleMenuItem({ params }: ISingleMenuItemProps) {
  const { menuId } = await params;
  if (!menuId) notFound();
  const menuItem = await loaders.getMenuItemByDocumentId(menuId);
  const menuItemRetrieved = validateApiResponse(menuItem);
  const session = await auth0.getSession();

  return (
    <main>
      { session
        ? <EditingMode menuItem={menuItemRetrieved} />
        : <ViewingMode menuItem={menuItemRetrieved} />
      }
    </main>
  );
}