import CreateUpdateForm from "@/components/forms/create-update-form";
import { actions } from "@/data/actions"

export default function Create() {
  return (
    <main>
      <CreateUpdateForm formAction={actions.createAction} />
    </main>
  )
}