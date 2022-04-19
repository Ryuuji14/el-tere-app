import { Button, Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = ({ navigation }) => {
  return (
    <>
      <Text>Login screen</Text>
      <Button onPress={() => navigation?.navigate("Register")}>Register</Button>
    </>
  );
};

export default Login;
