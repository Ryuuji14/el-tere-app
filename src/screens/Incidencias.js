import { Button, Heading, Text, View, Input, Divider, IconButton, Icon } from "native-base";
import React, { useEffect, useState } from "react";
import { ImageBackground, Dimensions, StyleSheet, RefreshControl } from "react-native";
import useLoading from "../hooks/useLoading";
import { AntDesign } from "@expo/vector-icons";
import useAuthContext from "../hooks/useAuthContext";
import useCustomToast from "../hooks/useCustomToast";
import { useNavigation } from "@react-navigation/native";

import { incindentAPI } from "../api/incidentAPI";

const { width, height } = Dimensions.get("screen");

const Incidencias = (props) => {
  const {
    dispatch,
    state: { user },
  } = useAuthContext();
  const item = {
    sales: props.route.params.sales,
   
  }
  const Navigation = useNavigation();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { showErrorToast, showSuccesToast } = useCustomToast();
  const [text, onChangeText] = useState("");

  const addIncident = async () => {
    startLoading();
    try {
      const { data } = await incindentAPI.addIncident({
        sale_id: item.sales.id,
        status: "pending",
        description: text,
      });
      showSuccesToast("INCIDENCIA CREADA",);
      console.log(data) 
     Navigation.navigate("ReporteIncidencias", {
       sales: item.sales,
       data: data,
      });

    } catch (error) {
      showErrorToast(error.message);
    }
    finally {
      stopLoading();
    }
  }


  return (
    <>
      <ImageBackground
        source={require("../../assets/register-bg.png")}
        style={{ width, height, zIndex: 1, paddingHorizontal: 30, flex: 1 }}
      >
        <Heading color="white" fontSize={36} fontWeight="bold" >
          Reporte {'\n'} Incidencias
        </Heading>
        <View width="100%" height="80%" bgColor='white' borderRadius={10} alignItems='center' paddingBottom="30%"  >
          <Text color="#6E6E7A" textAlign="center" size="18" width="100%" height="20%" my="2">
            Si ha ocurrido algún incidente con tu {"\n"}
            orden, por favor escribenos y lo {"\n"}
            solucionaremos lo antes posible
          </Text>
          <Divider
            borderWidth="1"
            width="100%"
            borderColor="#41634A"
          />
          <View
            marginTop="auto"
            position="absolute"
            bottom={0}
            width="100%"
            alignSelf="flex-start"
          >
            <Input w="100%" size="lg" py="0"
              borderTopColor="#41634A"
              InputRightElement={<IconButton size="lg"
                icon={<Icon as={AntDesign}
                  name="rightcircle"
                  color="#41634A"
                  size="xl"
                />}
                rounded="none"
                w="1/6"
                h="full"
                onPress={addIncident}>
              </IconButton>}
              placeholder="Describenos tu Incidencia"
              onChangeText={(text) => onChangeText(text)}
              value={text}
            />
          </View>
        </View>

      </ImageBackground>
    </>
  );
};

export default Incidencias;