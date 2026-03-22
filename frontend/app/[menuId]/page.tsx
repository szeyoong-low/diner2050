import { notFound } from "next/navigation";
import { loaders } from "@/data/loaders";
import MenuCard from "@/components/cards/menu-card";
import { validateApiResponse } from "@/lib/error-handler";

interface SingleMenuItemProps {
  params: {
    menuId: string;
  };
}

export default async function SingleMenuItem({ params }: SingleMenuItemProps) {
  const { menuId } = await params;

  if (!menuId) notFound();

  const menuItem = await loaders.getMenuItemByDocumentId(menuId);
  const menuItemRetrieved = validateApiResponse(menuItem);

  return (
    <MenuCard menuItem={menuItemRetrieved} />
  );
}