import {
  Container,
  Image,
  FlatList,
  Box,
  List,
  Pressable,
  Text,
  HStack,
  View,
  Avatar,
  IconButton,
  Button,
  VStack,
  Divider,
} from "native-base";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { SwipeListView } from "react-native-swipe-list-view";

import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";
import { FontAwesome } from "@expo/vector-icons";

var { height, width } = Dimensions.get("window");

const Cart = (props) => {

  var total = 0;
  props.cartItems.forEach(cart => {
    return (total += cart.product.price)
  });


  return (
    <>
      {props.cartItems.length ? (
        <View backgroundColor="#DB7F50" width={width} h="100%">
          <Text style={{ alignSelf: "center" }} fontSize='30' color="white" my="2"> Tu Carrito </Text>
          <View
            backgroundColor="white"
            mx="6"
            borderWidth="5"
            borderColor="white"
            borderRadius='20'
          >
            <VStack
              space={2}
              mb={4}
              divider={<Divider />}
            >
              <Text
                style={{ alignSelf: "center" }}
                mb='2'
                color='#9393AA'
                fontSize='20'
                textAlign='center'
              >
                ¡Estos son los productos que tienes en tu carrito!
              </Text>
              <HStack justifyContent='center' alignItems="center">
                <Icon mt="6" as={FontAwesome} name="shopping-cart" size={30} color="#41634A" />
                <VStack alignItems="center" space={1} mt="1">
                  <Text style={styles.price}> Subtotal:</Text>
                  <Text mb="2" fontSize="20" color="#6E6E7A">${total}</Text>
                </VStack>
                <IconButton
                  ml="16"
                  bgColor="#41634A"
                  variant={"solid"}
                  icon={<Icon as={FontAwesome} name="trash" size={30} color="white" />}
                  onPress={() => props.clearCart()} />
              </HStack>

              <HStack justifyContent='center'>
                <Button
                  width="80%"
                  bgColor="#DB7F50"
                  borderRadius="20"
                // onPress={() => props.navigation.navigate("Checkout")}
                >
                  <Text color="white" fontSize="18" >Procesar</Text>
                </Button>
              </HStack>
            </VStack>
            <SwipeListView
              data={props.cartItems || []}
              renderItem={(data) => (
                <Pressable h="20" bgColor="white" key={data.item.product?.id}>
                  <HStack >
                    <Avatar
                      size="lg"
                      source={{
                        uri: data.item.product?.image,
                      }}
                    />
                    <Text ml="4" fontSize="16" mt="4">{data?.item?.product?.name}</Text>
                    <Text
                      style={{ position: 'absolute', right: 10 }}
                      bold mt="4"
                      fontSize="16"
                    >
                      ${data?.item?.product?.price}
                    </Text>
                  </HStack>
                </Pressable>
              )}
              ItemSeparatorComponent={() => <View h="5" />}
              renderHiddenItem={(data) => (
                <View style={styles.hiddenContainer}>
                  <TouchableOpacity
                    style={styles.hiddenButton}
                    onPress={() => props.removeFromCart(data?.item)}
                  >
                    <Icon name="trash" color={"white"} size={20} />
                  </TouchableOpacity>
                </View>
              )}
              rightOpenValue={-130}
              disableRightSwipe
              previewRowKey={"0"}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              onRowDidOpen={() => null}
            />
          </View>


        </View>
      ) : (
        <Box style={styles.emptyContainer}>
          <Text fontSize="16">Tu carrito esta vacío</Text>
          <Text fontSize="16">Agrega Productos dentro de un Comercio</Text>
        </Box>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item))
  };
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  price: {
    fontWeight: 'bold',
    fontSize: 18,
    color: "#6E6E7A",

  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
    elevation: 20,
    justifyContent: 'space-between',
  },
  container: {
    height: height,
    width: width,
    backgroundColor: "white",
    flex: 1,
  },
  listItem: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },
  hiddenButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
