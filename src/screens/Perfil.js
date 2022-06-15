import { useEffect, useState } from "react";
import {
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
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
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import useAuthContext from "../hooks/useAuthContext";
import { saleAPI } from "../api/salesAPI";
import { userAPI } from "../api/userAPI";
import { addressAPI } from "../api/addressAPI";
import useLoading from "../hooks/useLoading";
import useCustomToast from "../hooks/useCustomToast";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("screen");

const formatDate = (date) => {
  const d = new Date(date);
  const [month, day, year] = d?.toLocaleDateString("en-US").split("/");

  return `${day}/${month}/${year}` || "";
};

const getTotalPedidoAmount = (pedidos) => {
  return pedidos.reduce((acc, pedido) => {
    return acc + pedido.quantity * pedido.price;
  }, 0);
};

const Perfil = ({ navigation }) => {
  const Navigation = useNavigation();
  const {
    dispatch,
    state: { user },
  } = useAuthContext();
  const [sales, setSales] = useState([]);
  const [comments, setComments] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [pedidos, setPedidos] = useState([]);
  const { showErrorToast } = useCustomToast();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const getUserInfo = async () => {
    startLoading();
    try {
      const [{ data: userInfo }, { data: salesInfo }, { data: userAddresses }, {data: UserComments}] =
        await Promise.all([
          userAPI.getUser(user.id),
          saleAPI.getUserSales(user.id),
          addressAPI.getUserAddresses(user.id),
          userAPI.getUserComments(user.id),
        ]);

      setUserInfo({
        ...userInfo,
        address: userAddresses?.[0]?.address || "",

      });
      setSales(salesInfo.items?.filter((sale) => sale.active));
      setComments(UserComments);
      if (salesInfo.items?.length > 0) {
        const salesIds = salesInfo.items?.map((sale) => sale.id);
     
        const pedidosResponses = await Promise.all(
          salesIds.slice(0, 2).map((id) => saleAPI.getSaleProductBySaleId(id))
        );
        
        setPedidos(pedidosResponses.map((response) => response.data));

      }
    } catch (error) {
      showErrorToast(error);
      console.log(error)
    }
    stopLoading();
  };

  useEffect(() => {
    if (user?.id) {
      getUserInfo();
    }
  }, [user]);

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
          zIndex={10}
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
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={getUserInfo} />
          }
        >
          {/* User Info */}
          <Stack w="80%" alignSelf="center" mb={2}>
            <HStack justifyContent="space-between">
              <TouchableOpacity
                onPress={() => dispatch({ type: "LOGOUT" })}
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
                  <Icon as={Entypo} name="log-out" size="md" color="#fff" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation?.navigate("EditPerfil")}
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
              {userInfo?.first_name} {userInfo?.last_name}
            </Text>
            <Text color="#9393AA" textAlign="center" fontSize={16}>
              {userInfo?.address}
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
                  {sales.length || 0}
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
                  {comments.totalItems || 0}
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
            {pedidos?.map((pedido, index) => (
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
                key={index.toString()}
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
                      Pedido {sales[index]?.id}
                    </Text>
                    <Text color="#9393AA">
                      N° de artículos: {pedido.length}
                    </Text>
                    <Text color="#9393AA">
                      Fecha: {formatDate(sales[index]?.createdAt)}
                    </Text>
                    <Text color="#9393AA">
                      Total: {getTotalPedidoAmount(pedido)}$
                    </Text>
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
              onPress={() => Navigation.navigate("YourOrders",{
                sales,
              })} 
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
