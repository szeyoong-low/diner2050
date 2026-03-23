import { api } from "@/data/data-api";
import { auth0 } from "@/lib/auth0";
import { getStrapiURL } from "@/lib/utils";
import qs from "qs";
import type { TStrapiResponse, TMenuItem } from "@/types";

type TUpdate = {
  Name: string;
  Description: string;
  Price: number;
  Category: string;
  MenuImage: number;
};

const baseUrl = getStrapiURL();

export async function updateService(
  documentId: string,
  menuData: TUpdate
): Promise<TStrapiResponse<TMenuItem>> {
  const session = await auth0.getSession();
  if (!session) throw new Error("You must be logged in to update menu items.");

  const query = qs.stringify({
    populate: "*",
  });
  const url = new URL(`/api/menu-items/${documentId}`, baseUrl);
  url.search = query;

  const payload = { data: menuData }

  const result = await api.put<TMenuItem, typeof payload>(
    url.href,
    payload,
  );

  return result;
}