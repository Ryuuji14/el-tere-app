import {
  Button,
  Heading,
  HStack,
  ScrollView,
  Stack,
  Text,
  View,
  VStack,
  FlatList,
} from "native-base";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Dimensions,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import useLoading from "../hooks/useLoading";
import useAuthContext from "../hooks/useAuthContext";
import useCustomToast from "../hooks/useCustomToast";
import { userAPI } from "../api/userAPI";
import { notificationAPI } from "../api/notificationAPI";
import NotificationCard from "../components/screens/NotificationCard";
import { connect } from "react-redux";
import { setReadNotifications } from "../Redux/Actions/notificationActions";
import Comment from "../components/screens/Comment";

const { width, height } = Dimensions.get("screen");

const Comentarios = () => {
  const {
    dispatch,
    state: { user },
  } = useAuthContext();

  const { isLoading, startLoading, stopLoading } = useLoading();
  const { showErrorToast, showSuccesToast } = useCustomToast();
  const [comentarios, setComentarios] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  const getComentarios = async () => {
    startLoading();
    try {
      const [{ data: comentarios }, { data: userInfo }] = await Promise.all([
        userAPI.getUserComments(user.id),
        userAPI.getUser(user.id),
      ]);
      setUserInfo({
        ...userInfo,
      });

      setComentarios(comentarios);
      console.log(comentarios)
    } catch (error) {
      console.log(error)
    }
    stopLoading();
  }
  useEffect(() => {
    getComentarios();
  }
    , [])
  return (
    <>
      <ImageBackground
        source={require("../../assets/register-bg.png")}
        style={{ width, height, zIndex: 1, paddingHorizontal: 30, flex: 1 }}
      >
        <Heading color="white" fontSize={36} fontWeight="bold">
          Tus {"\n"} Comentarios
        </Heading>
        <View
          width="100%"
          height="100%"
          bgColor="white"
          borderRadius={10}
          alignItems="center"
          paddingBottom="30%"
          justifyContent={comentarios?.items?.length > 0 ? 'flex-start' : 'center'}
        >

          <VStack space={2} py={2} ml="4" width="80%" >
            <FlatList
              showsVerticalScrollIndicator={false}
              data={comentarios.items || []}
              renderItem={({ item: comment, index }) => (
                <>
                  <Text
                    textAlign="center"
                    color="#6E6E7A"
                    fontSize="14"
                  >
                    <Text bold>Comercio: </Text>
                    {comment.company.name}
                  </Text>
                  <Comment
                    key={index.toString()}
                    firstName={userInfo?.first_name}
                    lastName={userInfo?.last_name}
                    rating={comment?.rating}
                    date={comment?.createdAt}
                    description={comment?.description}
                  />
                </>
              )}
              keyExtractor={(comment) => comment?.id}
              ListEmptyComponent={() => (
                <View justifyContent='center' >
                  <Text
                    fontSize="16"
                    alignContent="center"
                    alignSelf="center"
                    textAlign="center"
                    justifyContent="center"
                  >
                    No tienes comentarios {"\n"}en ningún comercio
                  </Text>
                </View>
              )}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={getComentarios}
                />
              }
            />
          </VStack>
        </View>
      </ImageBackground>
    </>
  );
}

export default Comentarios;