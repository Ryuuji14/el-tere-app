import { http } from "./http";

const BASE_URL = "sale/user";

export const saleAPI = {
  getUserSales: async (userId) => {
    const { data } = await http.get(`${BASE_URL}/${userId}`);
    return data;
  },
  getSaleProductBySaleId: async (saleId) => {
    const { data } = await http.get(`saleProduct/sale/${saleId}`);
    return data;
  },
};
