import { http } from "./http";

const BASE_URL = "category";

export const categoryAPI = {
  getCategories: async () => {
    const { data } = await http.get(BASE_URL);
    return data;
  },
};
