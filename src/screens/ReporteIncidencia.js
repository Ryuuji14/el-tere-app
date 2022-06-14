import { Button, Heading, Text, View, Input, Divider, IconButton, Icon, Box } from "native-base";
import React, { useEffect, useState } from "react";
import { ImageBackground, Dimensions, StyleSheet, RefreshControl } from "react-native";
import useLoading from "../hooks/useLoading";
import { AntDesign } from "@expo/vector-icons";
import useAuthContext from "../hooks/useAuthContext";
import useCustomToast from "../hooks/useCustomToast";

import { incindentAPI } from "../api/incidentAPI";

const { width, height } = Dimensions.get("screen");

const ReporteIncidencias = (props) => {
  const {
    dispatch,
    state: { user },
  } = useAuthContext();

  const item = {
    sales: props.route.params.sales,
    data: props.route.params.data,
  }

  const { isLoading, startLoading, stopLoading } = useLoading();
  const { showErrorToast, showSuccesToast } = useCustomToast();
  const [text, onChangeText] = useState("");

  useEffect(() => {
    console.log(item.data)
  }
    , [])



  return (
    <>
      <ImageBackground
        source={require("../../assets/register-bg.png")}
        style={{ width, height, zIndex: 1, paddingHorizontal: 30, flex: 1 }}
      >
        <Heading color="white" fontSize={36} fontWeight="bold" >
          Reporte {'\n'} Incidencias
        </Heading>
        <View width="100%" height="80%" bgColor='white' borderRadius={10} alignItems='center'alignContent="center" paddingBottom="10%" textAlign="center"  >
          <Text color="#6E6E7A" textAlign="center" size="18" width="100%" height="20%" my="2">
            Gracias por tu reporte, Nos{"\n"}
            contactaremos contigo através de tus {"\n"}
            datos de contacto para resolver tu {"\n"}
            incidencia en el menor tiempo posible.
          </Text>
          <Divider
            borderWidth="1"
            width="100%"
            borderColor="#41634A"
          />
          <View mt="2" textAlign="center"  width="80%"   height="50%" >
            <Text color="#6E6E7A" bold textAlign="center"> Tu Reporte: </Text>
            <Box
              my="4"
              ml="6"
              bgColor="#41634A"
              height="50%"
              width="80%"
              borderRadius="10"
              justifyContent="center"

            >
              <Text color="white" textAlign="center">
                {item.data.description}
              </Text>
            </Box>
            <Text color="#6E6E7A" bold textAlign="center"> Estatus: </Text>

            <Text color="#9393AA" textAlign="center"> Pendiente por Resolver</Text>
          </View>
          <Divider
            borderWidth="1"
            width="100%"
            borderColor="#41634A"
          />
          <View>
            <Text color="#6E6E7A" bold textAlign="center"> Pedido Nro: {"\n"} {item.data.sale_id}</Text>
          </View>
          <Divider
            borderWidth="1"
            width="100%"
            borderColor="#41634A"
          />
          <View>
            <Text color="#6E6E7A" bold textAlign="center"> Comercio {"\n"} </Text>
          </View>
          <Divider
            borderWidth="1"
            width="100%"
            borderColor="#41634A"
          />
          <View>
            <Text color="#6E6E7A" bold textAlign="center"> Fecha del Reporte: </Text>
          </View>
        </View>

      </ImageBackground>
    </>
  );
};

export default ReporteIncidencias;