import { http } from "./http";

const BASE_URL = "product/company";

export const productsAPI = {
  getProducts: async (companyId) => {
    const { data } = await http.get(`${BASE_URL}/${companyId}`);
    return data;
  },
  getProductInPromotion: async (promotionId) => {
    const { data } = await http.get(`product/promotion/${promotionId}`);
    return data;
  },
};
