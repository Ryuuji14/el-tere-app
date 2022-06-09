import { http } from "./http";

const BASE_URL = 'company'

export const companyAPI = {
  getAreasWithProducts: async () => {
    const { data } = await http.get("company/list/areas");
    return data;
  },
  getCompanyProduct: async (companyId) => {
    const {data} =  await http.get(`${BASE_URL}/${companyId}`)
    return data;
  }
};
