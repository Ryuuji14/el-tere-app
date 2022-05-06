import React from "react";
import { TouchableOpacity } from "react-native";
import { HStack, Icon, IconButton, Stack, Text, View } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const PendingSales = () => {
  return (
    <Stack>
      <Text textAlign="center" fontSize={18} color="#9393AA" mb={3}>
        Estos son tus pedidos {"\n"} pendientes por pagar para ser {"\n"}{" "}
        validados:
      </Text>

      {[1, 2].map((_, index) => (
        <TouchableOpacity activeOpacity={0.8} key={index.toString()}>
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
                  Pedido nro: 45646
                </Text>
                <Text color="#9393AA">N° de artículos: 3</Text>
                <Text color="#9393AA">Fecha: 20/03/2022</Text>
                <Text color="#6E6E7A">Total: 20$</Text>
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
  );
};
