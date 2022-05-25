import { http } from "./http";

export const dashboardAPI = {
  getEvents: async () => {
    const { data } = await http.get("event?active=true");
    return data?.data;
  },
  getPromotions: async () => {
    const { data } = await http.get("promotion?active=true");
    return data?.data;
  },
};
