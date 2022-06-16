import React, { useEffect } from "react";
import {
  Box,
  Heading,
  View,
  Text,
  VStack,
  Stack,
  HStack,
  Avatar,
  Icon,
  Divider,
  Image,
} from "native-base";
import { StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const NotificationCard = (props) => {

  const item = {
    id: props.id,
    title: props.title,
    description: props.message,
  }

  return (
 
      <Box
        width="90%"
        mt="2"
        rounded="lg"
        overflow="hidden"
        borderColor="#5A7E64"
        borderWidth="1"
      >
            <VStack  space={2} alignItems="center"  mx="2">
              <Icon as={FontAwesome} mt="6" name="bell" color='#DB7F50' size="6" />
              <Text fontSize="16" bold color="#41634A" textAlign="center">
                {item.title}
              </Text>
              <Text color="#9393AA" mb="2" textAlign="center">
              {item.description}
            </Text>
            </VStack>
      </Box>
  
  )
};

export default NotificationCard;