"use client"

import { actions } from "@/data/actions";
import CreateUpdateForm from "../forms/create-update-form";
import { TMenuItem } from "@/types";

export default function ViewingMode({ menuItem }: { menuItem: TMenuItem }) {
  
  return (
    <CreateUpdateForm menuItem={menuItem} formAction={actions.updateAction} />
  )
}