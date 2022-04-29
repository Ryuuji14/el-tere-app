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
} from "native-base";
import { Dimensions } from "react-native";
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
  });

  return (
    <ScrollView>
      <View bgColor="white" px={7} pb={5}>
        <View>
          <Image
            width="100%"
            height={60}
            source={{
              uri: "https://www.barquisimeto.com/wp-content/uploads/2016/08/12-1.jpg",
            }}
            alt={market.name}
          />
        </View>

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

export default Comercio;
