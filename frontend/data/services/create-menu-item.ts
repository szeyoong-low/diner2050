import { api } from "@/data/data-api";
import { auth0 } from "@/lib/auth0";
import { getStrapiURL } from "@/lib/utils";
import { queryMenuItem } from "@/lib/constants";
import type { TStrapiResponse, TMenuItem } from "@/types";

type TUpdate = {
  Name: string;
  Description: string;
  Price: number;
  Category: string;
  MenuImage: number;
};

const baseUrl = getStrapiURL();

export async function createService(
  menuData: TUpdate
): Promise<TStrapiResponse<TMenuItem>> {
  const session = await auth0.getSession();
  if (!session) throw new Error("You must be logged in to create menu items.");
  const url = new URL("/api/menu-items/", baseUrl);
  url.search = queryMenuItem;

  const payload = { data: menuData }
  console.log(payload)
  console.log("Hi")

  const result = await api.post<TMenuItem, typeof payload>(
    url.href,
    payload,
  );

  return result;
}