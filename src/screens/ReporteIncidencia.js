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
   idPedido: props.route.params.idPedido,
   companyName: props.route.params.companyName,
  }
  const formatDate = (date) => {
    const d = new Date(date);
    const [month, day, year] = d?.toLocaleDateString("en-US").split("/");
  
    return `${day}/${month}/${year}` || "";
  };

  const { isLoading, startLoading, stopLoading } = useLoading();
  const { showErrorToast, showSuccesToast } = useCustomToast();

  const [incidencia, setIncidencia] = useState([]);
  const getIncidencia = async () => {
    startLoading();
    try {
      const { data } = await incindentAPI.getIncidents(item.idPedido);
      setIncidencia(data);
    } catch (error) {
      showErrorToast(error.message);
    }
    finally {
      stopLoading();
    }
  }

  useEffect(() => {
    getIncidencia();
  }
,[])

  return (
    <>
    
      <ImageBackground
        source={require("../../assets/register-bg.png")}
        style={{ width, height, zIndex: 1, paddingHorizontal: 30, flex: 1 }}
      >
        <Heading color="white" fontSize={36} fontWeight="bold" >
          Reporte {'\n'} Incidencias
        </Heading>
        {incidencia.length > 0 ? (
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
               {incidencia[0]?.description}
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
            <Text color="#6E6E7A" bold textAlign="center"> Pedido Nro: {"\n"} {incidencia[0]?.sale_id} </Text>
          </View>
          <Divider
            borderWidth="1"
            width="100%"
            borderColor="#41634A"
          />
          <View>
            <Text color="#6E6E7A" bold textAlign="center"> Comercio: {"\n"} {item?.companyName}</Text>
          </View>
          <Divider
            borderWidth="1"
            width="100%"
            borderColor="#41634A"
          />
          <View>
            <Text color="#6E6E7A" bold textAlign="center"> Fecha del Reporte: {"\n"} {formatDate(incidencia[0]?.createdAt)}</Text>
          </View>
        </View>
        ) : (
          <View width="100%" height="80%" bgColor='white' borderRadius={10} style={styles.emptyContainer}  >
            <Text fontSize="18" color="#6E6E7A"> No hay incidencias</Text>
          </View>  
        )}


      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});

export default ReporteIncidencias;