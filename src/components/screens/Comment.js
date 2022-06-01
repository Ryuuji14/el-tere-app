import React, { useEffect } from "react";
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  Stack,
  HStack,
  Avatar,
  Icon,
  Divider,
} from "native-base";
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

  useEffect(() => {
console.log(item)
  })

  return (
    <Box alignItems="center" mt="2" width="100%" maxWidth="80">
      <Box height="75%" rounded="lg" overflow="hidden" borderColor="#DB7F50" borderWidth="1" _dark={{
        borderColor: "#DB7F50",
        backgroundColor: "white"
      }} _web={{
        shadow: 2,
        borderWidth: 0
      }} _light={{
        backgroundColor: "gray.50"
      }}>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <HStack>
            <Avatar/>
            <Heading size="sm" ml="2">
              {item.name} {item.last_name}
            </Heading>
            <Icon as={FontAwesome} mt="6" name="star" color='yellow.500' style={{position: 'absolute', left: 55}} />
            <Text mt="5" ml="4"style={{position: 'absolute', left: 55}}>{item.rating}</Text>
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
                item.date
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
    </Box>
  )
};

export default Comment;