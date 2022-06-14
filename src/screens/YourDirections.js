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
  Heading,
  View,
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
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [directions, setDirections] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { showErrorToast, showSuccesToast } = useCustomToast();

  useEffect(() => {
    if (user?.id) {
      const getUserDirections = async () => {
        startLoading();
        try {
          const { data } = await userAddressAPI.getUserAddress(user.id);
          setDirections(data);
        } catch (error) {
          showErrorToast(error);
        }
        stopLoading();
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

  const afterSubmit = (newAddress) => {
    if (selectedAddress) {
      setDirections((prevDirections) =>
        prevDirections.map((direction) =>
          direction.id === selectedAddress.id ? newAddress : direction
        )
      );
    } else {
      setDirections([...directions, newAddress]);
    }
    handleClose();
  };

  const deleteAddress = async (addressId) => {
    startLoading();
    try {
      await userAddressAPI.deleteUserAddress(addressId);
      setDirections(directions.filter((address) => address.id !== addressId));
      showSuccesToast("Dirección eliminada con exito");
      handleClose();
    } catch (error) {
      showErrorToast(error);
    }
    stopLoading();
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
      <Heading color="white" fontSize={36} fontWeight="bold" >
        Tus{'\n'} Direcciones
      </Heading>
      <View height="100%">
        <Card
          rounded="3xl"
          shadow="0"
          bgColor="#F4F5F7"
          overflow="visible"
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
              {directions.map((dir, index) => (
                <HStack justifyContent="space-between" key={index.toString()}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPressIn={() => handleSelectAddress(dir)}
                    style={{
                      width: "80%",
                    }}
                  >
                    <Input
                      rounded="full"
                      borderColor="#DB7F50"
                      bgColor="#fff"
                      isReadOnly
                      value={dir?.address}
                    />
                  </TouchableOpacity>
                  <IconButton
                    onPress={() => deleteAddress(dir.id)}
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
              isLoading={isLoading}
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
      </View>
      <ModalDirectionForm
        isOpen={isOpenModal}
        onClose={handleClose}
        addressInfo={selectedAddress}
        afterSubmit={afterSubmit}
      />
    </ImageBackground>
  );
};
