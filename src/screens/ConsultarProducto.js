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
  Hidden,
} from "native-base";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import useCustomToast from "../hooks/useCustomToast";

var { width } = Dimensions.get("window");
import { connect } from "react-redux";
import * as actions from "../Redux/Actions/cartActions";
import { useVerifyProductByCompanyId } from "../hooks/useVerifyProductByCompanyId";

const SingleProduct = ({
  route,
  addItemToCart,
  modifyProductQuantity,
  cartItems,
}) => {
  const { canAddProduct, showAlertDialog, AlertDialog } =
    useVerifyProductByCompanyId(route.params?.company_id, cartItems);

  const [item, setItem] = useState({
    company_id: route.params?.company_id,
    id: route.params?.id,
    description: route.params?.description,
    name: route.params?.name,
    photo: route.params?.photo,
    price: route.params?.price,
  });

  const { showErrorToast, showSuccesToast } = useCustomToast();
  const [count, setCount] = useState(1);
  const onPress = () => setCount((prevCount) => prevCount + 1);
  const onPress1 = () => setCount((prevCount) => Math.max(prevCount - 1, 1));
  const [isDisabled, setIsDisabled] = useState(false);
  
  const setDisabled = () => {
    setIsDisabled(true);
  }

  const productInCart = cartItems.find(
    (item) => item.product.id === route?.params?.id
  );


  return (
    <View backgroundColor="#DB7F50" width={width} alignContent="center">
      <View backgroundColor="white" width="100%">
        <VStack justifyContent="center" alignItems="center" space={2}>
          <Avatar mt="20" source={{ uri: item.photo }} size="2xl" />
          <Text fontSize="2xl" bold color="#41634A">
            {item.name}
          </Text>
          <Text color="#9393AA" fontSize="md">
            {item.description}
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

          <View height="60%" >
            {productInCart && (
              <HStack h="10" space={4} mt="14" ml="8">
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

            <View ml="8">
              <Button
                width="80%"
                bgColor="#DB7F50"
                borderRadius="20"
                mt="16"
                isDisabled={isDisabled}
                onPress={() => {
                  if (!canAddProduct) {
                    showAlertDialog();
                    return;
                  }
                  addItemToCart({
                    ...item,
                    company_id: route.params?.company_id,
                  })
                  showSuccesToast("Producto agregado al carrito");
                  setDisabled();
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
      <AlertDialog />
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

        }),

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

