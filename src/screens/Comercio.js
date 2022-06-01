import React, { useState, useCallback } from 'react';
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
  Divider,
} from "native-base";
import {
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Dimensions, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import ProductoCard from "../components/screens/ProductoCard";
import PromocionCard from "../components/screens/PromocionCard";
import { connect } from "react-redux";
import { Tab, TabView } from '@rneui/themed';
import ProductScreen from '../components/screens/ProductScreen';
import Comment from '../components/screens/Comment';
import { useFocusEffect } from '@react-navigation/native';
import { productsAPI } from '../api/productsAPI';
const promociones = require("../../assets/promociones.json");
import useCustomToast from "../hooks/useCustomToast";
import { reviewAPI } from '../api/reviewAPI';


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
  });

  const [index, setIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const { showErrorToast } = useCustomToast();
  const [comments, setComments] = useState([]);


  useFocusEffect(
    useCallback(() => {
      const getProducts = async () => {
        try {
          const { data } = await productsAPI.getProducts(market?.id);
          setProducts(data || []);
        } catch (error) {
          showErrorToast(error);
        }
      }
      getProducts();
    }, [])
  )
  useFocusEffect(
    useCallback(() => {
      const getComments = async () => {
        try {
          const { data } = await reviewAPI.getReviews(market?.id);
          setComments(data || []);
          console.log(comments);

        } catch (error) {
          showErrorToast(error);
          console.log(error);
        }
      }
      getComments();
    }, [])
  )
  return (
    <View
      minH={height}
      width={width}>
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
                icon={<Icon as={Entypo} name="message" />}
                height="70%"
                borderRadius="full"
                variant="solid"
                bgColor="#DB7F50"
              />
              <IconButton
                icon={<Icon as={Entypo} name="location-pin" />}
                height="70%"
                borderRadius="full"
                variant="solid"
                bgColor="#DB7F50"
              />
            </HStack>
          </HStack>
        </Stack>

        <Stack>
          <HStack alignItems="center" space={2}>
            <Icon as={FontAwesome} name="star" color="yellow.500" />
            <Text fontSize="11">{market.rating}</Text>

            <Icon as={Entypo} name="clock" ml="2" color="gray.500" />
            <Text fontSize="11">
              {market.horaApertura} - {market.horaCierre}
            </Text>
            <Icon as={MaterialCommunityIcons} size="6" name="motorbike" />
            <Text fontSize="11">delivery</Text>
          </HStack>
        </Stack>
      </View>

      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        containerStyle={{
          backgroundColor: 'white',
        }}
        indicatorStyle={{
          backgroundColor: '#41634A',
          height: 4,
        }}
      >
        <Tab.Item
          title="Productos"
          titleStyle={{
            fontSize: 12, color:
              index === 0 ? '#41634A' : 'gray'
          }}
          containerStyle={{
            backgroundColor: 'white',
          }}
          icon={{
            name: 'basket',
            type: 'ionicon',
            color: index === 0 ? '#41634A' : '#9393AA'
          }}
        />
        <Tab.Item
          title="Comentarios"
          titleStyle={{
            fontSize: 12, color:
              index === 1 ? '#41634A' : 'gray'
          }}
          containerStyle={{
            backgroundColor: 'white',
          }}
          icon={<Icon as={Entypo}
            size="8"
            name="message"
            color={index === 1 ? "#41634A" : '#9393AA'}
          />}
        />
      </Tab>
      <Divider />
      <TabView
        value={index}
        onChange={setIndex}
        animationType="spring"
        containerStyle={{
          backgroundColor: 'white',
        }}
        disableSwipe
      >
        <TabView.Item
          style={{ backgroundColor: 'white', }}
        >
          <ProductScreen
            promociones={promociones}
            productos={products}
          />
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>

          <FlatList
            data={comments || []}
            renderItem={({ comment }) => (
              <Comment
                key={comment?.id}
                firstName={comment?.user_review?.first_name}
                lastName={comment?.user_review?.last_name}
                rating={comment?.rating}
                date={comment?.createdAt}
                description={comment?.description}
              />
            )}
            keyExtractor={(comment) => comment?.id}
          />
          {/* {  comments.map((comment) => (
        <Comment
              key={comment?.id}
              firstName={comment?.user_review?.first_name}
              lastName={comment?.user_review?.last_name}
              rating={comment?.rating}
              date={comment?.createdAt}
              description={comment?.description}
            />  
       ))} */}
        </TabView.Item>
      </TabView>
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
});

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

export default connect(mapStateToProps)(Comercio);
