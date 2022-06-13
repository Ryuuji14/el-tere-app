import {
  Box,
  Text,
  HStack,
  View,
  Select,
  Button,
  VStack,
  Divider,
  CheckIcon,
  FormControl,
  WarningOutlineIcon,
} from "native-base";
import {
  StyleSheet,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { companyAPI } from "../api/companyAPI";
import useCustomToast from "../hooks/useCustomToast";
import { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
import useAuthContext from "../hooks/useAuthContext";
import { addressAPI } from "../api/addressAPI";
import useLoading from "../hooks/useLoading";
import { saleAPI } from "../api/salesAPI";
import { useNavigation } from "@react-navigation/native";
var { width, height } = Dimensions.get("window");

const ConfirmarPedido = (props) => {

  const navigate = useNavigation();
  const {
    dispatch,
    state: { user },
  } = useAuthContext();

  const { isLoading, startLoading, stopLoading } = useLoading();
  const { showErrorToast, showSuccesToast } = useCustomToast();
  const [addresses, setUserAdresses] = useState([]);

  const getUserAddresses = async () => {
    startLoading();
    try {
      const [{ data: userAddresses }] = await Promise.all([
        addressAPI.getUserAddresses(user.id),
      ]);
      setUserAdresses(userAddresses);
    } catch (error) {
      showErrorToast(error.message);
    } finally {
      stopLoading();
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (user?.id) {
        getUserAddresses();
      }
    }, [user]))



  var total = 0;
  props.cartItems.forEach(cart => {
    return (total += (cart.product.price * cart.product.quantity) ) 
  });
var totalcd = 0;
totalcd = total + delivery;
const delivery =  selection ? _company.delivery_price : 0; 


  const [_company, setCompany] = useState([])
  const [selection, setSelection] = useState(false)
  const [selection1, setSelection1] = useState(false)
  const company = props.cartItems[0].product.company_id

  useFocusEffect(
    useCallback(() => {
      const getCompanyProduct = async () => {
        try {
          const { data } = await companyAPI.getCompanyProduct(company);
          setCompany(data || []);
          console.log(_company)
        } catch (error) {
          showErrorToast(error);
        }
      };
      getCompanyProduct();
    }, [])
  )

  const onSubmit = async () => {
    startLoading();
    try {
      const { data } = await saleAPI.addSale({
        user_id: user.id,
        delivery_type: selection ? "delivery" : "pick_up",
        company_id: company,
        address: selection1,
        delivery_price: _company.delivery_price,
        subtotal: total,
        total_amount: total ,
        sale_products: props.cartItems.map(cart => {
          return {
            product_id: cart.product.id,
            quantity: cart.product.quantity,
            price: cart.product.price,
            discount: 0,
          }
        }),
      })
      showSuccesToast("¡Pedido realizado Exitosamente!");
      console.log(data)
      navigate.reset({
        index: 0, routes: [{
          name: "RealizaPago", params: {
            id: data?.id,
            comercio: _company?.name,
            first_name: _company?.user?.first_name,
            last_name: _company?.user?.last_name,
            delivery_price: _company?.delivery_price,
            cellphone: _company?.cellphone,
            total: total + selection ? _company?.delivery_price : 0,
            address: selection1?.value, 
          }
        }]
      });
    }
    catch (error) {
      showErrorToast("Error");
      console.log(error)
    }
    stopLoading();
  }


  return (
    <>
      <View backgroundColor="#DB7F50" width={width} h="100%">
        <Text style={{ alignSelf: "center" }} fontSize='30' color="white" my="2"> Confirma tu Pedido </Text>
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
            > Estos son los detalles de tu pedido: </Text>
            <HStack space="2" justifyContent='center'>
              <Icon mt="8" as={FontAwesome} name="shopping-cart" size={60} color="#41634A" />
              <VStack space="2" alignItems='center'>
                <Text
                  color="#6E6E7A"
                  fontSize="18"
                  bold
                >
                  Comercio: {_company?.name}
                </Text>

                <Button
                  width="80%"
                  bgColor="#DB7F50"
                  borderRadius="20"
                  onPress={() => props.navigation.navigate("Cart")}
                >
                  <Text color="white" fontSize="18" >EDITAR CARRITO</Text>
                </Button>
              </VStack>
            </HStack>
            {
              _company?.delivery === true && (
                <VStack
                  justifyContent="center"
                  space="2"
                  alignItems="center"
                >
                  <HStack
                    justifyContent="center"
                    space="2"
                    alignItems="center"
                  >
                    <Text
                      color="#6E6E7A"
                      fontSize="18"
                      bold
                    >
                      ¿Deseas Delivery?
                    </Text>
                    <Box w="3/4" maxW="50">
                      <Select borderColor="#DB7F50" borderRadius="20" selectedValue={selection} minWidth="100" fontSize="14" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                        bg: "#DB7F50",
                        textColor: "white",
                        endIcon: <CheckIcon size="5" />
                      }} mt={1} onValueChange={itemValue => setSelection(itemValue)}>
                        <Select.Item label="Si" value={true} />
                        <Select.Item label="No" value={false} />
                      </Select>
                    </Box>

                  </HStack>
                  <Text
                    color="#6E6E7A"
                    fontSize="18"
                    bold
                  >
                    Direccion para Delivery:
                  </Text>
                  <Box w="3/4" maxW="300" >
                    <FormControl isRequired isInvalid>
                      <Select borderColor="#DB7F50" borderRadius="20" selectedValue={selection1} fontSize="14" minWidth="200" accessibilityLabel="Escoge tu direccion" placeholder="Escoge tu direccion" _selectedItem={{
                        bg: "#DB7F50",
                        textColor: "white",
                        endIcon: <CheckIcon size="5" />
                      }} mt={1} onValueChange={itemValue => setSelection1(itemValue)}>
                        {addresses.map(address => {
                          return (
                            <Select.Item key={address.id} label={address.address} value={address.address} />
                          )
                        })}
                      </Select>
                      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                          Por favor escoge una direccion.
                        </FormControl.ErrorMessage>
                    </FormControl>
                  </Box>
                </VStack>
              )
            }
            <Box
              mt="4"
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
                  Comercio: {_company?.name}
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
                  Con Delivery: ${selection ? _company.delivery_price : 0}

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
                  TOTAL a pagar: ${total }
                </Text>
                <Button
                  mt="2"
                  mb="4"
                  width="80%"
                  bgColor="#DB7F50"
                  borderRadius="20"
                  onPress={() => { onSubmit() }}
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

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
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

export default connect(mapStateToProps)(ConfirmarPedido);
