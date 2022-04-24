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
import WhiteLogo from "../../assets/LOGO-blanco-EL-TERE.png";

const { width, height } = Dimensions.get("screen");

const Onboarding = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/register-bg.png")}
      style={{ width, height, zIndex: 1, paddingHorizontal: 30, flex: 1 }}
    >
      <Stack space={2} mt={10}>
        <VStack>
          <HStack justifyContent="center">
            <Image source={WhiteLogo} alt="El Tere Logo" size="2xl" />
          </HStack>
          <Heading color="white" fontSize={60} fontWeight="bold" mt={8} mb={4}>
            ¡Hola!
          </Heading>

          <Text color="#FFFFFF" fontSize={18} mb={6}>
            Te damos la bienvenida a la App oficial de EL TERE.
          </Text>
          <Text color="#FFFFFF" fontSize={18} mb={10}>
            Somos tu mejor aliado para hacer mercado.
          </Text>

          <Button
            rounded="full"
            padding={3.5}
            _text={{
              fontSize: 20,
              color: "#DB7F50",
            }}
            backgroundColor="#FFFFFF"
            onPress={() => navigation?.navigate("Login")}
          >
            COMIENZA AQUÍ
          </Button>
        </VStack>
      </Stack>
    </ImageBackground>
  );
};

export default Onboarding;
