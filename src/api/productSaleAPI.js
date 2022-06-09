import { http } from "./http";

const BASE_URL = 'saleProduct'

export const saleProductAPI = {
  addProductSale: async (saleProduct) => {
    const { data } = await http.post(`${BASE_URL}`, saleProduct);
    return data;
  }
}
