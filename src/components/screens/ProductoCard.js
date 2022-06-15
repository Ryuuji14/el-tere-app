import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  VStack,
  Text,
  HStack,
  Icon,
  Image,
  Button,
  AspectRatio,
  Center,
  IconButton,
  Input,
} from "native-base";
import { Alert, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { useVerifyProductByCompanyId } from "../../hooks/useVerifyProductByCompanyId";
import * as actions from "../../Redux/Actions/cartActions";
import useCustomToast from "../../hooks/useCustomToast";

const ProductoCard = (props) => {
  const {
    name,
    photo,
    price,
    id,
    description,
    cartItems,
    modifyProductQuantity,
  } = props;

  const { canAddProduct, showAlertDialog, AlertDialog } =
    useVerifyProductByCompanyId(props.company_id, cartItems);

  const productInCart = cartItems.find((item) => item.product.id === id);

  const Navigation = useNavigation();
  const { showErrorToast, showSuccesToast } = useCustomToast();

  return (
    <TouchableOpacity
      style={{ width: "50%" }}
      activeOpacity="0"
      onPress={() =>
        Navigation.navigate("SingleProduct", {
          company_id: props.company_id,
          name: props.name,
          description: props.description,
          photo: props.photo,
          price: props.price,
          id: props.id,
        })
      }
    >
      <Box
        width={150}
        maxW="80"
        mx={3}
        rounded="lg"
        overflow="hidden"
        borderColor="#41634A"
        borderWidth="1"
        shadow={2}
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
        my="2"
      >
        <VStack space="2">
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                source={{
                  uri: props.photo,
                }}
                alt={props.name}
              />
            </AspectRatio>
          </Box>
          <Box px="2">
            <Text bold>
              {props?.name?.length > 22
                ? props.name.substring(0, 22 - 3) + "..."
                : props.name}
            </Text>
          </Box>
          <HStack justifyContent="space-between" alignItems="center">
            <Box px="2" pl="3">
              <Text color="grey">
                $
                {props.price.length > 16
                  ? props.price.substring(0, 16 - 3) + "..."
                  : props.price}
              </Text>
            </Box>
            <Box pr="2" pb="2">
              {productInCart?.product?.id ? (
                <HStack h="8" space={1}>
                  <IconButton
                    disabled={productInCart?.product?.quantity === 1}
                    icon={<Icon as={Entypo} name="minus" color="white" />}
                    bgColor="#DB7F50"
                    opacity={productInCart?.product?.quantity === 1 ? 0.5 : 1}
                    size="sm"
                    rounded="full"
                    onPress={() =>
                      modifyProductQuantity(productInCart?.product?.id, -1)
                    }
                  />
                  <Input
                    w="9"
                    isReadOnly
                    value={productInCart?.product?.quantity?.toString() || 0}
                  />
                  <IconButton
                    icon={<Icon as={Entypo} name="plus" color="white" />}
                    bgColor="#DB7F50"
                    size="sm"
                    rounded="full"
                    onPress={() =>
                      modifyProductQuantity(productInCart?.product?.id, 1)
                    }
                  />
                </HStack>
              ) : (
                <IconButton
                  icon={
                    <Icon as={Entypo} name="shopping-basket" color="white" />
                  }
                  size="sm"
                  borderRadius="full"
                  bgColor="#DB7F50"
                  onPress={() => {
                   if (!canAddProduct) {
                    showAlertDialog();
                    return;
                  }
                  props.addItemToCart(props)
                  showSuccesToast("Producto agregado al carrito");
                  }}
                />
              )}
            </Box>
          </HStack>
        </VStack>
        <AlertDialog />
      </Box>
    </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductoCard);
