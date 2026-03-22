import { TMenuItem} from "@/types";
import { StrapiImage } from "@/components/images/strapi-image";
import DeleteButton from "@/components/buttons/delete-button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import SubmitButton from "../buttons/submit-button";

export default function ViewingMode({ menuItem }: { menuItem: TMenuItem }) {

  const { documentId,Name, Description, Price, MenuImage } = menuItem;

  return (
    <div>
      <form className="flex flex-col items-center justify-center gap-4 pb-7" action="">
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

        <div>
          <h2 className="font-extrabold text-6xl text-center">
            <Input
              id="Name"
              name="Name"
              type="text"
              placeholder={"Name"}
              defaultValue={Name}
              // defaultValue={updateFormState?.data?.title || Name || ""}
              className="p-3 h-15 border border-white"
            />
          </h2>
        </div>

        <div className="flex flex-row align-middle gap-2">
          <p className="text-zinc-500 dark:text-slate-400 text-md md:text-[20px] mt-1">
            RM
          </p>
          <Input
           id="Price"
           name="Price"
           type="number"
           placeholder={ Price.toFixed(2) || "0.00" }
           defaultValue={Price}
           className="border border-white"
          />           
        </div>

        <div className="w-1/2 h-px bg-gray-950 dark:bg-white my-4" />
        
        <div className="flex justify-center">
          <p className="text-gray-950 dark:text-slate-400 text-md md:text-[20px] text-center leading-relaxed md:leading-10 w-3/4 md:w-1/2 tracking-widest">
            <Textarea
              id="Description"
              name="Description"
              placeholder={"Description"}
              defaultValue={Description}
              className="border border-white"
            />
          </p>
        </div>
        
        <SubmitButton />
      </form>

      <DeleteButton documentId={documentId} />
    </div>
  );
}