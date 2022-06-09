import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  ViewBase,
} from "react-native";
import {
  Button,
  View,
  Avatar,
  VStack,
  HStack,
  Divider,
  Text,
  Icon,
  IconButton,
  Input,
  Image,
} from 'native-base'
import { Entypo, FontAwesome } from "@expo/vector-icons";
var { width } = Dimensions.get("window");
import { connect } from "react-redux";
import * as actions from "../Redux/Actions/cartActions"
import Logo from "../../assets/LOGO-EL-TERE-2.png";


const Promocion = ({ route }) => {
  const [item, setItem] = useState({
    id: route.params.id,
    name: route.params.name,
    image: route.params.image,
    price: route.params.price,
    description: route.params.description,
  });

  return (
    <View
      backgroundColor="white"
      width={width}
      alignContent="center"
    >
      <View
        backgroundColor="white"
        width="100%">
          <HStack justifyContent="flex-start" alignItems="flex-start" space={1}> 
          <Image
            source={Logo}
            resizeMode="contain"
            alt="logo"
            size='xs'
          />
          <Text mt="2" bold fontSize="16" >Promoción</Text>
          </HStack>
        <VStack
          justifyContent='center'
          alignItems="center"
          space={2}
        >
          <Avatar
            mt="2"
            source={{ uri: item.image }}
            size="2xl"
          />
          <Text
            fontSize="2xl"
            bold
            color="#41634A"
          >
            {item.name}
          </Text>
          <Text
            color="#9393AA"
            fontSize="md"
          >
            {item.description}
          </Text>
          <Divider my="2" borderWidth="2" _light={{
            bg: "#41634A"
          }} _dark={{
            bg: "#41634A"
          }} />
          <View
            height="50%"
          >
            <HStack h="10" space={4} mt="20" ml="8" >
              <IconButton
                icon={<Icon as={Entypo} name="minus" color="white" />}
                bgColor="#DB7F50"
                size="lg"
                rounded="full"
              //   onPress={onPress1}
              />
              <Input
                w="12"
                bgColor="#CAC8C8"
                fontSize="lg"
                isReadOnly
              //value={count.toString()}
              />
              <IconButton
                icon={<Icon as={Entypo} name="plus" color="white" />}
                bgColor="#DB7F50"
                size="lg"
                rounded="full"
              //onPress={onPress}
              />
            </HStack>
            <Text
              mt="4"
              ml="16"
              fontSize="md"
              color="#6E6E7A"
            >
              Subtotal: $
            </Text>
            <View ml="8" >
              <Button
                width="80%"
                bgColor="#DB7F50"
                borderRadius="20"
                mt="16"
                onPress={() => {
                  route.addItemToCart(item.id);
                }}
              >
                <Text color="white" fontSize="lg">AÑADIR</Text>
              </Button>
              
            </View>
            
          </View>
        </VStack>
      </View>
    </View >
  )
}


const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(
        actions.addToCart({
          product:
            { ...product, quantity: 1, },
        }))
  }
}
export default connect(null, mapDispatchToProps)(Promocion);