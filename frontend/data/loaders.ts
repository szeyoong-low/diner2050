import qs from "qs";
import type { TStrapiResponse, TMenuItem } from "@/types";
import { api } from "@/data/data-api";
import { getStrapiURL } from "@/lib/utils";

const baseUrl = getStrapiURL();

async function getMenuItems(): Promise<TStrapiResponse<TMenuItem[]>> {
  const query = qs.stringify({
    populate: "*",
  });

  const url = new URL("/api/menu-items", baseUrl);
  url.search = query;
  return api.get<TMenuItem[]>(url.href);
}

async function getMenuItemByDocumentId(
  documentId: string
): Promise<TStrapiResponse<TMenuItem>> {
  const path = `/api/menu-items/${documentId}`;
  const url = new URL(path, baseUrl);

  return api.get<TMenuItem>(url.href);
}

export const loaders = {
  getMenuItems,
  getMenuItemByDocumentId,
};