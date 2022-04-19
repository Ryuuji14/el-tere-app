import { Text, Button } from "native-base";

const Register = ({ navigation }) => {
  return (
    <>
      <Text>Register</Text>
      <Button onPress={() => navigation?.navigate("Login")}>login</Button>
    </>
  );
};

export default Register;
