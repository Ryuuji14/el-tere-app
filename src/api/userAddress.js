import { http } from "./http";

const BASE_URL = "address/user";

export const userAddressAPI = {
  getUserAddress: async (userId) => {
    const { data } = await http.get(`${BASE_URL}/${userId}`);
    return data;
  },
  addUserAddress: async (userId, address) => {
    const { data } = await http.post(`${BASE_URL}`, {
      user_id: userId,
      address: address,
    });
    return data;
  },
  updateUserAddress: async (addressId, address) => {
    const { data } = await http.put(`${BASE_URL}/${addressId}`, {
      address: address,
    });
    return data;
  },
  deleteUserAddress: async (addressId) => {
    const { data } = await http.delete(`${BASE_URL}/${addressId}`);
    return data;
  },
};
