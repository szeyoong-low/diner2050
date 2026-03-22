import { cn } from "@/lib/utils";
import MenuCard from "./menu-card";
import { TMenuItem } from "@/types";

interface ISummariesGridProps {
  menuItems: TMenuItem[];
  className?: string;
}

export function MenuGrid({ menuItems, className }: ISummariesGridProps) {
  const menuByCategory = Map.groupBy(menuItems, (item) => item.Category);
  console.log(menuByCategory);

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {[...menuByCategory.entries()].map(([category, items]) => (
        <section key={category}>
          <h2 className="font-extrabold mb-3 text-2xl">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((item: TMenuItem) => (
            <MenuCard key={item.documentId} menuItem={item} />))}
          </div>
        </section>
      ))}
    </div>
  );
}