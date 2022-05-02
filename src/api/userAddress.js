import { http } from "./http";

const BASE_URL = "address/user";

export const userAddressAPI = {
  getUserAddress: async (userId) => {
    const { data } = await http.get(`${BASE_URL}/${userId}`);
    return data;
  },
  // updateUserInterestStatus: async (userId, newStatus) => {
  //   const { data } = await http.patch(`${BASE_URL}/${userId}`, {
  //     active: newStatus,
  //   });
  //   return data;
  // },
  addUserAddress: async (userId, address) => {
    const { data } = await http.post(`${BASE_URL}`, {
      user_id: userId,
      address: address,
    });
    return data;
  },
};
