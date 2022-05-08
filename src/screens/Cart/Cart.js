import { Container, FlatList, Box, List } from 'native-base';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Dimensions,
  Image, 
  Button
} from 'react-native';
import { ListItem } from 'react-native-elements';

import { SwipeListView } from 'react-native-swipe-list-view';

import { connect } from 'react-redux';
import * as actions from "../../Redux/Actions/cartActions";

var { height, width } = Dimensions.get("window")

const Cart = (props) => {

  var total=0;
  props.cartItems.forEach(cart => {
    return (total += cart.product.price)
  });
  // const [listData, setListData] = useState(
  //    Array(20)
  //        .fill('')
  //        .map((_, i) => ({ key: `${i}`, text: `${i}` }))
  // );


  console.log(props.cartItems)
  return (
    <>
      {props.cartItems.length ? (
        <Container backgroundColor='white'>
          <Text style={{ alignSelf: "center" }}>Carrito</Text>
          {props.cartItems.map(data => {
            return (
              <ListItem
                key={data.product.id}
                leftAvatar={{ source: { uri: data.product.image } }}
                tittle={data.product.name}
                bottomDivider
              />
            )
          })}
          <View style={styles.bottomContainer}>
              <Text style={styles.price}>${total}</Text>
              <Button title="Limpiar" onPress={() => props.clearCart()} /> 
              <Button
                title="Comprar"
               // onPress={() => props.navigation.navigate("Checkout")}
              />
          </View>
        </Container>
      ) : (
        <Container style={styles.emptyContainer}>
          <Text>Tu carrito esta vacío</Text>
          <Text>Agrega Productos dentro de un Comercio</Text>
        </Container>
      )}
    </>
    // <View style={styles.container}>
    //   <SwipeListView
    //        data={listData}
    //        renderItem={renderItem}
    //        renderHiddenItem={renderHiddenItem}
    //        leftOpenValue={75}
    //        rightOpenValue={-150}
    //        previewRowKey={'0'}
    //       previewOpenValue={-40}
    //        previewOpenDelay={3000}
    //        onRowDidOpen={onRowDidOpen}
    //    />
    //  </View>
  );
}

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart())
  }
}

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
    backgroundColor: 'white',
    flex: 1,
  },
  listItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);