import { http } from "./http";

const BASE_URL = "interest";

export const interestAPI = {
  getInterest: async () => {
    const { data } = await http.get(BASE_URL);
    return data;
  },
};
