import {http} from './http';

const BASE_URL = 'review/company';
export const reviewAPI = {
  getReviews: async (companyId) => {
    const { data } = await http.get(`${BASE_URL}/${companyId}`);
    return data;
  },
  postReview: async (companyId, review) => {
    const { data } = await http.post(`${"review"}/${companyId}`, review);
    return data;
  }
}
