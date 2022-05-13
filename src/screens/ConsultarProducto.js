import React, { useState, useEffect } from "react";
import {
  Image,
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
} from "native-base";
import { Entypo, FontAwesome } from "@expo/vector-icons";

var { width } = Dimensions.get("window");
import { connect } from "react-redux";
import * as actions from "../Redux/Actions/cartActions";

const SingleProduct = ({
  route,
  addItemToCart,
  modifyProductQuantity,
  cartItems,
}) => {
  const [item, setItem] = useState({
    id: route.params?.id,
    name: route.params?.name,
    image: route.params?.image,
    price: route.params?.price,
  });

  const [count, setCount] = useState(1);
  const onPress = () => setCount((prevCount) => prevCount + 1);
  const onPress1 = () => setCount((prevCount) => Math.max(prevCount - 1, 1));

  const productInCart = cartItems.find(
    (item) => item.product.id === route?.params?.id
  );

  return (
    <View backgroundColor="#DB7F50" width={width} alignContent="center">
      <View backgroundColor="white" width="100%">
        <VStack justifyContent="center" alignItems="center" space={2}>
          <Avatar mt="20" source={{ uri: item.image }} size="2xl" />
          <Text fontSize="2xl" bold color="#41634A">
            {item.name}
          </Text>
          <Text color="#9393AA" fontSize="md">
            ACA VA LA DESCRIPCION
          </Text>
          <Text color="#9393AA" fontSize="md">
            Precio: ${item.price}
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

          <View height="50%" mt="2">
            {productInCart && (
              <HStack h="10" space={4} mt="20" ml="8">
                <IconButton
                  icon={<Icon as={Entypo} name="minus" color="white" />}
                  bgColor="#DB7F50"
                  size="lg"
                  rounded="full"
                  onPress={() => modifyProductQuantity(item?.id, -1)}
                />
                <Input
                  w="12"
                  bgColor="#CAC8C8"
                  fontSize="lg"
                  isReadOnly
                  value={productInCart.product?.quantity?.toString() || 0}
                />
                <IconButton
                  icon={<Icon as={Entypo} name="plus" color="white" />}
                  bgColor="#DB7F50"
                  size="lg"
                  rounded="full"
                  onPress={() => modifyProductQuantity(item?.id, 1)}
                />
              </HStack>
            )}

            <Text mt="4" ml="16" fontSize="md" color="#6E6E7A">
              Subtotal: $
            </Text>
            <View ml="8">
              <Button
                width="80%"
                bgColor="#DB7F50"
                borderRadius="20"
                mt="16"
                onPress={() => {
                  addItemToCart(item);
                }}
              >
                <Text color="white" fontSize="lg">
                  AÑADIR
                </Text>
              </Button>
            </View>
          </View>
        </VStack>
      </View>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(
        actions.addToCart({
          product: {
            ...product,
            quantity: 1,
          },
        })
      ),
    modifyProductQuantity: (productId, quantity) =>
      dispatch(actions.modifyProductQuantity({ productId, quantity })),
  };
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
