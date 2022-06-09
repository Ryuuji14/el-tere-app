import { Icon, Heading, HStack, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { ImageBackground, Dimensions, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { PendingSales } from "../components/screens/yourOrders/PendingSales";
import { SaleHistory } from "../components/screens/yourOrders/SalesHistory";
import { TabRouter } from "@react-navigation/native";

const { width, height } = Dimensions.get("screen");

const tabColor = (isActive) => (isActive ? "#567F64" : "gray.400");

export const YourSales = (props) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

 const item ={
  sales: props.route.params.sales,
 }

 const pending = item.sales.filter((sale) => sale.status === "to_deliver" || sale.status === "pending");
 const complete= item.sales.filter((sale) => sale.status === "complete");


  const changeTab = (index) => setActiveTabIndex(index);

  return (
    <ImageBackground
      source={require("../../assets/register-bg.png")}
      style={{ width, height, zIndex: 1, paddingHorizontal: 30, flex: 1 }}
    >
      <Heading color="white" fontSize={45} fontWeight="bold" mt={5}>
        Tus{"\n"}Pedidos
      </Heading>
      <View
        backgroundColor="#F4F5F7"
        pt={3}
        pb={5}
        flex={1}
        mt={6}
        borderTopRadius={20}
      >
        {/* tabs */}
        <HStack borderBottomWidth={1} pb={2} borderColor="#567F64">
          <TouchableOpacity
            style={{
              width: "50%",
            }}
            activeOpacity={0.8}
            onPress={() => changeTab(0)}
          >
            <HStack
              py={2}
              justifyContent="center"
              alignItems="center"
              space={2}
            >
              <Icon
                as={Feather}
                name="clock"
                color={tabColor(activeTabIndex === 0)}
                size={5}
              />
              <Text
                fontWeight="medium"
                fontSize={16}
                color={tabColor(activeTabIndex === 0)}
              >
                Pendientes
              </Text>
            </HStack>
          </TouchableOpacity>
          <View w={0.5} h="90%" bgColor="#567F64" my="auto" />
          <TouchableOpacity
            style={{
              width: "50%",
            }}
            activeOpacity={0.8}
            onPress={() => changeTab(1)}
          >
            <HStack
              py={2}
              justifyContent="center"
              alignItems="center"
              space={2}
            >
              <Icon
                as={Feather}
                name="clock"
                color={tabColor(activeTabIndex === 1)}
                size={5}
              />
              <Text
                fontWeight="medium"
                fontSize={16}
                color={tabColor(activeTabIndex === 1)}
              >
                Historial
              </Text>
            </HStack>
          </TouchableOpacity>
        </HStack>

        <View px={5} py={4}>
          {activeTabIndex === 0 ? <PendingSales sales={pending}/> : <SaleHistory sales={complete}/>}
        </View>
      </View>
    </ImageBackground>
  );
};
