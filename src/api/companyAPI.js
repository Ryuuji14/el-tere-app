import { http } from "./http";

const BASE_URL = "company";

export const companyAPI = {
  getAreasWithProducts: async () => {
    const { data } = await http.get("company/all/list");
    return data;
  },
  getCompanyProduct: async (companyId) => {
    const { data } = await http.get(`${BASE_URL}/${companyId}`);
    return data;
  },
  getCompanyPromotions: async (companyId) => {
    const {data} =  await http.get(`${'promotion/company'}/${companyId}`)
    return data;
  }

};
