import { Button, Heading, HStack, ScrollView, Stack, Text, View, Divider, Pressable, Avatar, Box, VStack } from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import React, { useEffect, useState } from "react";
import { ImageBackground, Dimensions, StyleSheet } from "react-native";
import useLoading from "../hooks/useLoading";
import useAuthContext from "../hooks/useAuthContext";
import useCustomToast from "../hooks/useCustomToast";
import { userAPI } from "../api/userAPI";
import NotificationCard from "../components/screens/NotificationCard"

const { width, height } = Dimensions.get("screen");

const Notifications = () => {
  const {
    dispatch,
    state: { user },
  } = useAuthContext();

  const { isLoading, startLoading, stopLoading } = useLoading();
  const { showErrorToast, showSuccesToast } = useCustomToast();
  const [notifications, setNotifications] = useState([]);
  const getNotifications = async () => {
    startLoading();
    try {
      const [{ data: notifications }] = await Promise.all([
        userAPI.getNotifications(user.id),
      ]);

      setNotifications(notifications);

    } catch (error) {
      showErrorToast(error.message);
    }
    finally {
      stopLoading();
    }
  }

  useEffect(() => {
    if (user?.id) {
      getNotifications();
    }
  }, []);

  return (
    <>
      <ImageBackground
        source={require("../../assets/register-bg.png")}
        style={{ width, height, zIndex: 1, paddingHorizontal: 30, flex: 1 }}
      >
        <Heading color="white" fontSize={36} fontWeight="bold" >
          Tus {'\n'} Notificaciones
        </Heading>
        <View width="100%" height="100%" bgColor='white' borderRadius={10}  alignItems='center'  >
          <VStack space={2} py={2} bgcolor="black" >
            {notifications.items?.map(notification => (
              <NotificationCard
                key={notification.id}
                id={notification.id}
                message={notification.message}
                title={notification.title}
              />
            ))}
          </VStack>
        </View>

      </ImageBackground>
    </>
  );
};
const styles = StyleSheet.create({
  emptyContainer: {
    height: '100%',
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});

export default Notifications;
