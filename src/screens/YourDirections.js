import React, { useEffect, useState } from "react";
import { ImageBackground, Dimensions, TouchableOpacity } from "react-native";
import {
  Card,
  Text,
  ScrollView,
  HStack,
  Input,
  Icon,
  Button,
  IconButton,
  Stack,
} from "native-base";
import { ModalDirectionForm } from "../components/screens/yourDirections/ModalDirectionForm";
import useCustomToast from "../hooks/useCustomToast";
import useLoading from "../hooks/useLoading";
import useAuthContext from "../hooks/useAuthContext";
import { userAddressAPI } from "../api/userAddress";
import { Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

export const YourDirections = () => {
  // hooks
  const {
    state: { user },
  } = useAuthContext();
  const { showErrorToast, showSuccesToast } = useCustomToast();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [directions, setDirections] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    if (user?.id) {
      const getUserDirections = async () => {
        try {
          const { data } = await userAddressAPI.getUserAddress();
          console.log(data);
        } catch (error) {
          // showErrorToast(error);
        }
      };
      getUserDirections();
    }
  }, [user?.id]);

  const handleClose = () => {
    setIsOpenModal(false);
    setSelectedAddress(null);
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    setIsOpenModal(true);
  };

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
        <ScrollView
          pt={4}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 30,
            paddingHorizontal: 35,
          }}
        >
          <Text color="#9393AA" fontSize={16} mb={2}>
            Gestiona tus direcciones y elige la dirección que prefiera en caso
            de utilizar un servicio de delivery.
          </Text>
          <Text color="#5A7E64" fontSize={16} mb={3}>
            Tus Direcciones:
          </Text>
          <Stack space={5} mb={7}>
            {[1, 2].map((dir) => (
              <HStack justifyContent="space-between">
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPressIn={() => setIsOpenModal(true)}
                  style={{
                    width: "80%",
                  }}
                >
                  <Input
                    rounded="full"
                    borderColor="#DB7F50"
                    bgColor="#fff"
                    isReadOnly
                  />
                </TouchableOpacity>
                <IconButton
                  bgColor="#D87949"
                  rounded="xl"
                  _icon={{
                    as: Feather,
                    name: "trash",
                    color: "#fff",
                  }}
                />
              </HStack>
            ))}
          </Stack>
          <Button
            onPress={() => setIsOpenModal(true)}
            py={1}
            variant="outline"
            rounded="full"
            borderColor="#DB7F50"
            bgColor="#fff"
            shadow="2"
            _text={{
              color: "#DB7F50",
              fontSize: 20,
            }}
          >
            AGREGAR DIRECCIÓN
          </Button>
        </ScrollView>
      </Card>
      <ModalDirectionForm
        isOpen={isOpenModal}
        onClose={handleClose}
        addressInfo={selectedAddress}
      />
    </ImageBackground>
  );
};
