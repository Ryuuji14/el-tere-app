import {
  Heading,
  ScrollView,
  Text,
  View,
  Image,
  Stack,
  VStack,
  HStack,
  Button,
} from "native-base";
import { ImageBackground, Dimensions } from "react-native";
import LoginForm from "../components/screens/login/LoginForm";
import WhiteLogo from "../../assets/LOGO-blanco-EL-TERE.png";

const { width, height } = Dimensions.get("screen");

const Login = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/register-bg.png")}
      style={{ width, height, zIndex: 1, paddingHorizontal: 30, flex: 1 }}
    >
      <HStack justifyContent="center">
        <Image source={WhiteLogo} alt="El Tere Logo" size={200} mt={6} />
      </HStack>

      <View
        backgroundColor="#F4F5F7"
        px={5}
        pt={3}
        pb={5}
        flex={1}
        mt={6}
        borderTopRadius={20}
        borderBottomRadius={20}
        mb={2}
      >

          <Text color="#8898AA" fontSize={16} mb={4} alignSelf="center">
            Inicia Sesión con tus datos:
          </Text>
          <LoginForm navigation={navigation} />
        
      </View>
    </ImageBackground>
  );
};

export default Login;
