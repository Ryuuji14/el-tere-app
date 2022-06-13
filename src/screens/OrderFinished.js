import { Button, Heading, HStack, ScrollView, Stack, Text, View, Divider } from "native-base";
import React, { useEffect, useState } from "react";
import { ImageBackground, Dimensions } from "react-native";
import { TotalAmounts } from "../components/screens/orderDetail/TotalAmounts";
import ModalReviews from "../components/screens/rating/ModalReviews";
import { useNavigation } from "@react-navigation/native";
import useLoading from "../hooks/useLoading";
import { saleAPI } from "../api/salesAPI";
import { companyAPI } from "../api/companyAPI";

const { width, height } = Dimensions.get("screen");

export const OrderFinished = (props) => {
  const item = {
    sales: props.route.params.sales,
  }
  const { isLoading, startLoading, stopLoading } = useLoading()

  const Navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [company, setCompany] = useState({});

  const getPedidos = async () => {
    try {
      startLoading();
      const { data } = await saleAPI.getSaleProductBySaleId(item.sales.id);
      setPedidos(data || []);
    } catch (error) {
      console.log(error)
    }
    stopLoading();
  }

  const getDeliveryPrice = async () => {
    try {
      startLoading();
      const { data } = await companyAPI.getCompanyProduct(item.sales.company.id);
      console.log("delivery price",data)
      setCompany(data);
    } catch (error) {
      console.log(error)
    }
    stopLoading();
  }
  useEffect(() => {
    getPedidos();
    getDeliveryPrice();
  }, [])
  const idPedidos = pedidos.map((pedido) => pedido.product_id);
  const quantitys = pedidos.map((pedido) => pedido.quantity);
  const delivery = item.sales.delivery_type ? company.delivery_price : 0;
  const subTotal = item.sales.total_amount - delivery;
  return (
    <>
      <ImageBackground
        source={require("../../assets/register-bg.png")}
        style={{ width, height, zIndex: 1, paddingHorizontal: 30, flex: 1 }}
      >
        <Heading color="white" fontSize={36} fontWeight="bold" >
          Pedido nro: {'\n'} {item?.sales?.id}
        </Heading>
        <ScrollView flex="1" width="full" px={4} backgroundColor='white' borderTopRadius={20} showsVerticalScrollIndicator={false}>
          <Text
            mt='4'
            fontSize={18}
            color="gray.700"
          > <Text bold>Comercio:</Text> {item?.sales?.company?.name}</Text>

          <Text fontSize={18} bold> Modalidad: </Text>

          {item.sales.delivery_type === "delivery" ? (
            <>
              <Text fontSize={18} bold> Delivery </Text>
              <View mb={4}>
                <Text fontSize={14} bold color="gray.700">
                  Dirección de envío:
                </Text>
                <Text fontSize={14} color="gray.500">
                  {item?.sales?.address}
                </Text>
              </View>
            </>)
            : (<Text fontSize={18}>      Pick up </Text>)}

          <Text fontSize={18} mt="2"> <Text bold> Estatus:</Text> Pedido Finalizado</Text>
          <Button
            my='4'
            size="lg"
            rounded="full"
            _text={{
              fontSize: 19,
              color: "#FFFFFF",
            }}
            backgroundColor="#DB7F50"
            onPress={() => Navigation.navigate("ProductosFinalizados", {
              sales: item.sales,
              idProductos: idPedidos,
              quantitys: quantitys
            })}
          >
            VER PRODUCTOS
          </Button>

          <View mt={3}>
            <Divider
              my="2"
              _light={{
                bg: "#F96332",
              }}
              _dark={{
                bg: "#F96332",
              }}
            />
            {/* no se si son varios aqui */}

            <Stack borderBottomWidth={1} borderColor="gray.200" pb={2} mb={2}>
              <HStack justifyContent="space-between">
              </HStack>
            </Stack>

            <TotalAmounts 
            total={item.sales.total_amount} 
            delivery={ delivery }
            subTotal={subTotal}
            />
            <ModalReviews
              showModal={showModal}
              setShowModal={setShowModal}
              navigation={item.sales}
            />
            <Button
              my='4'
              size="lg"
              rounded="full"
              _text={{
                fontSize: 19,
                color: "#FFFFFF",
              }}
              backgroundColor="#DB7F50"
              onPress={() => setShowModal(true)}
            >
              CALIFICAR COMERCIO
            </Button>
          </View>
        </ScrollView>
        <View py={3} px={3}>

        </View>
      </ImageBackground>
    </>
  );
};
