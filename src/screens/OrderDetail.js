import { Button, HStack, ScrollView, Stack, Text, View } from "native-base";
import React from "react";
import { TimeLineBlock } from "../components/screens/orderDetail/TimeLineBlock";
import { TotalAmounts } from "../components/screens/orderDetail/TotalAmounts";

export const OrderDetail = () => {
  return (
    <>
      <ScrollView flex="1" width="full" px={4}>
        <View
          my={3}
          borderTopWidth={1}
          borderBottomWidth={1}
          borderColor="gray.200"
          py={4}
        >
          <Text textAlign="center" fontSize={15}>
            Estado de la orden: H0-12344
          </Text>
        </View>

        <Text py={5}>MODALIDAD: ENTREGA A DOMICILIO</Text>

        <View mb={4}>
          <Text fontSize={12} color="gray.700">
            Dirección de envío
          </Text>
          <Text fontSize={12} color="gray.500">
            Carrera 17 entre 39 y 40, Barquisimeto Residencuas Caracaro 3-3
          </Text>
          <Text fontSize={12} color="gray.500">
            Barquisimeto, Lara
          </Text>
        </View>

        <TimeLineBlock text="Orden ingresada" time="4:07 PM" />
        <TimeLineBlock
          isActive
          text="Orden está siendo procesada"
          time="4:07 PM"
        />
        <TimeLineBlock text="Orden en camino" time="" />
        <TimeLineBlock text="Orden entregada Buen provecho" time="" />

        <View mt={3}>
          <Text fontSize={16} color="gray.700" mb={2}>
            Detalle de la orden
          </Text>

          {/* no se si son varios aqui */}

          <Stack borderBottomWidth={1} borderColor="gray.200" pb={2} mb={2}>
            <HStack justifyContent="space-between">
              <Text>Al Gusto</Text>
              <Text>0</Text>
            </HStack>
          </Stack>

          <TotalAmounts />
        </View>
      </ScrollView>
      <View py={3} px={3}>
        <Button
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
    </>
  );
};
