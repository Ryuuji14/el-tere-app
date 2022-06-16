import React, { useRef, useMemo, useState, useEffect, Fragment } from "react";
import {
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
import { TouchableOpacity, RefreshControl } from "react-native";
import Logo from "../../assets/LOGO-EL-TERE.png";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import ComercioCard from "../components/screens/ComercioCard";
import PromocionCard from "../components/screens/PromocionCard";
import { dashboardAPI } from "../api/dashboard";
import { companyAPI } from "../api/companyAPI";

import useLoading from "../hooks/useLoading";
import useCustomToast from "../hooks/useCustomToast";
import useAuthContext from "../hooks/useAuthContext";

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
    state: { selectedCategory, user },
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
      // if (selectedCategory?.id === -1) {
      switch (categoriaSeleccionada) {
        case 0:
          if (selectedCategory?.id === -1) {
            const { data } = await companyAPI.getAreasWithProducts();
            setAreas(data);
          } else {
            const { data } = await companyAPI.getCompaniesByCategory(
              selectedCategory.id
            );
            setAreas([
              {
                id: selectedCategory.id,
                name: selectedCategory.name || "",
                companies: data,
              },
            ]);
          }
          break;
        case 1:
          const { data: data1 } = await companyAPI.getAreasWithPopularProducts(
            selectedCategory?.id
          );
          setAreas(data1);
          break;
        case 2:
          const { data: data2 } = await companyAPI.getAreasWithRecentProducts(
            user?.id,
            selectedCategory?.id
          );
          setAreas(data2);
          break;
        case 3:
          const { data: data3 } =
            await companyAPI.getAreasWithRecommendedProducts(
              selectedCategory?.id
            );
          setAreas(data3);
          break;
        default:
          break;
      }
      // }
      // else {
      //   const { data } = await companyAPI.getCompaniesByCategory(
      //     selectedCategory.id
      //   );
      //   setAreas(data || []);
      // }
    } catch (error) {
      showErrorToast(error);
    }
    stopLoading();
  };

  const init = async () => {
    await Promise.all([getPromotions(), getAreasWithProducts()]);
  };

  useEffect(() => {
    init();
  }, [categoriaSeleccionada]);

  const filtertedAreas = useMemo(() => {
    if (searchBy && areas.length > 0) {
      if (selectedCategory?.id !== -1) {
        return areas.filter((area) =>
          area?.name?.toLowerCase()?.includes(searchBy.toLowerCase())
        );
      }

      return areas.map((el) => ({
        ...el,
        area: {
          ...el.area,
          companies: el?.area?.companies?.filter((area) =>
            area?.name?.toLowerCase()?.includes(searchBy.toLowerCase())
          ),
        },
      }));
    }

    return areas;
  }, [areas, searchBy]);

  return (
    <ScrollView
      bgColor="white"
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={init} />
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
          {filtertedAreas.map(({ area }, index) => (
            <Fragment key={index.toString()}>
              <HStack alignItems="center" justifyContent="space-between">
                <Text color="#41634A" pt={2} pb={1} bold>
                  {area?.name}
                </Text>
                {/* <TouchableOpacity>
                    <Text color="#41634A">Ver todos</Text>
                  </TouchableOpacity> */}
              </HStack>
              <View justifyContent="space-between">
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
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
              </View>
            </Fragment>
          ))}
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
