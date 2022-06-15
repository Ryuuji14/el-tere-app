import { useState } from "react";
import {
  Badge,
  Button,
  Checkbox,
  FlatList,
  FormControl,
  HStack,
  Input,
  KeyboardAvoidingView,
  Select,
  Stack,
  Text,
  View,
} from "native-base";
import { Icon } from "native-base";
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native";
import {
  registerDefaultValues,
  registerSchema,
} from "../../../utils/formValidations/registerFormValidation";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useCustomToast from "../../../hooks/useCustomToast";
import useLoading from "../../../hooks/useLoading";
import { authAPI } from "../../../api/authAPI";
import { addressAPI } from "../../../api/addressAPI";
import { ICONS_PROPS } from "../../../themes/iconStyles";
import { INPUT_PROPS } from "../../../themes/inputStyles";
import { useEffect } from "react";
import { interestAPI } from "../../../api/interestAPI";

const RegisterForm = () => {
  const { showErrorToast, showSuccesToast } = useCustomToast();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const {
    control,
    handleSubmit,
    setValue,

    formState: { isValid, errors },
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(registerSchema),
    defaultValues: registerDefaultValues,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [interestsToSelect, setInterestsToSelect] = useState([]);

  useEffect(() => {
    const getInterests = async () => {
      try {
        const { data } = await interestAPI.getInterest();

        setInterestsToSelect(data?.items || []);
      } catch (error) {
        showErrorToast(error);
      }
    };

    getInterests();
  }, []);

  const onChange = (_, selectedDate) => {
    setShowDatePicker(false);
    const currentDate = selectedDate || new Date();
    setValue("birthday", currentDate);
  };

  const onSubmit = async (values) => {
    startLoading();
    try {
      const { data } = await authAPI.register(values);

      await addressAPI.registerUserAddress({
        user_id: data.id,
        address: values.address,
      });

      showSuccesToast("Registro exitoso");
      reset(registerDefaultValues);
      setValue("acceptTermsAndConditions", false);
      setValue("userInterests", []);
    } catch (error) {
      showErrorToast(error);
    }
    stopLoading();
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
          name="password"
          control={control}
          render={({
            field: { onChange, ...field },
            fieldState: { error },
          }) => (
            <FormControl isInvalid={Boolean(error?.message)}>
              <Input
                secureTextEntry
                {...field}
                onChangeText={onChange}
                placeholder="Contraseña"
                {...INPUT_PROPS}
                InputLeftElement={
                  <Icon
                    as={MaterialIcons}
                    name="lock"
                    {...ICONS_PROPS(Boolean(error?.message))}
                  />
                }
              />
              <FormControl.HelperText>
                La contraseña debe contener: mayúscula, minúscula, mínimo 8
                dígitos, números y un símbolo especial.
              </FormControl.HelperText>
              <FormControl.ErrorMessage>
                {error?.message}
              </FormControl.ErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          name="password_confirmation"
          control={control}
          render={({
            field: { onChange, ...field },
            fieldState: { error },
          }) => (
            <FormControl isInvalid={Boolean(error?.message)}>
              <Input
                secureTextEntry
                {...field}
                onChangeText={onChange}
                placeholder="Repite tu contraseña"
                {...INPUT_PROPS}
                InputLeftElement={
                  <Icon
                    as={MaterialIcons}
                    name="lock"
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
                    placeholder="Género"
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

        <Controller
          name="address"
          control={control}
          render={({
            field: { onChange, ...field },
            fieldState: { error },
          }) => (
            <FormControl isInvalid={Boolean(error?.message)}>
              <Input
                {...field}
                onChangeText={onChange}
                placeholder="Dirección de habitación"
                {...INPUT_PROPS}
                InputLeftElement={
                  <Icon
                    as={MaterialIcons}
                    name="location-on"
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
      </Stack>

      <Text color="#5A7E64" fontWeight="bold" mt={4} mb={2}>
        Intereses
      </Text>
      <Text color="#8898AA" fontWeight="bold" mb={2}>
        Elige las áreas que sean de tu interés:
      </Text>

      <Controller
        name="userInterests"
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={interestsToSelect}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View w={2} />}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  const newValue = [...value];
                  if (newValue.includes(item.id)) {
                    newValue.splice(newValue.indexOf(item.id), 1);
                  } else {
                    newValue.push(item.id);
                  }
                  onChange(newValue);
                  onBlur();
                }}
              >
                <Badge
                  colorScheme="success"
                  style={{
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: "#F96332",
                    backgroundColor: value.includes(item.id)
                      ? "#F96332"
                      : "#fff",
                  }}
                >
                  <Text color={value.includes(item.id) ? "#fff" : "#9393AA"}>
                    {item.name}
                  </Text>
                </Badge>
              </TouchableOpacity>
            )}
          />
        )}
      />

      <Controller
        name="acceptTermsAndConditions"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <HStack space={2} alignItems="center" my={4}>
            <Checkbox
              accessibilityLabel="check"
              defaultIsChecked={value}
              isChecked={value}
              onChange={(val) => {
                onChange(val);
                onBlur();
              }}
            />
            <HStack>
              <Text>Acepto los </Text>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  // TODO: open privacy policy
                }}
              >
                <Text color="#5A7E64" fontWeight="bold">
                  términos y condiciones
                </Text>
              </TouchableOpacity>
            </HStack>
          </HStack>
        )}
      />

      <Button
        isLoading={isLoading}
        rounded="full"
        _text={{
          fontSize: 14,
          fontWeight: "bold",
        }}
        disabled={!isValid || isLoading}
        backgroundColor={isValid ? "#DB7F50" : "#D8D8D8"}
        onPress={handleSubmit(onSubmit)}
      >
        QUIERO UNIRME
      </Button>
    </KeyboardAvoidingView>
  );
};

export default RegisterForm;
