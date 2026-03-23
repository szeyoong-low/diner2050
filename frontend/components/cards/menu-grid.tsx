import { cn } from "@/lib/utils";
import MenuCard from "./menu-card";
import { TMenuItem } from "@/types";

interface ISummariesGridProps {
  menuItems: TMenuItem[];
  className?: string;
}

const CATEGORY_ORDER: Record<string, number> = {
  Appetisers: 0,
  Mains: 1,
  Desserts: 2,
  Drinks: 3,
};

export function MenuGrid({ menuItems, className }: ISummariesGridProps) {
  const menuByCategory = Map.groupBy(menuItems, (item) => item.Category);
  
  return (
    <div className={cn("flex flex-col gap-6 px-7", className)}>
      {[...menuByCategory.entries()]
      .sort((a, b) => CATEGORY_ORDER[a[0]] - CATEGORY_ORDER[b[0]])
      .map(([category, items]) => (
        <section key={category}>
          <h2 className="font-extrabold mb-3 text-2xl" id={category.toLowerCase()}>
            {category}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {items.map((item: TMenuItem) => (
            <MenuCard key={item.documentId} menuItem={item} />))}
          </div>
        </section>
      ))}
    </div>
  );
}