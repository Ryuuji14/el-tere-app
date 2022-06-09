import {
  Text,
  View,
  Button,
  VStack,
  Divider,
  HStack,
} from "native-base";
import {
  StyleSheet,
  Dimensions,
} from "react-native";
var { height, width } = Dimensions.get("window");
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import * as actions from "../Redux/Actions/cartActions";

const RealizaPago = (props) => {

  const item = {
    id: props.route.params.id,
    comercio: props.route.params.comercio,
    nombre: props.route.params.first_name,
    apellido: props.route.params.last_name,
    total: props.route.params.total
  }
  const Navigation = useNavigation();

  return (
    <>
      <View backgroundColor="#DB7F50" width={width} h="100%" >
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
            <VStack space="2" alignItems='center' >
              <Text
                color="#6E6E7A"
                fontSize="18">
                <Text bold>Comercio: </Text> {item.comercio}
              </Text>
              <Text
                color="#6E6E7A"
                fontSize="18"><Text bold >Responsable: </Text> {item.nombre} {item.apellido}
              </Text>
              <Text
                color="#6E6E7A"
                fontSize="18"
                bold
              >Telefono de Contacto:
              </Text>
              <Text
                color="#6E6E7A"
                fontSize="18"
              ><Text bold>Monto a Pagar: </Text> ${item.total}
              </Text>
              <Text
                color="#6E6E7A"
                fontSize="18"
              ><Text bold>Codigo del Pedido: </Text> {item.id}
              </Text>
              <Divider
                width="100%"
                my="2"
                _light={{
                  bg: "#41634A",
                }}
                _dark={{
                  bg: "#41634A",
                }}
              />
              <Text
                color="#9393AA"
                fontSize="18"
                style={{ alignSelf: "center" }}
              >
                Luego de realizar el pago, validaremos tu pedido.
                Debes esperar mientras actualizamos el estatus de tu pedido. {"\n"}
                {"\n"}
                Puedes ver tus pedidos desde tu perfil.
              </Text>
              <HStack space={2}>
                <Button
                  mt="2"
                  mb="4"
                  width="40%"
                  bgColor="#DB7F50"
                  borderRadius="20"
                  onPress={() => {
                    props.clearCart(),
                    Navigation.reset({
                      index: 0,
                      routes: [{ name: "Home" }],
                    })
                  }}
                >
                  <Text color="white" fontSize="16" >INICIO</Text>

                </Button>

                <Button
                  mt="2"
                  mb="4"
                  width="40%"
                  bgColor="#DB7F50"
                  borderRadius="20"
                  onPress={() => Navigation.reset({
                    index: 0,
                    routes: [{ name: "Perfil" }],
                  })}
                >
                  <Text color="white" fontSize="16" >PERFIL</Text>
                </Button>

              </HStack>
            </VStack>

          </VStack>
        </View>
      </View>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
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

export default connect(null, mapDispatchToProps)(RealizaPago);
