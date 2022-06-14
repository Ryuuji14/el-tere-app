import { http } from "./http";

export const notificationAPI = {
  getUserNotifications: async (userId) => {
    const { data } = await http.get(`user/${userId}/notifications`);
    return data;
  },
  setNotificationAsRead: async (notificationId) => {
    const { data } = await http.patch(`notification/unread/${notificationId}`, {
      unread: false,
    });
    return data;
  },
};
