import { Heading, ScrollView, Text, View } from "native-base";
import { ImageBackground, Dimensions } from "react-native";
import RegisterForm from "../components/screens/register/RegisterForm";

const { width, height } = Dimensions.get("screen");

const Register = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/register-bg.png")}
      style={{ width, height, zIndex: 1, paddingHorizontal: 30, flex: 1 }}
    >
      <Heading color="white" fontSize={45} fontWeight="bold" mt={5}>
        Únete a{"\n"}EL TERE
      </Heading>

      <View
        backgroundColor="#F4F5F7"
        px={5}
        pt={3}
        pb={5}
        flex={1}
        mt={6}
        borderTopRadius={20}
      >
        <ScrollView>
          <Text color="#5A7E64" fontWeight="bold" fontSize={16} mb={4}>
            ¡Queremos conocerte!
          </Text>
          <Text color="#8898AA" fontSize={16} mb={4}>
            Crea tu perfil personalizado llenando los siguientes campos:
          </Text>
          <RegisterForm />
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default Register;
