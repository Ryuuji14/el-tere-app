import { yupResolver } from "@hookform/resolvers/yup";
import {
  Badge,
  Button,
  FlatList,
  FormControl,
  HStack,
  Icon,
  Input,
  KeyboardAvoidingView,
  Select,
  Stack,
  Text,
  View,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useCustomToast from "../../../hooks/useCustomToast";
import useLoading from "../../../hooks/useLoading";
import { ICONS_PROPS } from "../../../themes/iconStyles";
import { INPUT_PROPS } from "../../../themes/inputStyles";
import {
  editPerfilDefaultValues,
  editPerfilSchema,
} from "../../../utils/formValidations/editPerfilValidation";
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import useAuthContext from "../../../hooks/useAuthContext";
import { userAPI } from "../../../api/userAPI";
import { userInterestAPI } from "../../../api/userInterest";
import { interestAPI } from "../../../api/interestAPI";

export const EditPerfilForm = ({ navigation }) => {
  // hooks
  const {
    state: { user },
  } = useAuthContext();
  const { showErrorToast, showSuccesToast } = useCustomToast();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const {
    control,
    handleSubmit,
    setValue,

    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(editPerfilSchema),
    defaultValues: editPerfilDefaultValues,
  });

  // state
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [interests, setInterests] = useState([]);
  const [userInterests, setUserInterests] = useState([]);

  useEffect(() => {
    if (user?.id) {
      const getUser = async () => {
        startLoading();
        try {
          const [userInfo, userInterest, interests] = await Promise.all([
            userAPI
              .getUser(user.id)
              .catch((err) => console.log(err?.response?.data)),
            userInterestAPI
              .getUserInterest(user.id)
              .catch((err) => console.log(err?.response?.data)),
            interestAPI.getInterest(),
          ]);

          if (userInfo?.data) {
            const {
              first_name,
              last_name,
              email,
              birthday,
              cellphone,
              gender,
            } = userInfo?.data;

            setValue("first_name", first_name);
            setValue("last_name", last_name);
            setValue("email", email);
            setValue("birthday", new Date(birthday));
            setValue("cellphone", cellphone);
            setValue("gender", gender.toUpperCase());
          }

          console.log(userInterest, user.id);

          if (userInterest?.data) {
            setUserInterests(userInterest?.data);
          }

          if (interests?.data?.items) {
            setInterests(interests?.data?.items);
          }
        } catch (error) {
          showErrorToast(error);
        }
        stopLoading();
      };
      getUser();
    }
  }, [user?.id]);

  const onChange = (_, selectedDate) => {
    setShowDatePicker(false);
    const currentDate = selectedDate || new Date();
    setValue("birthday", currentDate);
  };

  const onSubmit = async (values) => {
    startLoading();
    try {
      await userAPI.updateUser(user?.id, values);

      showSuccesToast("Edicion exitosa");
    } catch (error) {
      showErrorToast("Error al actualizar");
    }
    stopLoading();
  };

  const isInterestSelected = (interestId) => {
    return userInterests.some(
      (interest) => interest.id === interestId && interest.active === true
    );
  };

  const selectInterest = async (interestId) => {
    const findInterestIndex = userInterests.findIndex(
      (int) => int.id === interestId
    );
    if (findInterestIndex > -1) {
      try {
        const interest = userInterests[findInterestIndex];

        await userInterestAPI.updateUserInterestStatus(
          interest.id,
          !interest?.active
        );

        setUserInterests((prevState) =>
          prevState.map((int) =>
            int?.id === interestId ? { ...int, active: !int.active } : int
          )
        );
      } catch (error) {
        showErrorToast(error);
      }
    } else {
      try {
        const { data } = await userInterestAPI.addUserInterest(
          user?.id,
          interestId
        );
        const newUserInterests = [...userInterests, data];
        setUserInterests(newUserInterests);
      } catch (error) {
        console.log(error?.response?.data);
        showErrorToast(error);
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" enabled>
      <Stack space={4}>
        <HStack space={5} justifyContent="space-evenly">
          <Controller
            name="first_name"
            control={control}
            render={({
              field: { onChange, ...field },
              fieldState: { error },
            }) => (
              <Stack w="45%">
                <FormControl isInvalid={Boolean(error?.message)}>
                  <Input
                    {...field}
                    onChangeText={onChange}
                    placeholder="Nombre"
                    {...INPUT_PROPS}
                    InputLeftElement={
                      <Icon
                        as={FontAwesome}
                        name="user-circle"
                        {...ICONS_PROPS(Boolean(error?.message))}
                      />
                    }
                  />
                  <FormControl.ErrorMessage>
                    {error?.message}
                  </FormControl.ErrorMessage>
                </FormControl>
              </Stack>
            )}
          />

          <Controller
            name="last_name"
            control={control}
            render={({
              field: { onChange, ...field },
              fieldState: { error },
            }) => (
              <Stack w="45%">
                <FormControl isInvalid={Boolean(error?.message)}>
                  <Input
                    {...field}
                    onChangeText={onChange}
                    placeholder="Apellido"
                    {...INPUT_PROPS}
                    InputLeftElement={
                      <Icon
                        as={FontAwesome}
                        name="user-circle"
                        {...ICONS_PROPS(Boolean(error?.message))}
                      />
                    }
                  />
                  <FormControl.ErrorMessage>
                    {error?.message}
                  </FormControl.ErrorMessage>
                </FormControl>
              </Stack>
            )}
          />
        </HStack>

        <Controller
          name="email"
          control={control}
          render={({
            field: { onChange, ...field },
            fieldState: { error },
          }) => (
            <FormControl isInvalid={Boolean(error?.message)}>
              <Input
                {...field}
                onChangeText={onChange}
                placeholder="Correo Electrónico"
                {...INPUT_PROPS}
                InputLeftElement={
                  <Icon
                    as={MaterialIcons}
                    name="email"
                    {...ICONS_PROPS(Boolean(error?.message))}
                  />
                }
              />
              <FormControl.ErrorMessage>
                {error?.message}
              </FormControl.ErrorMessage>
            </FormControl>
          )}
        />
        <Controller
          name="cellphone"
          control={control}
          render={({
            field: { onChange, ...field },
            fieldState: { error },
          }) => (
            <FormControl isInvalid={Boolean(error?.message)}>
              <Input
                {...field}
                onChangeText={onChange}
                placeholder="Teléfono ( Ej: 0426-5555555)"
                {...INPUT_PROPS}
                InputLeftElement={
                  <Icon
                    as={FontAwesome}
                    name="user-circle"
                    {...ICONS_PROPS(Boolean(error?.message))}
                  />
                }
              />
              <FormControl.ErrorMessage>
                {error?.message}
              </FormControl.ErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          name="birthday"
          control={control}
          render={({ field: { value }, fieldState: { error } }) => (
            <>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setShowDatePicker(true)}
              >
                <Input
                  isReadOnly
                  value={value.toISOString().split("T")[0]}
                  {...INPUT_PROPS}
                  placeholder="Fecha de nacimiento"
                  InputLeftElement={
                    <Icon
                      as={MaterialCommunityIcons}
                      name="calendar"
                      {...ICONS_PROPS(Boolean(error?.message))}
                    />
                  }
                />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={value}
                  mode="date"
                  is24Hour={true}
                  onChange={onChange}
                />
              )}
            </>
          )}
        />

        <Controller
          name="gender"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <>
              <View
                w="100%"
                display="flex"
                flexDirection="row"
                borderWidth={1}
                borderColor="gray.300"
                rounded="3xl"
                alignItems="center"
                {...INPUT_PROPS}
              >
                <Icon
                  as={MaterialCommunityIcons}
                  name="human-handsdown"
                  {...ICONS_PROPS(Boolean(error?.message))}
                />
                <View width="90%">
                  <Select
                    placeholder="Genero"
                    borderWidth={0}
                    style={{
                      width: "100%",
                      flex: 1,
                    }}
                    position="relative"
                    selectedValue={value}
                    onValueChange={(itemValue) => onChange(itemValue)}
                  >
                    <Select.Item label="Femenino" value="F" />
                    <Select.Item label="Masculino" value="M" />
                  </Select>
                </View>
              </View>
            </>
          )}
        />

        <Button
          onPress={() => navigation?.navigate("YourDirections")}
          py={2}
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
          TUS DIRECCIONES
        </Button>
      </Stack>
      <Text color="#5A7E64" fontWeight="bold" mt={4} mb={2}>
        Intereses
      </Text>
      <Text color="#8898AA" fontWeight="bold" mb={2}>
        Elige las áreas que sean de tu interés:
      </Text>

      <FlatList
        mb={3}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={interests}
        keyExtractor={(item) => item?.id}
        ItemSeparatorComponent={() => <View w={2} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => selectInterest(item?.id)}
          >
            <Badge
              colorScheme="success"
              style={{
                borderRadius: 30,
                borderWidth: 1,
                borderColor: "#F96332",
                backgroundColor: isInterestSelected(item?.id)
                  ? "#F96332"
                  : "#fff",
              }}
            >
              <Text color={isInterestSelected(item?.id) ? "#fff" : "#9393AA"}>
                {item?.name}
              </Text>
            </Badge>
          </TouchableOpacity>
        )}
      />

      <Button
        isDisabled={isLoading || !isValid}
        onPress={handleSubmit(onSubmit)}
        isLoading={isLoading}
        py={1}
        mb={4}
        rounded="full"
        bgColor="#DB7F50"
        shadow="2"
        _text={{
          color: "#FFF",
          fontSize: 20,
        }}
      >
        EDITAR DATOS
      </Button>
      <Button
        onPress={() => console.log}
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
        CAMBIAR CONTRASEÑA
      </Button>
    </KeyboardAvoidingView>
  );
};
