import React, { useEffect, useState } from 'react'
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
  ScrollView
} from "native-base";
import { StyleSheet, Dimensions } from 'react-native';
import Logo from '../../assets/LOGO-EL-TERE.png'
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import ComercioCard from '../components/screens/ComercioCard';
import PromocionCard from '../components/screens/PromocionCard';
import BottomNavigation from '../navigation/BottomNavigation';

import promociones from '../../assets/promociones.json'

var { height } = Dimensions.get("window");

const ICONS_PROPS = {
  size: 5,
  color: "black",
  mr: 3,
};
const comercios = require('../../assets/comercios.json');

const INPUT_PROPS = {
  borderColor: "#F96332",
  bgColor: "#fff",
  placeholderTextColor: "#9393AA",
  fontSize: "md",
  variant: "rounded",
};

const categorias =
  [
    {
      id: 1,
      name: "Todos"
    },
    {
      id: 2,
      name: "Populares"
    },
    {
      id: 3,
      name: "Recientes"
    },
    {
      id: 4,
      name: "Recomendados"
    },
    {
      id: 5,
      name: "Orgia llanera"
    },
  ]

const Dashboard = () => {

  return (
      <View 
        bgColor='white'
        px={7}
        pb={5}
      >
        <Stack>
          <HStack space={3} alignItems='center'>
            <Image source={Logo}
              alt='logo'
              size='sm'
            />
            <VStack>
              <Heading color='#41634A' fontSize={20} fontWeight="bold" mt={5}>
                ¡Bienvenido a EL TERE!
              </Heading>
              <Text color='#c9c7c3' fontWeight="bold" fontSize={16} mb={4}>
                Tu mejor aliado para hacer mercado
              </Text>
            </VStack>
          </HStack>
        </Stack>

        <KeyboardAvoidingView>
          <Stack>
            <HStack>
              <Input

                {...INPUT_PROPS}
                placeholder="Buscar"
                w="85%"
                InputRightElement={
                  <Icon as={FontAwesome} name="search" {...ICONS_PROPS} />
                }
              />
              <Button ml='2'> </Button>
            </HStack>
          </Stack>
          <ScrollView horizontal>
            <Stack>
              <HStack mt='2' space={2}>
                {
                  categorias.map((elemento) => (
                    <Badge
                      key={elemento.id}
                      my='2'
                      colorScheme="success"
                      style={{
                        borderRadius: 30,
                        borderWidth: 1,
                        borderColor: "#F96332",
                        backgroundColor: 'white',
                      }}
                    >
                      <Text> {elemento.name} </Text>
                    </Badge>
                  ))
                }
              </HStack>
            </Stack>
          </ScrollView>

          <Stack>
            <VStack>
              <Text pt={2} pb={2} bold color='grey'>
                Promociones y Eventos
              </Text>
              <ScrollView horizontal>
                <HStack space={5}>
                  {
                    promociones.map((element) => (
                      <PromocionCard
                        key={element.id}
                        image={element.image}
                        name={element.name}
                        description={element.description}
                      />
                    ))
                  }
                </HStack>
              </ScrollView>
            </VStack>
          </Stack>
          <Text pt={2} pb={2} bold color='grey'>
            Comercios
          </Text>

          <View>
            <FlatList
              columnWrapperStyle={{justifyContent: 'space-between'}}      
              numColumns={2}
              data={comercios}
              renderItem={({ item }) =>
                <ComercioCard
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  type={item.type}
                  rating={item.rating}
                />
              }
              keyExtractor={item=> item.name}
            />
          </View>
        </KeyboardAvoidingView>
      </View>

  )

}

export default Dashboard;
