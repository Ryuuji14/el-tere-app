import { Text, Button } from "native-base";
import useAuthContext from "../hooks/useAuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Notifications = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    AsyncStorage.removeItem("@token");
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <>
      <Text>Notifications</Text>
      <Button onPress={logout}>Logout</Button>
    </>
  );
};

export default Notifications;
