import { http } from "./http";

const BASE_URL = "address/user";

export const addressAPI = {
  getUserAddresses: async (userId) => {
    const { data } = await http.get(`${BASE_URL}/${userId}`);
    return data;
  },
  registerUserAddress: async (form = {}) => {
    let { user_id, address } = form;
    const { data } = await http.post(BASE_URL, {
      user_id,
      address,
    });
    return data;
  },
};
