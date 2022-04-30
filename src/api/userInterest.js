import { http } from "./http";

const BASE_URL = "interest/user";

export const userInterestAPI = {
  getUserInterest: async (userId) => {
    const { data } = await http.get(`${BASE_URL}/${userId}`);
    return data;
  },
  updateUserInterestStatus: async (userId, newStatus) => {
    const { data } = await http.patch(`${BASE_URL}/${userId}`, {
      active: newStatus,
    });
    return data;
  },
  addUserInterest: async (userId, interestId) => {
    const { data } = await http.post(`${BASE_URL}/add`, {
      user_id: userId,
      interest_id: interestId,
    });
    return data;
  },
};
