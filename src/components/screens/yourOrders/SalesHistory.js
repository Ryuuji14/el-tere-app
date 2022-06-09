import React from "react";
import { HStack, Icon, IconButton, Stack, Text, View } from "native-base";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const SaleHistory = (props) => {
  
  const item = {
    sales: props.sales,
  }

  const formatDate = (date) => {
    const d = new Date(date);
    const [month, day, year] = d?.toLocaleDateString("en-US").split("/");
    return `${day}/${month}/${year}` || "";
  };
  const regex = /\d{4}-\d{2}-\d{2}/;
  
  return (
    <Stack>
      <Text textAlign="center" fontSize={18} color="#9393AA" mb={3}>
        Estos son tus pedidos ya {"\n"} pagados y validados validados:
      </Text>
      {item.sales.map((sale, index) => (
        <TouchableOpacity activeOpacity={0.9} key={index.toString()}>
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
            <HStack justifyContent="space-between" alignItems="baseline">
              <HStack alignItems="center" space={2}>
                <Icon
                  as={MaterialCommunityIcons}
                  name="cart"
                  size="lg"
                  color="#41634A"
                />
                <Text color="#41634A" fontSize={15} fontWeight="bold">
                  Pedido nro: {sale.id}
                </Text>
              </HStack>
              <HStack>
                <IconButton
                  icon={
                    <Icon
                      as={MaterialCommunityIcons}
                      name="message-reply"
                      color="white"
                      size="md"
                    />
                  }
                  bgColor="#DB7F50"
                  rounded="full"
                />
              </HStack>
            </HStack>

            <Text mt={-1} color="#9393AA">
              Comercios: {sale.company.name}
            </Text>
            <HStack mt={1} justifyContent="space-between">
              <Text color="#6E6E7A">Total: ${sale.total_amount}</Text>
              <Text color="#9393AA"> Completado el:{"\n"}    {formatDate(sale.createdAt)}</Text>
            </HStack>
          </View>
        </TouchableOpacity>
      ))}
    </Stack>
  );
};
