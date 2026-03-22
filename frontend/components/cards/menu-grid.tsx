import { TMenuItem } from "@/types";
import MenuCard from "./menu-card";
import { cn } from "@/lib/utils";

interface ISummariesGridProps {
  menuItems: TMenuItem[];
  className?: string;
}

export function MenuGrid({ menuItems, className }: ISummariesGridProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6", className)}>
      {menuItems.map((item: TMenuItem) => (
        <MenuCard key={item.documentId} menuItem={item} />
      ))}
    </div>
  );
}