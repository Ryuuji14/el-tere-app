import React from "react";
import { HStack, Icon, IconButton, Stack, Text, View } from "native-base";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const SaleHistory = () => {
  return (
    <Stack>
      <Text textAlign="center" fontSize={18} color="#9393AA" mb={3}>
        Estos son tus pedidos ya {"\n"} pagados y validados validados:
      </Text>
      {[1, 2].map((_, index) => (
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
                  Pedido nro: 45646
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
              Comercios: La Pastora
            </Text>
            <HStack mt={1} justifyContent="space-between">
              <Text color="#6E6E7A">Total: 20$</Text>
              <Text color="#9393AA">20/03/2022</Text>
            </HStack>
          </View>
        </TouchableOpacity>
      ))}
    </Stack>
  );
};
