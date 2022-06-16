import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
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
} from "native-base";
import { Entypo, FontAwesome } from "@expo/vector-icons";
var { width } = Dimensions.get("window");
import { connect } from "react-redux";
import { addMultipleProducts } from "../Redux/Actions/cartActions";
import Logo from "../../assets/LOGO-EL-TERE-2.png";
import useCustomToast from "../hooks/useCustomToast";
import { productsAPI } from "../api/productsAPI";
import { useVerifyProductByCompanyId } from "../hooks/useVerifyProductByCompanyId";

const Promocion = ({ route, cartItems, addMultipleProducts, navigation }) => {
  const { showErrorToast, showSuccesToast } = useCustomToast();
  const [products, setProducts] = useState([]);
  const [companyId, setCompanyId] = useState("");

  const { canAddProduct, showAlertDialog, AlertDialog } =
    useVerifyProductByCompanyId(companyId, cartItems);

  const [item, setItem] = useState({
    id: route.params.id,
    name: route.params.name,
    image: route.params.image,
    price: route.params.price,
    description: route.params.description,
  });

  useEffect(() => {
    if (item?.id && cartItems) {
      const getProducts = async () => {
        try {
          const { data } = await productsAPI.getProductInPromotion(item.id);
          if (data?.length > 0) {
            setProducts(
              data.map((prod) => {
                const findProductInCart = cartItems.find(
                  (item) => item.product.id === prod.id
                );

                return {
                  ...prod,
                  quantity: findProductInCart?.product.quantity || 1,
                };
              })
            );
            setCompanyId(data[0].company_id);
          }
        } catch (error) {
          showErrorToast(error);
        }
      };
      console.log()
      getProducts();
    }
  }, [item.id, cartItems]);

  const incrementAmount = (productId, quantity) => {
    const newProducts = [...products];
    const productIndex = newProducts.findIndex(
      (product) => product.id === productId
    );
    const newQuantity = Math.max(
      newProducts[productIndex].quantity + quantity,
      1
    );
    newProducts[productIndex].quantity = newQuantity;
    setProducts(newProducts);
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  return (
    <View backgroundColor="white" width={width} h='100%' alignContent="center">
      <View backgroundColor="white" width="100%">
        <HStack justifyContent="flex-start" alignItems="flex-start">
          <Image source={ Logo } alt="logo" size='xs' mt={2} ml={2} />
          <Text mt="2" bold fontSize="16">
            Promoción
          </Text>
        </HStack>
        <VStack justifyContent="center" alignItems="center" space={2}>
          <Avatar mt="2" source={{ uri: item.image }} size="2xl" />
          <Text fontSize="2xl" bold color="#41634A">
            {item.name}
          </Text>
          <Text color="#9393AA" fontSize="md">
            {item.description}
          </Text>
          <Divider
            my="2"
            borderWidth="1"
            _light={{
              bg: "#41634A",
            }}
            _dark={{
              bg: "#41634A",
            }}
          />

          <VStack width="100%" px={4} space={4}>
            {products.map((product) => (
              <HStack
                key={product.id}
                justifyContent="space-between"
                alignItems="center"
              >
                <HStack alignItems="center" space={3} fontWeight="700">
                  <Text color="#41634A" fontSize={22}>
                    {product.name}
                  </Text>
                  <Text fontSize={20} color="#6E6E7A">
                    ${product.price}
                  </Text>
                </HStack>

                <HStack space={4} alignItems="center">
                  <IconButton
                    icon={<Icon as={Entypo} name="minus" color="white" />}
                    bgColor="#DB7F50"
                    rounded="full"
                    size="md"
                    h="8"
                    w="8"
                    onPress={() => incrementAmount(product.id, -1)}
                  />
                  <Input
                    w="12"
                    h="9"
                    bgColor="#CAC8C8"
                    fontSize="lg"
                    borderRadius={10}
                    isReadOnly
                    textAlign="center"
                    fontWeight="bold"
                    value={product?.quantity.toString()}
                  />
                  <IconButton
                    icon={<Icon as={Entypo} name="plus" color="white" />}
                    bgColor="#DB7F50"
                    size="md"
                    rounded="full"
                    h="8"
                    w="8"
                    onPress={() => incrementAmount(product.id, 1)}
                  />
                </HStack>
              </HStack>
            ))}
          </VStack>

          <Divider
            my="2"
            borderWidth="1"
            _light={{
              bg: "#41634A",
            }}
            _dark={{
              bg: "#41634A",
            }}
          />

          <View height="50%">
            <Text mt="4" ml="16" fontSize="md" color="#6E6E7A">
              Subtotal: $ {calculateTotal()}
            </Text>
            <View ml="8">
              <Button
                width="80%"
                bgColor="#DB7F50"
                borderRadius="20"
                mt="16"
                onPress={() => {
                  if (!canAddProduct) {
                    showAlertDialog();
                    return;
                  }
                  addMultipleProducts(products);
                  showSuccesToast("Productos agregados al carrito");
                  navigation?.goBack();
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
    // addItemToCart: (product) =>
    //   dispatch(
    //     actions.addToCart({
    //       product: { ...product, quantity: 1 },
    //     })
    //   ),
    addMultipleProducts: (products) => {
      dispatch(addMultipleProducts(products));
    },
  };
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Promocion);
