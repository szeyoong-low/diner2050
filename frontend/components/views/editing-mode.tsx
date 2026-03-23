"use client"

import { actions } from "@/data/actions";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList
} from "@/components/ui/combobox";
import DeleteButton from "@/components/buttons/delete-button";
import ImagePicker from "@/components/forms/image-picker";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/buttons/submit-button";
import { Textarea } from "@/components/ui/textarea";
import { TMenuItem } from "@/types";
import { toast } from "sonner";
import { UpdateFormState } from "@/data/validation/menu";
import { useActionState, useState } from "react";
import { ZodErrors } from "@/components/validation/zod-errors";

const INITIAL_UPDATE_STATE: UpdateFormState = {
  success: false,
  message: undefined,
  strapiErrors: null,
  zodErrors: null,
};

export default function ViewingMode({ menuItem }: { menuItem: TMenuItem }) {
  const { documentId, Name, Description, Category, Price, MenuImage } = menuItem;

  const [updateFormState, updateFormAction] = useActionState(
    actions.updateAction,
    INITIAL_UPDATE_STATE
  );

  const [categoryInput, setCategoryInput] = useState(Category)

  function renderToast() {
    if (updateFormState?.strapiErrors) {
      toast.error(updateFormState.strapiErrors.message)
    } else if (updateFormState?.message && !updateFormState?.success) {
      toast.error(updateFormState.message)
    } else if (updateFormState?.success) {
      toast.success(updateFormState.message)
    }
  }

  const categories: string[] = ["Appetisers", "Desserts", "Drinks", "Mains"]

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-7">
      <form
        className="flex flex-col items-center justify-center gap-4 w-2/3"
        action={updateFormAction}
        onSubmit={renderToast}
      >

        <input type="hidden" name="documentId" value={documentId} />

        <div className="flex flex-col justify-center items-center gap-3">
          <div>
            <ImagePicker
              id="MenuImage"
              name="MenuImage"
              label="MenuImage"
              defaultValue={MenuImage.url || ""}
            />
          </div>
          <p className="text-center">
            Click on the image to replace it
          </p>
          <ZodErrors error={updateFormState?.zodErrors?.MenuImage} />
        </div>

        <div>
          <h2 className="font-extrabold text-6xl text-center">
            <Input
              id="Name"
              name="Name"
              type="text"
              placeholder="Name"
              defaultValue={updateFormState?.data?.Name || Name || ""}
              className="p-3 h-15 border border-white"
            />
          </h2>
          
          <ZodErrors error={updateFormState?.zodErrors?.Name} />
        </div>

        <div className="font-bold text-4xl text-center">
          <Combobox items={categories} onInputValueChange={setCategoryInput}>
            <ComboboxInput
              showClear
              placeholder={updateFormState?.data?.Category || Category || ""}
              className="p-3 h-15 border border-white"
            />
            
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>

          <Input
            id="Category"
            name="Category"
            type="hidden"
            value={categoryInput}
          />

          <ZodErrors error={updateFormState?.zodErrors?.Category} />
        </div>

        <div className="flex flex-row align-middle gap-2">
          <p className="text-zinc-500 dark:text-slate-400 text-md md:text-[20px] mt-1">RM</p>

          <Input
           id="Price"
           name="Price"
           type="number"
           placeholder={ Price.toFixed(2) || "0.00" }
           defaultValue={Price}
           className="border border-white"
          />

          <ZodErrors error={updateFormState?.zodErrors?.Price} />
        </div>

        <div className="w-1/2 h-px bg-gray-950 dark:bg-white my-4" />
        
        <div className="flex justify-center w-full">
          <p className="text-gray-950 dark:text-slate-400 text-md md:text-[20px] text-center leading-relaxed md:leading-10 w-full tracking-widest">
            <Textarea
              id="Description"
              name="Description"
              placeholder={"Description"}
              defaultValue={Description}
              className="border border-white w-full min-h-30"
            />
          </p>
          
          <ZodErrors error={updateFormState?.zodErrors?.Description} />
        </div>

        <SubmitButton />
      </form>

      <DeleteButton documentId={documentId} />
    </div>
  );
}