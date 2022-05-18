import React from "react";
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


const Comment = () => {
  return (
    <Box alignItems="center" mt="2">
      <Box maxW="80" height="75%" rounded="lg" overflow="hidden" borderColor="#DB7F50" borderWidth="1" _dark={{
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
              Persona Nombre
            </Heading>
            <Icon as={FontAwesome} mt="6" name="star" color='yellow.500' style={{position: 'absolute', left: 55}} />
            <Text mt="5" ml="4"style={{position: 'absolute', left: 55}}>4</Text>
            </HStack>
            <Text 
            fontSize="xs" _light={{
              color: "#6E6E7A"
            }} _dark={{
              color: "#6E6E7A"
            }} fontWeight="500" ml="-0.5" mt="10"
            style={{ position: 'absolute', right: 10 }}
            >
              01/06/2021
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
            Bengaluru (also called Bangalore) is the center of India's high-tech
            industry. The city is also known for its parks and nightlife.
          </Text>

        </Stack>
      </Box>
    </Box>
  )
};


export default Comment;