import { Container, FlatList, Box, List } from 'native-base';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Dimensions,
  Image
} from 'react-native';
import { ListItem } from 'react-native-elements';

import { SwipeListView } from 'react-native-swipe-list-view';

import { connect } from 'react-redux';

var { height, width } = Dimensions.get("window")

const Cart = (props) => {

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
          <Text style={{ alignSelf: "center"}}>Carrito</Text>
            {props.cartItems.map(data => {
             return (
               <ListItem
                 key={data.product.id}
                 leftAvatar={{source: {uri: data.product.image}}}
                 tittle={data.product.name}
                 bottomDivider
               />
             )
            })}
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

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    width: width,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
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

export default connect(mapStateToProps, null) (Cart);