import {
  Heading,
  KeyboardAvoidingView,
  ScrollView, Text, View
} from "native-base";
import { ImageBackground, Dimensions } from "react-native";
import ChangePasswordForm from "../components/screens/editPerfil/ChangePasswordForm";

const { width, height } = Dimensions.get("screen");

const ChangePassword = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/register-bg.png")}
      style={{ width, height, zIndex: 1, paddingHorizontal: 30, flex: 1 }}
    >


      <Heading color="white" fontSize={45} fontWeight="bold" mt={5}>
        Cambiar{"\n"}contraseña
      </Heading>
      <KeyboardAvoidingView minH='100%'>
        <View
          backgroundColor="#F4F5F7"
          px={5}
          pt={3}
          flex={1}
          mt={6}
          maxH={470}
          borderTopRadius={20}
          borderBottomRadius={20}
        >

          <ScrollView>
            <Text
              color="#5A7E64"
              fontWeight="bold"
              fontSize={16}
              mb={4}
              alignSelf="center"
            >
              Para cambiar tu contraseña, ingresa:
            </Text>
            <Text
              color="#8898AA"
              fontSize={16}
              mb={4}
              alignSelf="center"
              textAlign="center"
            >
              Escribe tu nueva contraseña
            </Text>
            <ChangePasswordForm navigation={navigation} />
          </ScrollView>
        </View>

      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default ChangePassword;
