import {
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  Button,
  Icon,
  Card,
  HStack,
  Image,
  Stack,
  View,
  Text,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");

const Perfil = () => {
  return (
    <ImageBackground
      source={require("../../assets/register-bg.png")}
      style={{
        width,
        height,
        zIndex: 1,
        flex: 1,
        paddingHorizontal: 30,
        paddingBottom: 5,
      }}
    >
      <Card
        rounded="3xl"
        shadow="0"
        bgColor="#F4F5F7"
        overflow="visible"
        mt="40"
        px={0}
        position="relative"
        pb={0}
      >
        {/* Logo */}
        <View
          position="absolute"
          top={-125}
          borderWidth={4}
          borderColor="white"
          borderRadius="full"
          width="40"
          height="40"
          display="flex"
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
          bgColor="#DD8457"
          alignSelf="center"
        >
          <Image
            source={require("../../assets/LOGO-EL-TERE-2.png")}
            alt="tere logo"
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
        >
          {/* User Info */}
          <Stack w="80%" alignSelf="center" mb={2}>
            <HStack justifyContent="flex-end">
              <TouchableOpacity
                onPress={() => console.log("go to edit")}
                activeOpacity={0.8}
              >
                <View
                  w="10"
                  h="10"
                  bgColor="#DD8457"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  rounded="full"
                >
                  <Icon
                    as={MaterialCommunityIcons}
                    name="wrench"
                    size="md"
                    color="#fff"
                  />
                </View>
              </TouchableOpacity>
            </HStack>
            <Text color="#5A7E64" textAlign="center" fontSize={20} mb={4}>
              Ana Jiménez
            </Text>
            <Text color="#9393AA" textAlign="center" fontSize={16}>
              Carrera 27, calle 34. {"\n"} Barqusimeto
            </Text>
          </Stack>

          {/* User numbers */}
          <HStack
            w="100%"
            borderBottomWidth={1}
            borderBottomColor="#DD8457"
            pb={4}
            mb={5}
          >
            <HStack justifyContent="center" w="49%">
              <Stack alignItems="center">
                <Text fontSize={45} fontWeight="medium" color="#5A7E64" mb={-3}>
                  2
                </Text>
                <Text color="#9393AA" fontSize={16}>
                  Pedidos
                </Text>
              </Stack>
            </HStack>
            <View my="auto" h="70%" top={1} w={0.5} bgColor="#DD8457" />
            <HStack justifyContent="center" w="49%">
              <Stack alignItems="center">
                <Text fontSize={45} fontWeight="medium" color="#5A7E64" mb={-3}>
                  20
                </Text>
                <Text color="#9393AA" fontSize={16}>
                  Comentarios
                </Text>
              </Stack>
            </HStack>
          </HStack>

          {/* User pedidos */}
          <Stack alignSelf="center" width="80%">
            <Text
              textAlign="center"
              color="#5A7E64"
              fontSize={20}
              fontWeight="bold"
              mb={4}
            >
              Tus pedidos más recientes
            </Text>
            {[1, 2].map(() => (
              <View
                w="100%"
                borderWidth={1}
                rounded="xl"
                borderColor="#5A7E64"
                py={2}
                px={5}
                shadow="3"
                bgColor="#FFFFFF"
                mb={5}
              >
                <HStack alignSelf="center" space={3}>
                  <Stack justifyContent="center">
                    <Icon
                      as={MaterialCommunityIcons}
                      name="cart"
                      size={16}
                      color="#DB7F50"
                    />
                  </Stack>
                  <Stack>
                    <Text color="#41634A" fontSize={14} fontWeight="bold">
                      Pedido 1
                    </Text>
                    <Text color="#9393AA">N° de artículos:</Text>
                    <Text color="#9393AA">Fecha:</Text>
                    <Text color="#9393AA">Total: 20$</Text>
                  </Stack>
                </HStack>
              </View>
            ))}
            <Button
              variant="outline"
              rounded="full"
              borderColor="#DB7F50"
              bgColor="#fff"
              shadow="2"
              _text={{
                color: "#DB7F50",
                fontSize: 20,
              }}
            >
              VER TODOS
            </Button>
          </Stack>
        </ScrollView>
      </Card>
    </ImageBackground>
  );
};

export default Perfil;
