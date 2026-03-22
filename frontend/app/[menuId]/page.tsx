import { notFound } from "next/navigation";
import { loaders } from "@/data/loaders";
import { validateApiResponse } from "@/lib/error-handler";
import { StrapiImage } from "@/components/images/strapi-image";

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
  const { documentId, Name, Description, Price, MenuImage } = menuItemRetrieved;

  return (
    <div className="flex flex-col items-center gap-4 pb-7">
      <StrapiImage
        src={MenuImage.url}
        alt={ MenuImage.alternativeText || "No alternative text" }
        width={200}
        height={200}
      />
        
      <h2 className="font-extrabold text-4xl">{ Name || "Future burger"}</h2>
          
          
      <p className="text-zinc-500 dark:text-slate-400 text-md md:text-[20px] mt-1.5">
        RM { Price.toFixed(2) || 0.00 }
      </p>

      <div className="w-1/2 h-px bg-gray-950 dark:bg-white/6 my-4" />

      <p className="text-gray-950 dark:text-slate-400 text-md md:text-[20px] text-center leading-relaxed md:leading-10 w-3/4 md:w-1/2 tracking-widest">
        { Description }
      </p>
    </div>
  );
}