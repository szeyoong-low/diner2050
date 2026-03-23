import { cn } from "@/lib/utils";
import MenuCard from "./menu-card";
import { TMenuItem } from "@/types";

interface ISummariesGridProps {
  menuItems: TMenuItem[];
  className?: string;
}

const CATEGORY_ORDER: Record<string, number> = {
  Appetiser: 0,
  Main: 1,
  Dessert: 2,
  Drink: 3,
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((item: TMenuItem) => (
            <MenuCard key={item.documentId} menuItem={item} />))}
          </div>
        </section>
      ))}
    </div>
  );
}