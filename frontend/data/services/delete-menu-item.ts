import { api } from "@/data/data-api";
import { auth0 } from "@/lib/auth0";
import { getStrapiURL } from "@/lib/utils";
import type { TStrapiResponse } from "@/types";

const baseUrl = getStrapiURL();

export async function deleteService(documentId: string): Promise<TStrapiResponse<null>> {
  const session = (await auth0.getAccessToken()).token;
  if (!session) throw new Error("You are not You must be logged in to delete menu items.");

  const url = new URL(`/api/menu-items/${documentId}`, baseUrl);
  
  return api.delete<null>(url.href);
}