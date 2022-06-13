import { http } from "./http";

const BASE_URL = "company";

export const companyAPI = {
  getAreasWithProducts: async () => {
    const { data } = await http.get(`${BASE_URL}/all/list`);
    return data;
  },
  getAreasWithRecommendedProducts: async () => {
    const { data } = await http.get(`${BASE_URL}/remmended/list`);
    return data;
  },
  getAreasWithPopularProducts: async () => {
    const { data } = await http.get(`${BASE_URL}/popular/list`);
    return data;
  },
  getAreasWithRecentProducts: async (userId) => {
    const { data } = await http.get(`${BASE_URL}/recents/${userId}/list`);
    return data;
  },
  getCompanyProduct: async (companyId) => {
    const { data } = await http.get(`${BASE_URL}/${companyId}`);
    return data;
  },
  getCompanyPromotions: async (companyId) => {
    const { data } = await http.get(`${"promotion/company"}/${companyId}`);
    return data;
  },
};
