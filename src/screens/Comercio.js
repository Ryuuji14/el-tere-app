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
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Dimensions, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import ProductoCard from "../components/screens/ProductoCard";
import { useState } from "react";
import PromocionCard from "../components/screens/PromocionCard";
const productos = require("../../assets/productos.json");
const promociones = require("../../assets/promociones.json");

const { width } = Dimensions.get("window");

const Comercio = ({ route }) => {
  const [market, setMarket] = useState({
    name: route.params.name,
    image: route.params.image,
    type: route.params.type,
    rating: route.params.rating,
    horaApertura: route.params.horaApertura,
    horaCierre: route.params.horaCierre,
    delivery: route.params.delivery
  });

  return (
    <ScrollView>
      <View>
        <Image
          width="100%"
          height={150}
          source={{
            uri: market.image,
          }}
          alt={market.name}
        />
      </View>
      <View bgColor="white" px={7} pb={5}>

        <Stack>
          <HStack justifyContent='space-between' alignItems='center'>
            <VStack>
              <Text style={styles.title}>
                {market.name}
              </Text>
              <Text style={styles.subtitle}>
                {market.type}
              </Text>
            </VStack>
            <HStack space={2}>
              <IconButton
                icon={
                  <Icon
                    as={Entypo}
                    name="message"
                  />
                }
                height='70%'
                borderRadius='full'
                variant='solid'
                bgColor='#DB7F50'
              />
              <IconButton
                icon={
                  <Icon
                    as={Entypo}
                    name="location-pin"
                  />
                }
                height='70%'
                borderRadius='full'
                variant='solid'
                bgColor='#DB7F50'
              />
            </HStack>
          </HStack>
        </Stack>

        <Stack>
          <HStack alignItems='center' space={2}>
            <Icon as={FontAwesome} name="star" color='yellow.500' />
            <Text fontSize='11' >
              {market.rating}
            </Text>

            <Icon as={Entypo} name="clock" ml='2' color='gray.500' />
            <Text fontSize='11'>
              {market.horaApertura} - {market.horaCierre}
            </Text>
            <Icon as={MaterialCommunityIcons} size='6' name="motorbike" />
            <Text fontSize='11'>
              delivery
            </Text>
          </HStack>
        </Stack>
      </View>

      <Stack bgColor='white'>
        <HStack justifyContent='center'>
          <Button
            variant="outline"
            borderRadius='0'
            width='50%'
            height='50'
            leftIcon={
              <Icon as={FontAwesome} name="shopping-basket" color='gray.400' />
            }
          >
            {<Text color='#41634A' fontSize='18' fontWeight='bold'>Productos</Text>}
          </Button>

          <Button
            variant="outline"
            borderRadius='0'
            width='50%'
            height='50'
            leftIcon={
              <Icon
              size='6'
                   color='gray.400'
                    as={Entypo}
                    name="message"
                  />
            }

          >

            {<Text color='#41634A' fontSize='18' fontWeight='bold'>Comentarios</Text>}
          </Button>
        </HStack>
      </Stack>

      <View bgColor="white" px={7} pb={5}>

        <KeyboardAvoidingView>
          <Stack>
            <VStack>
              <Text pt={2} pb={2} bold color="grey">
                Promociones
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <HStack space={2}>
                  {promociones.map((element) => (
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
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#41634A',
    paddingTop: 15,
  },
  subtitle: {
    fontSize: 18,
    color: '#9393AA',
  }
})

export default Comercio;
