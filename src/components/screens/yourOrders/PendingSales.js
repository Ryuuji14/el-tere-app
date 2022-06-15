import React, { useEffect, useState } from "react";
import { TouchableOpacity, RefreshControl } from "react-native";
import { HStack, Icon, IconButton, ScrollView, Stack, Text, View } from "native-base";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { saleAPI } from "../../../api/salesAPI";
import useCustomToast from "../../../hooks/useCustomToast";
import useLoading from "../../../hooks/useLoading";
import { useNavigation } from "@react-navigation/native";

const formatDate = (date) => {
  const d = new Date(date);
  const [month, day, year] = d?.toLocaleDateString("en-US").split("/");
  return `${day}/${month}/${year}` || "";
};

export const PendingSales = (props) => {
  const item = {
    sales: props.sales,
  }
  const { isLoading, startLoading, stopLoading } = useLoading()
  const [pedidos, setPedidos] = useState([]);

  const getProducts = async () => {
    try {
      startLoading();
      if (item.sales.length > 0) {
        const salesIds = item.sales.map((sale) => sale.id);
        const pedidosResponses = await Promise.all(
          salesIds.map((id) => saleAPI.getSaleProductBySaleId(id))
        )
        setPedidos(pedidosResponses.map((pedido) => pedido.data));
      }
    } catch (error) {
      console.log(error)
    }
    stopLoading();
  }


  useEffect(() => {
    getProducts();
  }, [])

  const Navigation = useNavigation();

  const regex = /\d{4}-\d{2}-\d{2}/;

  return (
    <ScrollView refreshControl={
      <RefreshControl refreshing={isLoading} onRefresh={getProducts} />
    }
      showsVerticalScrollIndicator={false}
    >
      <Stack>
      <Text textAlign="center" fontSize={18} color="#9393AA" mb={3}>
            Estos son tus pedidos {"\n"} pendientes por pagar para ser {"\n"}{" "}
            validados:
          </Text> 
      {pedidos.length > 0 ? (pedidos.map((sale, index) => (
        <>
            <TouchableOpacity
              ctiveOpacity={0.8}
              key={index.toString()}
              onPress={() => Navigation.navigate("OrderDetail", {
                sales: item.sales[index],
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
                      Pedido nro: {item.sales[index].id}
                    </Text>
                    <Text color="#9393AA">N° de artículos: {sale.length} </Text>
                    <Text color="#9393AA">Fecha: {formatDate(item.sales[index].createdAt)}</Text>
                    <Text color="#6E6E7A">Total: ${item.sales[index].total_amount}</Text>
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
                          idPedido: item.sales[index].id,
                          companyName: item.sales[index].company.name,
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
              No tienes pedidos pendientes por pagar.
            </Text>
          )} 
      </Stack>
    </ScrollView>
  );
};
