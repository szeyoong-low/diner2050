// Adapted from auth0's Next.js SDK tutorial
// https://auth0.com/docs/quickstart/webapp/nextjs

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { StrapiImage } from "@/components/images/strapi-image";
import { TMenuItem } from "@/types";

interface IMenuCardProps {
  menuItem: TMenuItem;
}

export default function MenuCard({ menuItem }: Readonly<IMenuCardProps>) {
  const { documentId, Name, Description, Price, MenuImage } = menuItem;

  return (
    <div className="relative w-full max-w-sm md:max-w-md">
      <div className="bg-white/4 backdrop-blur-2xl border border-white/8 rounded-3xl shadow-2xl shadow-black/60 overflow-hidden">
        <div className="h-px bg-linear-to-r from-transparent via-blue-500/60 to-transparent" />

        <Link href={`/${documentId}`}>
          <Card>
            <div className="flex justify-center">
              <div className="flex h-30 w-30 justify-center items-center">
                <StrapiImage
                  src={MenuImage.url}
                  alt={ MenuImage.alternativeText || "No alternative text" }
                  width={200}
                  height={200}
                />
              </div>
            </div>

            <div className="w-full h-px bg-slate-300 dark:bg-white/6" />
            
            <CardHeader className="text-center">
              <CardTitle className="text-xl md:text-2xl font-semibold text-inherit tracking-[-0.02em]">
                { Name }
              </CardTitle>
              
              <p className="text-slate-400 text-sm md:text-[15px] mt-1.5">
                RM { Price.toFixed(2) || 0.00 }
              </p>
            </CardHeader>

            <CardContent>
              <p className="text-slate-400 text-sm md:text-[15px] text-center leading-relaxed tracking-[-0.01em]">
                {Description.slice(0, 150) }
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}