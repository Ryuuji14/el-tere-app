import { http } from "./http";

const BASE_URL = "user";

export const userAPI = {
  getUser: async (userId) => {
    const { data } = await http.get(`${BASE_URL}/${userId}`);
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
};
