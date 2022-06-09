import { Heading, ScrollView, Text, View } from "native-base";
import { ImageBackground, Dimensions } from "react-native";
import NewPasswordForm from "../components/screens/password/NewPasswordForm";

const { width, height } = Dimensions.get("screen");

const NewPassword = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/register-bg.png")}
      style={{ width, height, zIndex: 1, paddingHorizontal: 30, flex: 1 }}
    >
      <Heading color="white" fontSize={45} fontWeight="bold" mt={5}>
        Nueva{"\n"}contraseña
      </Heading>

      <View
        backgroundColor="#F4F5F7"
        px={5}
        pt={3}
        pb={5}
        flex={1}
        mt={6}
        borderTopRadius={20}
        mb={40}
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
            ¡Protege el acceso a tu cuenta!
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
          <NewPasswordForm navigation={navigation} />
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default NewPassword;
