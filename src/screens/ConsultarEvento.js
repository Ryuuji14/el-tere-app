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
  Icon,
  HStack,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";


var { width } = Dimensions.get("window");

const ConsultarEvento = (props) => {
  const item = {
    name: props.route.params.name,
    image: props.route.params.image,
    description: props.route.params.description,
    location: props.route.params.location,
    date: props.route.params.date,
  }

  return (
    <View backgroundColor="#DB7F50" width="100%" height="100%" alignContent="center" justifyContent="center" alignItems="center">
      <View backgroundColor="white" width="80%" borderRadius="10" >
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

          <Image borderRightRadius="10" mt="10" w='80%' h='40%' mb="6" source={{ uri: item.image }} resizeMode='cover' alt="pinche prop requerida" />

          <Text color="black" fontSize="md">
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
          <Text color="black" fontSize="md"> <Text bold>Lugar: </Text> {item.location}</Text>
          <HStack alignItems="center" justifyContent='center' alignContent='center' space={2} mt="4">
            <Icon as={FontAwesome} name="calendar" size="12" color="black" />
            <Text color="black" fontSize="md" mt="2"> {item.date}</Text>
          </HStack>
        </VStack>
      </View>
    </View>
  );
};
export default ConsultarEvento;