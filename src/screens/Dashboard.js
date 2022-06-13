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
  IconButton,
} from "native-base";
import { Dimensions, TouchableOpacity, RefreshControl } from "react-native";
import Logo from "../../assets/LOGO-EL-TERE.png";
import {
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import ComercioCard from "../components/screens/ComercioCard";
import PromocionCard from "../components/screens/PromocionCard";
import { dashboardAPI } from "../api/dashboard";
import { companyAPI } from "../api/companyAPI";

import useLoading from "../hooks/useLoading";
import useCustomToast from "../hooks/useCustomToast";
import useAuthContext from "../hooks/useAuthContext";

var { height } = Dimensions.get("window");

const ICONS_PROPS = {
  size: 5,
  color: "black",
  mr: 3,
};

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

const Dashboard = ({ navigation }) => {
  const {
    state: { selectedCategory },
  } = useAuthContext();
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [promotionsAndEvents, setPromotionsAndEvents] = useState([]);
  const { showErrorToast } = useCustomToast();
  const [areas, setAreas] = useState([]);
  const { isLoading, startLoading, stopLoading } = useLoading();

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

  const getPromotions = async () => {
    startLoading();
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
    stopLoading();
  };


  const getAreasWithProducts = async () => {
    startLoading();
    try {
      if (selectedCategory?.id === -1) {
        const { data } = await companyAPI.getAreasWithProducts();
        setAreas(data || []);
      } else {
        const { data } = await companyAPI.getCompaniesByCategory(
          selectedCategory.id
        );
        setAreas(data || []);
      }
    } catch (error) {
      showErrorToast(error);
    }
    stopLoading();
  };

  useEffect(() => {
    getPromotions();
    getAreasWithProducts();
  }, []);


  return (
    <ScrollView bgColor="white" refreshControl={
      <RefreshControl refreshing={isLoading} onRefresh={getAreasWithProducts || getPromotions} />
    }
      showsVerticalScrollIndicator={false}
    >
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
          <HStack space={2}>
            <Input
              value={search}
              onChangeText={handleSearch}
              {...INPUT_PROPS}
              placeholder="Buscar..."
              width="85%"
              InputRightElement={
                <Icon as={FontAwesome} name="search" {...ICONS_PROPS} />
              }
            />
            <IconButton
              bgColor="#DB7F50"
              rounded="3xl"
              onPress={() => navigation?.navigate("FilterRubros")}
              icon={
                <Icon
                  as={MaterialIcons}
                  name="filter-alt"
                  color="#fff"
                  size={22}
                />
              }
            />
          </HStack>
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
                  {promotionsAndEvents.map((element, index) => (
                    <PromocionCard
                      key={index.toString()}
                      id={element.id}
                      image={element.photo}
                      name={element.title}
                      description={element.description}
                      discount={element.discount}
                      location={element.location}
                      date={element.starts_at}
                    />
                  ))}
                </HStack>
              </ScrollView>
            </VStack>
          </Stack>
          <Text pt={2} pb={2} bold color="grey">
            Comercios
          </Text>
          {selectedCategory?.id === -1 &&
            areas.map(({ area }, index) => (
              <Fragment key={index.toString()}>
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
                      image={item.photo}
                      name={item.name}
                      type={item?.type || ""}
                      rating={item.rating || 0}
                      horaApertura={item.opening_time}
                      horaCierre={item.closing_time}
                      delivery={item.closing_time}
                    />
                  )}
                />
              </Fragment>
            ))}

          {selectedCategory?.id !== -1 && (
            <>
              <HStack alignItems="center" justifyContent="space-between">
                <Text color="#41634A" pt={2} pb={1} bold>
                  {selectedCategory?.name}
                </Text>
                <TouchableOpacity>
                  <Text color="#41634A">Ver todos</Text>
                </TouchableOpacity>
              </HStack>
              <FlatList
                horizontal
                data={areas || []}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <ComercioCard
                    key={item.id}
                    id={item.id}
                    image={item.photo}
                    name={item.name}
                    type={item?.type || ""}
                    rating={item.rating || 0}
                    horaApertura={item.opening_time}
                    horaCierre={item.closing_time}
                    delivery={item.closing_time}
                  />
                )}
              />
            </>
          )}
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
