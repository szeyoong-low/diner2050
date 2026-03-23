import { actions } from "@/data/actions"
import CreateUpdateForm from "@/components/forms/create-update-form";

export default function Create() {
  return (
    <main>
      <CreateUpdateForm formAction={actions.createAction} />
    </main>
  )
}