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
  Center,
  Stack,
  Heading,
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
import * as actions from "../Redux/Actions/cartActions";
import { FontAwesome } from "@expo/vector-icons";

var { height, width } = Dimensions.get("window");

const RealizaPago = (props) => {

  return (
    <>
      <View backgroundColor="#DB7F50" width={width} h="100%">
        <Text style={{ alignSelf: "center" }} fontSize='30' color="white" my="2"> Realiza el Pago </Text>
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
            justifyContent='center'
          >
            <Text
              color="#9393AA"
              fontSize="16"
              style={{ alignSelf: "center" }}
            > Para terminar de validar el pedido ponte en contacto con el comercio para realizar el pago: </Text>
            <HStack space="2" justifyContent='center'>
              <VStack space="2" alignItems='center'>
                <Text
                  color="#6E6E7A"
                  fontSize="18"
                  bold
                >
                  Comercio:
                </Text>
                <Text
                  color="#6E6E7A"
                  fontSize="18"
                  bold
                >
                  Responsable
                </Text>

              </VStack>
            </HStack>
            <Box
              alignItems="center"
              width="80%"
              alignSelf="center"
              rounded="lg"
              borderColor="#F96332"
              borderWidth="1"
              borderRadius="10"
            >
              <VStack>
                <Text
                  bold
                  fontSize='18'
                  color='#6E6E7A'
                >
                  Comercio:
                </Text>
                <Text
                  bold
                  fontSize='18'
                  color='#6E6E7A'
                >
                  Subtotal: ${total}
                </Text>
                <Text
                  bold
                  fontSize='18'
                  color='#6E6E7A'
                >
                  Con Delivery: $
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
                <Text
                  bold
                  fontSize='18'
                  color='#6E6E7A'
                >
                  TOTAL a pagar: $
                </Text>
                <Button
                  mt="2"
                  mb="4"
                  width="80%"
                  bgColor="#DB7F50"
                  borderRadius="20"
                 onPress={() => props.navigation.navigate("RealizaPago")}
                >
                  <Text color="white" fontSize="16" >PROCESAR PEDIDO</Text>
                </Button>
              </VStack>
            </Box>
          </VStack>
        </View>
      </View>
    </>
  );
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

export default RealizaPago;
