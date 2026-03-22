import { TMenuItem} from "@/types";
import { StrapiImage } from "@/components/images/strapi-image";
import DeleteButton from "@/components/buttons/delete-button";

export default function ViewingMode({ menuItem }: { menuItem: TMenuItem }) {

  const { documentId,Name, Description, Price, MenuImage } = menuItem;

  return (
    <div className="flex flex-col items-center gap-4 pb-7">
      <form action="">
        <input type="hidden" name="documentId" value={documentId} />

        <div className="flex justify-center">
          <div className="flex h-60 w-60 justify-center items-center">
            <StrapiImage
              src={MenuImage.url}
              alt={ MenuImage.alternativeText || "No alternative text" }
              width={400}
              height={400}
            />
          </div>
        </div>
      </form>

      <form action="" className="flex flex-col items-center gap-4">
        <input type="hidden" name="documentId" value={documentId} />

        <h2 className="font-extrabold text-4xl">{ Name }</h2>

        <p className="text-zinc-500 dark:text-slate-400 text-md md:text-[20px] mt-1.5">
          RM { Price.toFixed(2) || 0.00 }
        </p>

        <div className="w-1/2 h-px bg-gray-950 dark:bg-white/6 my-4" />
        
        <p className="text-gray-950 dark:text-slate-400 text-md md:text-[20px] text-center leading-relaxed md:leading-10 w-3/4 md:w-1/2 tracking-widest">
          { Description }
        </p>
      </form>

      <DeleteButton documentId={documentId} />
    </div>
  );
}