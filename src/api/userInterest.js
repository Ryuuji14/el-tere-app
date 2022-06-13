import { http } from "./http";

const BASE_URL = "userInterest";

export const userInterestAPI = {
  getUserInterest: async (userId) => {
    const { data } = await http.get(`${BASE_URL}/${userId}`);
    return data;
  },
  updateUserInterestStatus: async (interestId, newStatus) => {
    const { data } = await http.patch(`${BASE_URL}/${interestId}`, {
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
