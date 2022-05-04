import React from "react";
import { Card, View, Image, Text, Stack, ScrollView } from "native-base";
import { ImageBackground, Dimensions } from "react-native";
import { EditPerfilForm } from "../components/screens/editPerfil/EditPerfilForm";

const { width, height } = Dimensions.get("screen");

export const EditPerfil = () => {
  return (
    <ImageBackground
      source={require("../../assets/register-bg.png")}
      style={{
        width,
        height,
        zIndex: 1,
        flex: 1,
        paddingHorizontal: 30,
        paddingBottom: 5,
      }}
    >
      <Card
        rounded="3xl"
        shadow="0"
        bgColor="#F4F5F7"
        overflow="visible"
        mt="40"
        px={0}
        position="relative"
        pb={0}
      >
        {/* Logo */}
        <View
          position="absolute"
          top={-125}
          borderWidth={4}
          borderColor="white"
          borderRadius="full"
          width="40"
          height="40"
          display="flex"
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
          bgColor="#DD8457"
          alignSelf="center"
        >
          <Image
            source={require("../../assets/LOGO-EL-TERE-2.png")}
            alt="tere logo"
          />
        </View>

        <ScrollView
          pt={4}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
        >
          <Stack w="85%" alignSelf="center" mb={1}>
            <Text color="#5A7E64" textAlign="center" fontSize={20} mb={1}>
              ¡Mantente al día!
            </Text>
            <Text color="#9393AA" fontSize={16} mb={2}>
              Actualiza tus datos y personaliza tu experiencia en la App.
            </Text>
            <EditPerfilForm />
          </Stack>
        </ScrollView>
      </Card>
    </ImageBackground>
  );
};
