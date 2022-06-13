import { LOAD_NOTIFICATIONS, SET_READ_NOTIFICATIONS } from "../constants";

export const loadNotifications = (payload) => {
  return {
    type: LOAD_NOTIFICATIONS,
    payload,
  };
};

export const setReadNotifications = (payload) => {
  return {
    type: SET_READ_NOTIFICATIONS,
    payload,
  };
};
