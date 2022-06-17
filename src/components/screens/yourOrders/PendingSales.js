import React, { useEffect, useState } from "react";
import { TouchableOpacity, RefreshControl } from "react-native";
import { HStack, Icon, IconButton, ScrollView, Stack, Text, View } from "native-base";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { saleAPI } from "../../../api/salesAPI";
import useCustomToast from "../../../hooks/useCustomToast";
import useLoading from "../../../hooks/useLoading";
import { useNavigation } from "@react-navigation/native";
import useAuthContext from "../../../hooks/useAuthContext";

const formatDate = (date) => {
  const d = new Date(date);
  const [month, day, year] = d?.toLocaleDateString("en-US").split("/");
  return `${day}/${month}/${year}` || "";
};

export const PendingSales = (props) => {
  const item = {
    sales: props.sales,
  }
  const {
    dispatch,
    state: { user },
  } = useAuthContext();

  const { isLoading, startLoading, stopLoading } = useLoading()
  const [pedidos, setPedidos] = useState([]);
  const [_sale, setSale] = useState([])
  const [userSales, setUserSales] = useState([])

  const getUserSales = async () => {
    startLoading()
    try {
      const [ {data: salesInfo }] = await Promise.all([
        saleAPI.getUserSales(user.id)
      ])
      const activeSales = salesInfo?.items.filter(sale => sale.active)
      const pendingSales = activeSales?.filter(sale => sale.status === "pending" || sale.status === "to_deliver")
      setUserSales(pendingSales)
      
      if(userSales?.length > 0) {
        const salesIds = userSales?.map((sale) => sale.id);
        
        const pedidosResponses = await Promise.all(
          salesIds.map((id) => saleAPI.getSaleProductBySaleId(id))
        );
     setPedidos(pedidosResponses.map((pedido) => pedido.data))

     console.log(pedidos)
      }
    } catch (error) {
      console.log(error)
    }
    stopLoading()
  }

  useEffect(() => {
    getUserSales();
  }, [])

  const Navigation = useNavigation();

  const regex = /\d{4}-\d{2}-\d{2}/;

  return (
    <ScrollView refreshControl={
      <RefreshControl refreshing={isLoading} onRefresh={getUserSales} />
    }
      showsVerticalScrollIndicator={false}
    >
      <Stack>
      <Text textAlign="center" fontSize={18} color="#9393AA" mb={3}>
            Estos son tus pedidos {"\n"} pendientes por pagar para ser {"\n"}{" "}
            validados:
          </Text> 
      {userSales?.length > 0 ? (userSales?.map((sale, index) => (
        <>
            <TouchableOpacity
              ctiveOpacity={0.8}
              key={index.toString()}
              onPress={() => Navigation.navigate("OrderDetail", {
                sales: sale,
              })}
            >
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
                <HStack space={3}>
                  <Stack justifyContent="center" mr={4}>
                    <Icon
                      as={MaterialCommunityIcons}
                      name="cart"
                      size="5xl"
                      color="#41634A"
                    />
                  </Stack>
                  <Stack mr={4}>
                    <Text color="#41634A" fontSize={14} fontWeight="bold">
                      Pedido nro: {sale?.id}
                    </Text>
                    <Text color="#9393AA">N° de artículos: {pedidos[index]?.length} </Text>
                    <Text color="#9393AA">Fecha: {formatDate(sale?.createdAt)} </Text>
                    <Text color="#6E6E7A">Total: ${sale?.total_amount} </Text>
                  </Stack>
                  <Stack alignItems="center" justifyContent="center">
                    <IconButton
                      icon={
                        <Icon
                          as={FontAwesome}
                          name="warning"
                          color="white"
                          size="2xl"
                        />
                      }
                      bgColor="#41634A"
                      rounded="full"
                      onPress={() => {
                        Navigation.navigate("ReporteIncidencias", {
                          idPedido: userSales[index]?.id,
                          companyName: userSales[index]?.company.name,
                        })
                      }}
                    />
                  </Stack>
                </HStack>
              </View>
            </TouchableOpacity>
            </>
      ))) : (
            <Text textAlign="center" fontSize={18} color="#9393AA" mb={3} mt="20">
              No tienes pedidos pendientes.
            </Text>
          )} 
      </Stack>
    </ScrollView>
  );
};
