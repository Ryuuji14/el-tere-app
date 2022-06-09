import { HStack, Stack, Text, View, ZStack } from "native-base";
import React from "react";

export const TimeLineBlock = ({ isActive = false, text = "", time = "" }) => {
  const activeColor = isActive ? "#DB7F50" : "#5A7E64";

  return (
    <HStack h="46px" width="full">
      <View width="5%" display="flex" justifyContent="center">
        <ZStack alignItems="center" justifyContent="center">
          <View h="46px" w="1.2px" bgColor="black" alignSelf="center" />
          <View h="3.5" w="3.5" bgColor={activeColor} rounded="full" />
        </ZStack>
      </View>

      <View ml={3} width="70%" display="flex" justifyContent="center">
        <Text color={activeColor} fontSize={15}>
          {text}
        </Text>
      </View>

      <View
        width="20%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text color={activeColor}>{time}</Text>
      </View>
    </HStack>
  );
};
