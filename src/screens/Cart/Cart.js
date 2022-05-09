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
} from "native-base";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Button,
} from "react-native";
import { ListItem } from "react-native-elements";

import { SwipeListView } from "react-native-swipe-list-view";

import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";

var { height, width } = Dimensions.get("window");

const Cart = (props) => {
  var total = 0;
  // props.cartItems.forEach(cart => {
  //   return (total += cart.product.price)
  // });
  // const [listData, setListData] = useState(
  //    Array(20)
  //        .fill('')
  //        .map((_, i) => ({ key: `${i}`, text: `${i}` }))
  // );

  return (
    <>
      {props.cartItems.length ? (
        <View backgroundColor="white" width={width} h="100%">
          <Text style={{ alignSelf: "center" }}>Carrito</Text>
          <SwipeListView
            data={props.cartItems || []}
            renderItem={(data) => (
              <Pressable h="10" bgColor="white">
                <HStack>
                  <Image
                    w="10"
                    h="10"
                    source={{
                      uri: data.item.product?.image,
                    }}
                  />
                  <Text>{data?.item?.product?.id}</Text>
                </HStack>
              </Pressable>
            )}
            ItemSeparatorComponent={() => <View h="5" />}
            renderHiddenItem={() => (
              <Pressable
                h="10"
                bgColor="red.300"
                onPress={() => console.log("ooh me vengo")}
              >
                <Text textAlign="right">Tocame sapo</Text>
              </Pressable>
            )}
            rightOpenValue={-130}
            disableRightSwipe
            previewRowKey={"0"}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={() => null}
          />

          <View style={styles.bottomContainer}>
            <Text style={styles.price}>${total}</Text>
            <Button title="Limpiar" onPress={() => props.clearCart()} />
            <Button
              title="Comprar"
              // onPress={() => props.navigation.navigate("Checkout")}
            />
          </View>
        </View>
      ) : (
        <Container style={styles.emptyContainer}>
          <Text>Tu carrito esta vacío</Text>
          <Text>Agrega Productos dentro de un Comercio</Text>
        </Container>
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
  };
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    width: width,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  price: {
    fontSize: 18,
    margin: 15,
    color: "red",
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
    elevation: 20,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
