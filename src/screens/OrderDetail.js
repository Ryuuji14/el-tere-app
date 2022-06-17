import { Button, Heading, HStack, ScrollView, Stack, Text, View, Divider } from "native-base";
import React, { useEffect, useState } from "react";
import { ImageBackground, Dimensions, RefreshControl } from "react-native";
import { TimeLineBlock } from "../components/screens/orderDetail/TimeLineBlock";
import { TotalAmounts } from "../components/screens/orderDetail/TotalAmounts";
import { companyAPI } from "../api/companyAPI";
import useLoading from "../hooks/useLoading";
import useCustomToast from "../hooks/useCustomToast";
import { incindentAPI } from "../api/incidentAPI";
import { saleAPI } from "../api/salesAPI";

const { width, height } = Dimensions.get("screen");

export const OrderDetail = (props) => {
  const item = {
    sales: props.route.params?.sales,
  }
  const [company, setCompany] = useState({});
  const { isLoading, startLoading, stopLoading } = useLoading()
  const [incidencia, setIncidencia] = useState([]);
  const [sale, setSale] = useState([]);
  const { showErrorToast, showSuccesToast } = useCustomToast();
  const formatDate = (date) => {
    const d = new Date(date);
    const [month, day, year] = d?.toLocaleDateString("en-US").split("/");

    return `${day}/${month}/${year}` || "";
  };

  const getDeliveryPrice = async () => {
    try {
      startLoading();
      const { data } = await companyAPI.getCompanyProduct(item?.sales?.company.id);
      setCompany(data);
    } catch (error) {
      console.log(error)
    }
    stopLoading();
  }
  const getIncidencia = async () => {
    startLoading();
    try {
      const { data } = await incindentAPI.getIncidents(item?.sales?.id);
      setIncidencia(data);
    } catch (error) {
      showErrorToast(error.message);
    }
    finally {
      stopLoading();
    }
  }
  const getSaleById = async () => {
    startLoading();
    try {
      const { data } = await saleAPI.getSaleById(item.sales?.id);
      setSale(data);
      console.log(sale)
    } catch (error) {
      showErrorToast(error.message);
    }
    finally {
      stopLoading();
    }
  }

  useEffect(() => {
    getDeliveryPrice();
    getIncidencia();
    getSaleById();
  }, [])

  const delivery = sale?.delivery_type === "delivery" ? company?.delivery_price : 0;
  const subTotal = sale?.total_amount - delivery;
  return (
    <>
      <ImageBackground
        source={require("../../assets/register-bg.png")}
        style={{ width, height, zIndex: 1, paddingHorizontal: 30, flex: 1 }}
      >
        <Heading color="white" fontSize={36} fontWeight="bold" >
          Pedido nro: {'\n'} {sale?.id}
        </Heading>
        <ScrollView flex="1" width="full" px={4} backgroundColor='white' borderTopRadius={20} showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl
            refreshing={isLoading}
            onRefresh={async () => {
              await Promise.all([getDeliveryPrice(), getIncidencia(), getSaleById()]);
            }}
          />
          }
        >
          <Text
            mt='4'
            fontSize={18}
            color="#6E6E7A"
          > <Text bold>Comercio:</Text> {item?.sales?.company?.name}</Text>

          <Text fontSize={18} bold color="#6E6E7A"> Modalidad: </Text>


          {sale?.delivery_type === "delivery" ? (
            <>
              <Text fontSize={18} bold color="#6E6E7A"> Delivery </Text>
              <Text fontSize={18} bold mt="2" color="#6E6E7A"> Estatus: </Text>
              <View mb={4}>
                <Text fontSize={16} bold color="#6E6E7A">
                  Dirección de envío: 
                </Text>
                <Text fontSize={16} color="#6E6E7A">
                  {sale?.address}
                </Text>
                <Text fontSize={14} color="#6E6E7A">
                </Text>
              </View>
              <TimeLineBlock text="Orden ingresada" />
              <TimeLineBlock
                isActive={sale?.status === "pending"}
                text="Orden está siendo procesada"
              />
              <TimeLineBlock isActive={sale?.status === "to_deliver"} text="Orden en camino" />
              <TimeLineBlock isActive={sale?.status === "complete"} text="Orden entregada " />
              <HStack space={2} justifyContent="center" alignContent="center">
                  <Text fontSize="16" bold color="#6E6E7A" textAlign="center"> 
                  Ultima Actualización: {"\n"}
                  {formatDate(sale?.updatedAt)} {"\n"} 
                  {sale?.time}
                  </Text>
                </HStack>
            </>)
            : (
              <>

                <Text fontSize={18} color="#6E6E7A"> Retiro en el Comercio </Text>
                <Text fontSize={18} bold mt="2" color="#6E6E7A"> Estatus: </Text>
                <TimeLineBlock text="Orden ingresada" />
                <TimeLineBlock
                  isActive={sale?.status === "pending"}
                  text="Orden está siendo procesada"

                />
                <TimeLineBlock
                  isActive={sale?.status === "complete"}
                  text="Orden entregada " />
                <HStack space={2} justifyContent="center" alignContent="center">
                  <Text fontSize="16" bold color="#6E6E7A" textAlign="center"> 
                  Ultima Actualización: {"\n"}
                  {formatDate(sale?.updatedAt)} {"\n"} 
                  {sale?.time}
                  </Text>
                  
                </HStack>
              </>
            )}
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

            <Stack borderBottomWidth={1} borderColor="gray.200" pb={2} mb={2}>
              <HStack justifyContent="space-between">
              </HStack>
            </Stack>

            <TotalAmounts
              total={sale?.total_amount}
              subTotal={subTotal}
              delivery={delivery}
            />
            <Button
              my='4'
              size="lg"
              rounded="full"
              _text={{
                fontSize: 19,
                color: "#FFFFFF",
              }}
              backgroundColor="#41634A"
              onPress={() => {
                props.navigation.navigate("Incidencias", {
                  sales: sale,
                });
              }
              }
              isDisabled={incidencia?.length > 0}
            >
              REPORTAR INCIDENCIA
            </Button>
          </View>
        </ScrollView>
        <View py={3} px={3}>

        </View>
      </ImageBackground>
    </>
  );
};
