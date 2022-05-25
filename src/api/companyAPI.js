import { http } from "./http";

export const companyAPI = {
  getAreasWithProducts: async () => {
    const { data } = await http.get("company/list/areas");
    return data;
  },
};
