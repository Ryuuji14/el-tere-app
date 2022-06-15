import { http } from "./http";

const BASE_URL = "company";

const handleCategoryId = (categoryId) => {
  if (categoryId === -1) return "";

  return categoryId;
};

export const companyAPI = {
  getAreasWithProducts: async () => {
    const { data } = await http.get(`${BASE_URL}/all/list`);
    return data;
  },
  getAreasWithRecommendedProducts: async (categoryId) => {
    const { data } = await http.get(
      `${BASE_URL}/remmended/list?category=${handleCategoryId(categoryId)}`
    );
    return data;
  },
  getAreasWithPopularProducts: async (categoryId) => {
    const { data } = await http.get(
      `${BASE_URL}/popular/list?category=${handleCategoryId(categoryId)}`
    );
    return data;
  },
  getAreasWithRecentProducts: async (userId, categoryId) => {
    const { data } = await http.get(
      `${BASE_URL}/recents/${userId}/list?category=${handleCategoryId(
        categoryId
      )}`
    );
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
  getCompaniesByCategory: async (categoryId) => {
    const { data } = await http.get(`${BASE_URL}/category/${categoryId}`);
    return data;
  },
};
