import { Button, Heading, HStack, ScrollView, Stack, Text, View, Divider } from "native-base";
import React, { useEffect } from "react";
import { ImageBackground, Dimensions } from "react-native";
import { TimeLineBlock } from "../components/screens/orderDetail/TimeLineBlock";
import { TotalAmounts } from "../components/screens/orderDetail/TotalAmounts";

const { width, height } = Dimensions.get("screen");

export const OrderDetail = (props) => {
  const item = {
    sales: props.route.params.sales,
  }
  useEffect(() => {
    console.log(item.sales)
  }, [])
  return (
    <>
      <ImageBackground
        source={require("../../assets/register-bg.png")}
        style={{ width, height, zIndex: 1, paddingHorizontal: 30, flex: 1 }}
      >
        <Heading color="white" fontSize={36} fontWeight="bold" >
          Pedido nro: {'\n'} {item.sales?.id}
        </Heading>
        <ScrollView flex="1" width="full" px={4} backgroundColor='white'  borderTopRadius={20} showsVerticalScrollIndicator={false}>
          <Text
            mt='4'
            fontSize={18}
            color="gray.700"
          > <Text bold>Comercio:</Text> {item.sales.company.name}</Text>

          <Text fontSize={18} bold> Modalidad: </Text>

          {item.sales.delivery_type === "delivery" ? (
            <> 
            <Text fontSize={18} bold> Delivery </Text>
              <View mb={4}>
                <Text fontSize={14} bold color="gray.700">
                  Dirección de envío:
                </Text>
                <Text fontSize={14} color="gray.500">
                  Carrera 17 entre 39 y 40, Barquisimeto Residencuas Caracaro 3-3
                </Text>
                <Text fontSize={14} color="gray.500">
                  Barquisimeto, Lara
                </Text>
              </View>
            </>)
            : (<Text fontSize={18}>      Pick up </Text>)}

        <Text fontSize={18} bold mt="2"> Estatus:</Text>


          <TimeLineBlock text="Orden ingresada" time="4:07 PM" />
          <TimeLineBlock
            isActive
            text="Orden está siendo procesada"
            time="4:07 PM"
          />
          <TimeLineBlock text="Orden en camino" time="" />
          <TimeLineBlock text="Orden entregada Buen provecho" time="" />

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

            <TotalAmounts />
            <Button
            my='4'
            size="lg"
            rounded="full"
            _text={{
              fontSize: 19,
              color: "#FFFFFF",
            }}
            backgroundColor="#DB7F50"
          >
            AIUDAAAAA
          </Button>
          </View>
        </ScrollView>
        <View py={3} px={3}>
          
        </View>
      </ImageBackground>
    </>
  );
};
