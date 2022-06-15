import { http } from "./http";

export const incindentAPI = {
  addIncident: async (incident) => {
    const { data } = await http.post("incident/add", incident);
    return data;
  },
  getIncidents: async (id) => {
    const { data } = await http.get(`incident/sale/${id}`);
    return data;
  },
}
