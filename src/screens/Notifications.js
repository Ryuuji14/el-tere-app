import {
  Button,
  Heading,
  HStack,
  ScrollView,
  Stack,
  Text,
  View,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Dimensions,
  StyleSheet,
  RefreshControl,
} from "react-native";
import useLoading from "../hooks/useLoading";
import useAuthContext from "../hooks/useAuthContext";
import useCustomToast from "../hooks/useCustomToast";
import { userAPI } from "../api/userAPI";
import { notificationAPI } from "../api/notificationAPI";
import NotificationCard from "../components/screens/NotificationCard";
import { connect } from "react-redux";
import { setReadNotifications } from "../Redux/Actions/notificationActions";

const { width, height } = Dimensions.get("screen");

const Notifications = ({ setReadNotifications }) => {
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
      const setToRead = notifications?.items
        .filter((el) => el.unread)
        .map((el) => el.id);

      await Promise.all(
        setToRead.map((el) =>
          notificationAPI
            .setNotificationAsRead(el)
            .then((res) => el)
            .catch((err) => null)
        )
      );

      setReadNotifications();
    } catch (error) {
      showErrorToast(error);
    } finally {
      stopLoading();
    }
  };

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
        <Heading color="white" fontSize={36} fontWeight="bold">
          Tus {"\n"} Notificaciones
        </Heading>
        <View
          width="100%"
          height="100%"
          bgColor="white"
          borderRadius={10}
          alignItems="center"
          paddingBottom="30%"
        >
          <VStack space={2} py={2} bgcolor="black" ml="4">
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={getNotifications}
                />
              }
            >
              {notifications?.items?.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  id={notification.id}
                  message={notification.message}
                  title={notification.title}
                />
              ))}
            </ScrollView>
          </VStack>
        </View>
      </ImageBackground>
    </>
  );
};
const styles = StyleSheet.create({
  emptyContainer: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    setReadNotifications: () => dispatch(setReadNotifications()),
  };
};

const mapStateToProps = (state) => {
  const { notificationItems } = state;
  return {
    notificationItems,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);

// export default Notifications;
