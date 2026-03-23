import type { TStrapiResponse, TMenuItem } from "@/types";
import { api } from "@/data/data-api";
import { getStrapiURL } from "@/lib/utils";
import { queryMenuItem } from "@/lib/constants";


const baseUrl = getStrapiURL();

async function getMenuItems(): Promise<TStrapiResponse<TMenuItem[]>> {
  const url = new URL("/api/menu-items", baseUrl);
  url.search = queryMenuItem;
  return api.get<TMenuItem[]>(url.href);
}

async function getMenuItemByDocumentId(
  documentId: string
): Promise<TStrapiResponse<TMenuItem>> {
  const url = new URL(`/api/menu-items/${documentId}`, baseUrl);
  url.search = queryMenuItem;
  return api.get<TMenuItem>(url.href);
}

export const loaders = {
  getMenuItems,
  getMenuItemByDocumentId,
};