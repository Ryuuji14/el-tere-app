import { useEffect } from "react";
import { notificationAPI } from "../api/notificationAPI";
import useAuthContext from "./useAuthContext";
import useCustomToast from "./useCustomToast";

export const useNotifications = (loadNotifications) => {
  const {
    state: { user },
  } = useAuthContext();
  const { showErrorToast } = useCustomToast();

  useEffect(() => {
    if (user.id) {
      const getNotifications = async () => {
        try {
          const { data } = await notificationAPI.getUserNotifications(user.id);
          loadNotifications?.(data?.items || []);
        } catch (error) {
          showErrorToast("error obteniendo notificaciones");
          console.log(error);
        }
      };
      getNotifications();
    }
  }, [user.id]);

  return null;
};
