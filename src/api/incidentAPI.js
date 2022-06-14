import { http } from "./http";

export const incindentAPI = {
  addIncident: async (incident) => {
    const { data } = await http.post("incident/add", incident);
    return data;
  }
}
