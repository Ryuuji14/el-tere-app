import React, { useRef, useMemo, useState, useEffect, Fragment } from "react";
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
import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Logo from "../../assets/LOGO-EL-TERE.png";
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import ComercioCard from "../components/screens/ComercioCard";
import PromocionCard from "../components/screens/PromocionCard";
import BottomNavigation from "../navigation/BottomNavigation";
import promociones from "../../assets/promociones.json";
import { dashboardAPI } from "../api/dashboard";
import { companyAPI } from "../api/companyAPI";

import useCustomToast from "../hooks/useCustomToast";

var { height } = Dimensions.get("window");

const ICONS_PROPS = {
  size: 5,
  color: "black",
  mr: 3,
};
const comercios = require("../../assets/comercios.json");

const INPUT_PROPS = {
  borderColor: "#F96332",
  bgColor: "#fff",
  placeholderTextColor: "#9393AA",
  fontSize: "md",
  variant: "rounded",
};

const categorias = [
  {
    id: 0,
    name: "Todos",
  },
  {
    id: 1,
    name: "Populares",
  },
  {
    id: 2,
    name: "Recientes",
  },
  {
    id: 3,
    name: "Recomendados",
  },
];

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [promotionsAndEvents, setPromotionsAndEvents] = useState([]);
  const { showErrorToast } = useCustomToast();
  const [areas, setAreas] = useState([]);

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(0);

  const debounceRef = useRef(null);

  const handleSearch = (val) => {
    setSearch(val);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setSearchBy(val);
    }, 350);
  };

  const filteresCommerces = useMemo(() => {
    return comercios.filter((comercio) =>
      comercio.name.toLowerCase().includes(searchBy.toLowerCase())
    );
  }, [comercios, searchBy]);

  useEffect(() => {
    const getPromotions = async () => {
      try {
        const [eventData, promotionData] = await Promise.all([
          dashboardAPI.getEvents(),
          dashboardAPI.getPromotions(),
        ]);

        setPromotionsAndEvents(
          [...(eventData?.items || []), ...(promotionData?.items || [])].sort(
            (a, b) => {
              if (a?.starts_at > b?.starts_at) return 1;

              if (a?.starts_at < b?.starts_at) return -1;

              return 0;
            }
          )
        );
      } catch (error) {
        console.log(error.response);
      }
    };

    getPromotions();
  }, []);

  useEffect(() => {
    const getAreasWithProducts = async () => {
      try {
        const { data } = await companyAPI.getAreasWithProducts();
        setAreas(data || []);
      } catch (error) {
        showErrorToast(error);
      }
    };
    getAreasWithProducts();
  }, []);

  return (
    <ScrollView bgColor="white">
      <View bgColor="white" px={7} pb={5}>
        <Stack>
          <HStack space={3} alignItems="center">
            <Image source={Logo} alt="logo" size="sm" />
            <VStack>
              <Heading color="#41634A" fontSize={20} fontWeight="bold" mt={5}>
                ¡Bienvenido a EL TERE!
              </Heading>
              <Text color="#c9c7c3" fontWeight="bold" fontSize={16} mb={4}>
                Tu mejor aliado para hacer mercado
              </Text>
            </VStack>
          </HStack>
        </Stack>

        <KeyboardAvoidingView>
          <Stack>
            <HStack>
              <Input
                value={search}
                onChangeText={handleSearch}
                {...INPUT_PROPS}
                placeholder="Buscar..."
                w="100%"
                InputRightElement={
                  <Icon as={FontAwesome} name="search" {...ICONS_PROPS} />
                }
              />
            </HStack>
          </Stack>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Stack>
              <HStack mt="2" space={2}>
                {categorias.map((elemento) => (
                  <Button
                    size="sm"
                    key={elemento.id}
                    my="2"
                    bgColor={
                      categoriaSeleccionada === elemento.id
                        ? "#41634A"
                        : "white"
                    }
                    borderColor={
                      categoriaSeleccionada === elemento.id
                        ? "#41634A"
                        : "#F96332"
                    }
                    borderWidth={1}
                    borderRadius={50}
                    onPress={() => setCategoriaSeleccionada(elemento.id)}
                  >
                    <Text
                      color={
                        categoriaSeleccionada === elemento.id ? "white" : "grey"
                      }
                    >
                      {" "}
                      {elemento.name}{" "}
                    </Text>
                  </Button>
                ))}
              </HStack>
            </Stack>
          </ScrollView>

          <Stack>
            <VStack>
              <Text pt={2} pb={2} bold color="grey">
                Promociones y Eventos
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <HStack space={2} py={2}>
                  {promotionsAndEvents.map((element) => (
                    <PromocionCard
                      key={element.id}
                      image={element.photo}
                      name={element.title}
                      description={element.description}
                      discount={element.discount}
                    />
                  ))}
                </HStack>
              </ScrollView>
            </VStack>
          </Stack>
          <Text pt={2} pb={2} bold color="grey">
            Comercios
          </Text>

          {areas.map(({ area }) => (
            <Fragment key={area.id}>
              <HStack alignItems="center" justifyContent="space-between">
                <Text color="#41634A" pt={2} pb={1} bold>
                  {area?.name}
                </Text>
                <TouchableOpacity>
                  <Text color="#41634A">Ver todos</Text>
                </TouchableOpacity>
              </HStack>
              <FlatList
                horizontal
                data={area.companies || []}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <ComercioCard
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    name={item.name}
                    type={item?.type || ""}
                    rating={item.rating || 0}
                    horaApertura={item.horaApertura}
                    horaCierre={item.closing_time}
                    delivery={item.closing_time}
                  />
                )}
              />
            </Fragment>
          ))}

          {/* <View>
            <FlatList
              columnWrapperStyle={{ justifyContent: "space-between" }}
              numColumns={2}
              data={filteresCommerces}
              renderItem={({ item }) => (
                <ComercioCard
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  type={item.type}
                  rating={item.rating}
                  horaApertura={item.horaApertura}
                  horaCierre={item.horaCierre}
                  delivery={item.delivery}
                />
              )}
              keyExtractor={(item) => item.name}
            />
          </View> */}
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
