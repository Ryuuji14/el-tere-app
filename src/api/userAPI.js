import ChangePassword from "../screens/ChangePassword";
import { http } from "./http";

const BASE_URL = "user";

export const userAPI = {
  getUser: async (userId) => {
    const { data } = await http.get(`${BASE_URL}/${userId}`);
    return data;
  },
  getUserComments: async (userId) => {
    const { data } = await http.get(`${BASE_URL}/${userId}/reviews`);
    return data;
  },
  updateUser: async (userId, form) => {
    const { birthday, ...f } = form;

    const [year, month, day] = new Date(birthday)
      ?.toISOString()
      ?.split("T")[0]
      .split("-");

    const { data } = await http.put(`${BASE_URL}/${userId}`, {
      ...f,
      birthday: `${month}/${day}/${year}`,
    });
    return data;
  },
  getNotifications: async (userId) => {
    const { data } = await http.get(`${BASE_URL}/${userId}/notifications`);
    return data;
  },
  ChangePassword: async (userId) => {
    const { data } = await http.put(`${BASE_URL}/password/${userId}`); 
    return data;
  },
}

