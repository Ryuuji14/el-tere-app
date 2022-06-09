import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { HStack, Icon, IconButton, ScrollView, Stack, Text, View } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { saleAPI } from "../../../api/salesAPI";
import useCustomToast from "../../../hooks/useCustomToast";
import ModalReviews from "../rating/ModalReviews";
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
  const [showModal, setShowModal] = useState(false);
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
   
  useEffect (() => {
    getProducts();
  }, [])

const Navigation = useNavigation();
  
  const regex = /\d{4}-\d{2}-\d{2}/;

  return (
<ScrollView >
    <Stack>
      <Text textAlign="center" fontSize={18} color="#9393AA" mb={3}>
        Estos son tus pedidos {"\n"} pendientes por pagar para ser {"\n"}{" "}
        validados:
      </Text>
       <ModalReviews 
       showModal={showModal}
       setShowModal={setShowModal}
       navigation={props.navigation}
       />
      {pedidos.map((sale, index) => (
        
        <TouchableOpacity 
        ctiveOpacity={0.8} 
        key={index.toString() }
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
                      as={MaterialCommunityIcons}
                      name="message-reply"
                      color="white"
                      size="2xl"
                    />
                  }
                  bgColor="#DB7F50"
                  rounded="full"
                />
              </Stack>
            </HStack>
          </View>
        </TouchableOpacity>
        
      ))}
    </Stack>
    </ScrollView>
  );
};
