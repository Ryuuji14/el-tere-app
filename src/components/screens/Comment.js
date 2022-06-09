import React, { useEffect } from "react";
import {
  Box,
  Heading,
  View,
  Text,
  Center,
  Stack,
  HStack,
  Avatar,
  Icon,
  Divider,
  Image,
} from "native-base";
import { StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Logo from "../../../assets/LOGO-EL-TERE-2.png"


const Comment = (props) => {
  const item = {
    id: props.id,
    name: props.firstName,
    last_name: props.lastName,
    rating: props.rating,
    date: props.date,
    description: props.description,
  }

  const formatDate = (date) => {
    const d = new Date(date);
    const [month, day, year] = d?.toLocaleDateString("en-US").split("/");
    return `${day}/${month}/${year}` || "";
  };

  return (
    <View
      justifyContent='center'
      alignItems='center'
    >
      <Box
        width="100%"
        mt="2"
        alignItems="center"
        rounded="lg"
        overflow="hidden"
        borderColor="#DB7F50"
        borderWidth="1"
      >
        <Stack p="2" backgroundColor='white' width="80%" space={2}>
          <Stack space={2}>
            <HStack>
              <Image source={Logo} alt="logo" size="xs"/>
              <Heading size="sm" ml="2">
                {item.name} {item.last_name}
              </Heading>
              <Icon as={FontAwesome} mt="6" name="star" color='yellow.500' style={{ position: 'absolute', left: 55 }} />
              <Text mt="5" ml="4" style={{ position: 'absolute', left: 55 }}>{item.rating.toFixed(0)}</Text>
            </HStack>
            <Text
              fontSize="xs" _light={{
                color: "#6E6E7A"
              }} _dark={{
                color: "#6E6E7A"
              }} fontWeight="500" ml="-0.5" mt="10"
              style={{ position: 'absolute', right: 10 }}
            >
              {
                formatDate(item.date)
              }
            </Text>
            <Divider
              width="100%"
              my="2"
              _light={{
                bg: "#41634A",
              }}
              _dark={{
                bg: "#41634A",
              }}
            />
          </Stack>
          <Stack width="80%" mb="4">
          <Text fontWeight="400">
            {item.description}
          </Text>
          </Stack>
        </Stack>
      </Box>
    </View>
  )
};

 const styles = StyleSheet.create ({
  item: {

  }
 })

export default Comment;