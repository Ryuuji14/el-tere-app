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
  addSale: async (sale) => {
    const { data } = await http.post(`${"sale"}`, sale);
    return data;
  },
  getSaleById : async (saleId) => {
    const { data } = await http.get(`sale/${saleId}`);
    return data;
  },
};
