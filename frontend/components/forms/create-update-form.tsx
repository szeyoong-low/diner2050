"use client"

import { categories } from "@/lib/constants";
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList
} from "@/components/ui/combobox";
import { CreateUpdateFormState } from "@/data/validation";
import DeleteForm from "@/components/forms/delete-form";
import ImagePicker from "@/components/forms/image-picker";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/buttons/submit-button";
import { Textarea } from "@/components/ui/textarea";
import { TMenuItem } from "@/types";
import { toast } from "sonner";
import { useActionState, useState } from "react";
import { ZodErrors } from "@/components/validation/zod-errors";

const INITIAL_UPDATE_STATE: CreateUpdateFormState = {
  success: false,
  message: undefined,
  strapiErrors: null,
  zodErrors: null,
};

interface CreateUpdateFormProps {
  menuItem?: TMenuItem;
  formAction: ((formState: CreateUpdateFormState, formData: FormData) => Promise<CreateUpdateFormState>);
}

export default function CreateUpdateForm({
  menuItem,
  formAction,
}: Readonly<CreateUpdateFormProps>) {
  const [createUpdateFormState, createUpdateFormAction] = useActionState(
      formAction,
      INITIAL_UPDATE_STATE
    );
  
  const [categoryInput, setCategoryInput] = useState(menuItem?.Category || categories[0])
  
  function renderToast() {
    if (createUpdateFormState?.strapiErrors) {
      toast.dismiss()
      toast.error(createUpdateFormState.strapiErrors.message)
    } else if (createUpdateFormState?.message && !createUpdateFormState?.success) {
      toast.dismiss()
      toast.error(createUpdateFormState.message)
    } else if (createUpdateFormState?.success) {
      toast.dismiss()
      toast.success(createUpdateFormState.message)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-7">
      <form
        className="flex flex-col items-center justify-center gap-4 w-2/3"
        action={createUpdateFormAction}
        onSubmit={renderToast}
      >

        <input type="hidden" name="documentId" value={menuItem?.documentId} />

        <div className="flex flex-col justify-center items-center gap-3">
          <div>
            <ImagePicker
              id="MenuImage"
              name="MenuImage"
              label="MenuImage"
              defaultValue={menuItem?.MenuImage.url || ""}
            />
          </div>
          <p className="text-center">
            Click to upload an image
          </p>
          <ZodErrors error={createUpdateFormState?.zodErrors?.MenuImage} />
        </div>

        <div className="flex flex-col items-center">
          <h2 className="font-extrabold text-6xl text-center">
            <Input
              id="Name"
              name="Name"
              type="text"
              placeholder="Name"
              defaultValue={createUpdateFormState?.data?.Name || menuItem?.Name || ""}
              className="p-3 h-15 border-2 border-gray-950 dark:border-white block"
              required
            />
          </h2>
          
          <ZodErrors error={createUpdateFormState?.zodErrors?.Name} />
        </div>

        <div className="flex flex-col items-center font-bold text-4xl text-center">
          <Combobox items={categories} onInputValueChange={setCategoryInput}>
            <ComboboxInput
              showClear
              placeholder={createUpdateFormState?.data?.Category || menuItem?.Category || categoryInput}
              className="p-3 h-15 border-2 border-gray-950 dark:border-white"
            />
            
            <ComboboxContent>
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
            required
          />

          <ZodErrors error={createUpdateFormState?.zodErrors?.Category} />
        </div>

        <div className="flex flex-col items-center">
          <div className="flex flex-row gap-2">
            <p className="text-zinc-500 dark:text-slate-400 text-md md:text-[20px]">RM</p>

            <Input
              id="Price"
              name="Price"
              type="number"
              placeholder={ menuItem?.Price.toFixed(2) || "0.00" }
              defaultValue={menuItem?.Price}
              className="border-2 border-gray-950 dark:border-white"
              required
            />
          </div>
          

          <ZodErrors error={createUpdateFormState?.zodErrors?.Price} />
        </div>

        <div className="w-1/2 h-px bg-gray-950 dark:bg-white my-4" />
        
        <div className="flex flex-col items-center justify-center w-full">
          <p className="text-gray-950 dark:text-slate-400 text-md md:text-[20px] text-center leading-relaxed md:leading-10 w-full tracking-widest">
            <Textarea
              id="Description"
              name="Description"
              placeholder="Description"
              defaultValue={menuItem?.Description}
              className="border-2 border-gray-950 dark:border-white w-full min-h-30 rounded-2xl"
              required
            />
          </p>
          
          <ZodErrors error={createUpdateFormState?.zodErrors?.Description} />
        </div>

        <SubmitButton />
      </form>

      {menuItem?.documentId && <DeleteForm documentId={menuItem?.documentId} />}
    </div>
  );
}