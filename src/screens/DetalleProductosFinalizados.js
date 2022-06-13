import { Button, Heading, HStack, ScrollView, Stack, Text, View, Divider, Pressable, Avatar } from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import React, { useEffect, useState } from "react";
import { ImageBackground, Dimensions } from "react-native";
import useLoading from "../hooks/useLoading";
import { productsAPI } from "../api/productsAPI";

const { width, height } = Dimensions.get("screen");

export const DetalleProductosFinalizados = (props) => {
  const item = {
    sales: props.route.params.sales,
    idProductos: props.route.params.idProductos,
    quantitys: props.route.params.quantitys,
  }
  const { isLoading, startLoading, stopLoading } = useLoading()
  const [productos, setProductos] = useState([]);

  const getProductos = async () => {
    try {
      startLoading();
      const productosResponse = await productsAPI.getProducts(item.sales.company.id);
      setProductos(productosResponse);

    } catch (error) {
      console.log(error)
    }
    stopLoading();
  }
  useEffect(() => {
    
    console.log("Productos",productos, "idProductos", item.idProductos,"Filtrados", allProducts)
    getProductos();
  }, [])

  let allProducts = productos.data?.filter((producto) => {
     return item.idProductos.find((id) => id === producto.id)
  }
  )

  return (
    <>
      <ImageBackground
        source={require("../../assets/register-bg.png")}
        style={{ width, height, zIndex: 1, paddingHorizontal: 30, flex: 1 }}
      >
        <Heading color="white" fontSize={36} fontWeight="bold" >
          Pedido nro: {'\n'} {item?.sales?.id}
        </Heading>
        <View py={3} px={3} bgColor='white' borderRadius={10}>
          {allProducts?.map((data, index) => (
            <Pressable h="20" bgColor="white" key={index.toString()} >
              <HStack>
                <Avatar
                  size="lg"
                  source={{
                    uri: data?.photo
                  }}
                />
                <Text ml="4" fontSize="18" mt="4">
                  <Text fontSize="16" color='gray.400' >{item.quantitys[index]}x </Text>
                  {data?.name}</Text>
                <Text
                  style={{ position: 'absolute', right: 10 }}
                  bold mt="4"
                  fontSize="16"
                >
                  ${data.price * item.quantitys[index]}
                </Text>
              </HStack>
            </Pressable>
          ))}
        </View>
      </ImageBackground>
    </>
  );
};
