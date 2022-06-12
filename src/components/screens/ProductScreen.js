import React, { useEffect } from "react";
import {
  Badge,
  Button,
  KeyboardAvoidingView,
  Stack,
  Input,
  HStack,
  VStack,
  Text,
  View,
  FlatList,
  Heading,
  Image,
  Icon,
  ScrollView,
  IconButton,
} from "native-base";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Dimensions, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import ProductoCard from "./ProductoCard";
import { useState } from "react";
import PromocionCard from "./PromocionCard";
import { connect } from "react-redux";
import { Tab, TabView } from "@rneui/themed";
const { width, height } = Dimensions.get("window");

const promociones = require("../../../assets/promociones.json");

const ProductScreen = ({
  promociones = [],
  productos = [],
  refreshControl,
}) => {
  return (
    <ScrollView refreshControl={refreshControl}>
      <View bgColor="white" px={7} pb={5} minH={height}>
        <KeyboardAvoidingView>
          <Stack>
            <VStack>
              <Text pt={2} pb={2} bold color="grey">
                Promociones
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <HStack space={2}>
                  {promociones.map((element, index) => (
                    <PromocionCard
                      key={index.toString()}
                      id={element.id}
                      discount={element.discount}
                      date={element.starts_at}
                      image={element.photo}
                      name={element.title}
                      description={element.description}
                      location={element.location}
                    />
                  ))}
                </HStack>
              </ScrollView>
            </VStack>
          </Stack>
          <Text pt={2} pb={2} bold color="grey">
            Productos
          </Text>
          <View>
            <FlatList
              columnWrapperStyle={{ justifyContent: "space-between" }}
              numColumns={2}
              data={productos || []}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <ProductoCard
                  key={item.id}
                  id={item.id}
                  company_id={item.company_id}
                  description={item.description}
                  image={item.photo}
                  name={item.name}
                  price={item.price}
                />
              )}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default ProductScreen;
