import { LOAD_NOTIFICATIONS, SET_READ_NOTIFICATIONS } from "../constants";

export const notificationsItems = (state = [], action) => {
  switch (action.type) {
    case LOAD_NOTIFICATIONS:
      return [...action.payload];

    case SET_READ_NOTIFICATIONS:
      return state.map((item) => ({
        ...item,
        unread: false,
      }));

    default:
      return state;
  }
};

export default notificationsItems;
