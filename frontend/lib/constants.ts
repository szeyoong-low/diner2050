import qs from "qs";

export const queryMenuItem = qs.stringify({
  fields: ["documentId", "Name", "Description", "Category", "Price"],
  populate: {
    MenuImage: {
      fields: ["id", "documentId", "url", "alternativeText"],
    },
  }
});

export const categories: string[] = ["Appetisers", "Mains", "Desserts", "Drinks"]