import React, { useState, useEffect } from "react";
import {
  Dimensions,
} from "react-native";
import {
  View,
  VStack,
  Divider,
  Text,
  Image,
} from "native-base";


var { width } = Dimensions.get("window");

const ConsultarEvento = (props) => {
  const item = {
    name: props.route.params.name,
    image: props.route.params.image,
    description: props.route.params.description,
  }

  return (
    <View backgroundColor="#DB7F50" width={width} alignContent="center">
      <View backgroundColor="white" width="80%">
        <VStack justifyContent="center" alignItems="center" space={2}>
          <Text fontSize="2xl" bold color="#41634A">
            {item.name}
          </Text>
          <Divider
            my="2"
            _light={{
              bg: "#41634A",
            }}
            _dark={{
              bg: "#41634A",
            }}
          />

          <Image mt="10" w='50%' h='50%' source={{ uri: item.image }} resizeMode='cover' alt="pinche prop requerida"/>

          <Text color="#9393AA" fontSize="md">
            {item.description}
          </Text>
          <Divider
            my="2"
            _light={{
              bg: "#41634A",
            }}
            _dark={{
              bg: "#41634A",
            }}
          />
          <Text color="#9393AA" fontSize="md">Lugar: </Text>
        </VStack>
      </View>
    </View>
  );
};
export default ConsultarEvento;