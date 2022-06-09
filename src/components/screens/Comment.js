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
} from "native-base";
import { StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";


const Comment = (props) => {
  const item = {
    id: props.id,
    name: props.firstName,
    last_name: props.lastName,
    rating: props.rating,
    date: props.date,
    description: props.description,
  }
  const regex = /\d{4}-\d{2}-\d{2}/;
  useEffect(() => {
    console.log(item)
  })

  return (
    <View
      justifyContent='center'
      alignItems='center'
    >
      <Box
        width="90%"
        mt="2"
        alignItems="center"
        height="80%"
        rounded="lg"
        overflow="hidden"
        borderColor="#DB7F50"
        borderWidth="1"
      >
        <Stack p="2" backgroundColor='white' width="80%">
          <Stack space={2}>
            <HStack>
              <Avatar />
              <Heading size="sm" ml="2">
                {item.name} {item.last_name}
              </Heading>
              <Icon as={FontAwesome} mt="6" name="star" color='yellow.500' style={{ position: 'absolute', left: 55 }} />
              <Text mt="5" ml="4" style={{ position: 'absolute', left: 55 }}>{item.rating}</Text>
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
                regex.exec(item.date)
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
          <Text fontWeight="400">
            {item.description}
          </Text>
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