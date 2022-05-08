import { HStack, Stack, Text, View } from "native-base";
import React from "react";

const TEXT_PROPS = {
  color: "gray.500",
};

export const TotalAmounts = ({
  subTotal = 0,
  cargoEntrega = 0,
  delivery = 0,
  bokkingFee = 0,
  total = 0,
}) => {
  return (
    <>
      <Stack
        space={2}
        px={2}
        color="gray.700"
        borderBottomWidth={1}
        pb={3}
        mb={2}
        borderColor="gray.200"
      >
        <HStack justifyContent="space-between">
          <Text {...TEXT_PROPS}>SubTotal</Text>
          <Text {...TEXT_PROPS}>${subTotal}</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text {...TEXT_PROPS}>Cargo por entrega</Text>
          <Text {...TEXT_PROPS}>${cargoEntrega}</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text {...TEXT_PROPS}>Delivery gratis</Text>
          <Text {...TEXT_PROPS}>${delivery}</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text {...TEXT_PROPS}>Booking fee</Text>
          <Text {...TEXT_PROPS}>${bokkingFee}</Text>
        </HStack>
      </Stack>
      <HStack justifyContent="space-between" px={2}>
        <Text>Total</Text>
        <Text>${total}</Text>
      </HStack>
    </>
  );
};
