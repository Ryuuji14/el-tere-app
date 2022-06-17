import React, { useState, useCallback } from "react";
import {
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
  Divider,
  StatusBar,
  Modal,
  Button,
} from "native-base";

import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Dimensions, StyleSheet, RefreshControl } from "react-native";
import { Entypo } from "@expo/vector-icons";
import ProductoCard from "../components/screens/ProductoCard";
import PromocionCard from "../components/screens/PromocionCard";
import { connect } from "react-redux";
import { Tab, TabView } from "@rneui/themed";
import ProductScreen from "../components/screens/ProductScreen";
import Comment from "../components/screens/Comment";
import { useFocusEffect } from "@react-navigation/native";
import { productsAPI } from "../api/productsAPI";
import useCustomToast from "../hooks/useCustomToast";
import { reviewAPI } from "../api/reviewAPI";
import { SafeAreaView } from "react-native";
import { companyAPI } from "../api/companyAPI";
import useLoading from "../hooks/useLoading";
import { Stop } from "react-native-svg";
import { WebView } from "react-native-webview";

const { width, height } = Dimensions.get("window");

const Comercio = ({ route, cartItems }) => {
  const [market, setMarket] = useState({
    id: route.params.id,
    name: route.params.name,
    image: route.params.image,
    type: route.params.type,
    rating: route.params.rating,
    horaApertura: route.params.horaApertura,
    horaCierre: route.params.horaCierre,
    delivery: route.params.delivery,
    local: route.params.local,
  });
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [index, setIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const { showErrorToast } = useCustomToast();
  const [comments, setComments] = useState([]);
  const regex = /(\d{4}-\d{2}-\d{2})/;
  const [deleteVisible, setDeleteVisible] = useState(false);


  const getProducts = async () => {
    startLoading();
    try {
      const { data } = await productsAPI.getProducts(market?.id);
      setProducts(data || []);
    } catch (error) {
      showErrorToast(error);
    }
    stopLoading();
  };

  const getComments = async () => {
    startLoading();
    try {
      const { data } = await reviewAPI.getReviews(market?.id);
      setComments(data || []);
    } catch (error) {
      showErrorToast(error);
    }
    stopLoading();
  };

  const getPromotions = async () => {
    try {
      const { data } = await companyAPI.getCompanyPromotions(market?.id);
      setPromotions(data || []);
    } catch (error) {
      showErrorToast(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      console.log(lat,lng)
      getPromotions();
      getProducts();
      getComments();
    }, [])
  );

const array = JSON.parse(market.local?.location)
const lat = array[0];
const lng = array[1];


  return (

    <View minH={height} width={width}>
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
          <HStack justifyContent="space-between" alignItems="center">
            <VStack>
              <Text style={styles.title}>{market.name}</Text>
              <Text style={styles.subtitle}>{market.type}</Text>
            </VStack>
            <HStack space={2}>
              <IconButton
                icon={<Icon as={Entypo} name="location-pin" />}
                height="70%"
                borderRadius="full"
                variant="solid"
                bgColor="#DB7F50"
                onPress={() => setDeleteVisible(true)}
              />
            </HStack>
          </HStack>
        </Stack>

        <Stack>
          <HStack alignItems="center" space={2}>
            <Icon as={FontAwesome} name="star" color="yellow.500" />
            <Text fontSize="11">{Number(market.rating).toFixed(0)}</Text>

            <Icon as={Entypo} name="clock" ml="2" color="gray.500" />
            <Text fontSize="11">
              {market.horaApertura.split("", 5)} am -{" "}
              {market.horaCierre.split("", 5)} pm
            </Text>

            {market?.delivery && (
              <HStack alignItems="center" space={1}>
                <Icon as={MaterialCommunityIcons} size="6" name="motorbike" />
                <Text fontSize="11">delivery</Text>
              </HStack>
            )}
          </HStack>
        </Stack>
      </View>

      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        containerStyle={{
          backgroundColor: "white",
        }}
        indicatorStyle={{
          backgroundColor: "#41634A",
          height: 4,
        }}
      >
        <Tab.Item
          title="Productos"
          titleStyle={{
            fontSize: 12,
            color: index === 0 ? "#41634A" : "gray",
          }}
          containerStyle={{
            backgroundColor: "white",
          }}
          icon={{
            name: "basket",
            type: "ionicon",
            color: index === 0 ? "#41634A" : "#9393AA",
          }}
        />
        <Tab.Item
          title="Comentarios"
          titleStyle={{
            fontSize: 12,
            color: index === 1 ? "#41634A" : "gray",
          }}
          containerStyle={{
            backgroundColor: "white",
          }}
          icon={
            <Icon
              as={Entypo}
              size="8"
              name="message"
              color={index === 1 ? "#41634A" : "#9393AA"}
            />
          }
        />
      </Tab>
      <Divider />
      <TabView
        value={index}
        onChange={setIndex}
        animationType="spring"
        containerStyle={{
          backgroundColor: "white",
        }}
        disableSwipe
      >
        <TabView.Item style={{ backgroundColor: "white" }}>
          <ProductScreen
            promociones={promotions.promotions}
            productos={products}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={async () => {
                  await Promise.all([getProducts(), getPromotions()]);
                }}
              />
            }
          />
        </TabView.Item>
        <TabView.Item
          style={{ backgroundColor: "white", width: "100%", height: "100%" }}
        >
          <SafeAreaView style={styles.container}>
            <FlatList
              contentContainerStyle={{
                width: "100%",
                paddingBottom: "50%",
                display: "flex",
              }}
              data={comments || []}
              renderItem={({ item: comment, index }) => (
                <Comment
                  key={index.toString()}
                  firstName={comment?.user_review?.first_name}
                  lastName={comment?.user_review?.last_name}
                  rating={comment?.rating}
                  date={comment?.createdAt}
                  description={comment?.description}
                />
              )}
              keyExtractor={(comment) => comment?.id}
              ListEmptyComponent={() => (
                <Text
                  fontSize="16"
                  alignContent="center"
                  alignSelf="center"
                  textAlign="center"
                >
                  No hay comentarios {"\n"}en este comercio
                </Text>
              )}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={getComments}
                />
              }
            />
          </SafeAreaView>
        </TabView.Item>
      </TabView>
      <Modal
        isOpen={deleteVisible}
        onClose={() => setDeleteVisible(false)}
        justifyContent="center"
        bottom="4"
        size="lg"
        
      >
        <Modal.Content >
          <Modal.Header borderBottomWidth={0}>
            <Text textAlign="center"> Ubicacion: {market.name}</Text>
          </Modal.Header>
          <Modal.Body>
            <Text textAlign="center"></Text>
            <Text textAlign="center" mb={4}>
              Local: {market?.local.area}
            </Text>
            <WebView
              style={{
                width: "100%",
                height: 200,
                borderColor:"#5A7E64",
              }}
              source={{
                uri: `https://api.mapbox.com/styles/v1/mapbox/streets-v11.html?title=false&zoomwheel=false&access_token=pk.eyJ1IjoicnViZW5nMTgiLCJhIjoiY2tka3dsNDRiMHQwMTJxczhzZmZlNWU0eSJ9.LE-lD72fmdlehYenHepNNg#4/${lat}/${lng}/0/0`,
              }}
            />
          </Modal.Body>
          <Modal.Footer borderTopWidth={0} justifyContent="center">
            <Button
              onPress={() => {
                setDeleteVisible(false);
              }}
              rounded="full"
              padding={2}
              w={100}
              _text={{
                fontSize: 19,
                color: "#FFFFFF",
              }}
              backgroundColor="#DB7F50"
            >
              OK
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#41634A",
    paddingTop: 15,
  },
  subtitle: {
    fontSize: 18,
    color: "#9393AA",
  },
  container: {},
});

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

export default connect(mapStateToProps)(Comercio);
