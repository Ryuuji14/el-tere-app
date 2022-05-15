import React from 'react';
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
import {
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Dimensions, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import ProductoCard from "./ProductoCard"
import { useState } from "react";
import PromocionCard from "./PromocionCard"
import { connect } from "react-redux";
import { Tab, TabView } from '@rneui/themed';
const { width, height } = Dimensions.get("window");
const productos = require("../../../assets/productos.json");
const promociones = require("../../../assets/promociones.json");

const ProductScreen = ({ promociones = [], productos = [] }) => {
  return (
    <ScrollView>
      <View
        bgColor="white"
        px={7} pb={5}
        minH={height} >
        <KeyboardAvoidingView>
          <Stack>
            <VStack>
              <Text pt={2} pb={2} bold color="grey">
                Promociones
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <HStack space={2}>
                  {promociones?.map((element) => (
                    <PromocionCard
                      key={element.id}
                      image={element.image}
                      name={element.name}
                      description={element.description}
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
              data={productos}
              renderItem={({ item }) => (
                <ProductoCard
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                />
              )}
              keyExtractor={(item) => item.name}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  )
}

export default ProductScreen