import { useState } from "react";
import {
  Badge,
  Button,
  KeyboardAvoidingView,
  Stack,
  Input,
  HStack,
  Select,
  Text,
  View,
  Checkbox,
  FlatList,
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

const ICONS_PROPS = {
  size: 5,
  color: "black",
  ml: 3,
};

const INPUT_PROPS = {
  borderColor: "#F96332",
  bgColor: "#fff",
  placeholderTextColor: "#9393AA",
  fontSize: "md",
  variant: "rounded",
};

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm({
    mode: "onChange",

    resolver: yupResolver(registerSchema),
    defaultValues: registerDefaultValues,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (_, selectedDate) => {
    setShowDatePicker(false);
    const currentDate = selectedDate || new Date();
    setValue("birthday", currentDate);
  };

  const onSubmit = (data) => {
    try {
      console.log("submit", data);
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" enabled>
      <Stack space={4}>
        <HStack space={5} justifyContent="space-evenly">
          <Controller
            name="first_name"
            control={control}
            render={({ field: { onChange, ...field } }) => (
              <Input
                {...field}
                onChangeText={onChange}
                placeholder="Nombre"
                w="45%"
                {...INPUT_PROPS}
                InputLeftElement={
                  <Icon as={FontAwesome} name="user-circle" {...ICONS_PROPS} />
                }
              />
            )}
          />

          <Controller
            name="last_name"
            control={control}
            render={({ field: { onChange, ...field } }) => (
              <Input
                {...field}
                onChangeText={onChange}
                placeholder="Apellido"
                w="45%"
                {...INPUT_PROPS}
                InputLeftElement={
                  <Icon as={FontAwesome} name="user-circle" {...ICONS_PROPS} />
                }
              />
            )}
          />
        </HStack>

        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, ...field } }) => (
            <Input
              {...field}
              onChangeText={onChange}
              placeholder="Correo Electrónico"
              {...INPUT_PROPS}
              InputLeftElement={
                <Icon as={MaterialIcons} name="email" {...ICONS_PROPS} />
              }
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, ...field } }) => (
            <Input
              {...field}
              onChangeText={onChange}
              placeholder="Contraseña"
              {...INPUT_PROPS}
              InputLeftElement={
                <Icon as={MaterialIcons} name="lock" {...ICONS_PROPS} />
              }
            />
          )}
        />

        <Controller
          name="password_confirmation"
          control={control}
          render={({ field: { onChange, ...field } }) => (
            <Input
              {...field}
              onChangeText={onChange}
              placeholder="Repite tu contraseña"
              {...INPUT_PROPS}
              InputLeftElement={
                <Icon as={MaterialIcons} name="lock" {...ICONS_PROPS} />
              }
            />
          )}
        />

        <Controller
          name="cellphone"
          control={control}
          render={({ field: { onChange, ...field } }) => (
            <Input
              {...field}
              onChangeText={onChange}
              placeholder="Teléfono ( Ej: 0426-5555555)"
              {...INPUT_PROPS}
              InputLeftElement={
                <Icon as={FontAwesome} name="user-circle" {...ICONS_PROPS} />
              }
            />
          )}
        />

        <Controller
          name="birthday"
          control={control}
          render={({ field: { value } }) => (
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
                      {...ICONS_PROPS}
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
          render={({ field: { value, onChange } }) => (
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
                  {...ICONS_PROPS}
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

        <Input
          variant="rounded"
          placeholder="Dirección de habitación"
          {...INPUT_PROPS}
          InputLeftElement={
            <Icon as={MaterialIcons} name="location-on" {...ICONS_PROPS} />
          }
        />
      </Stack>

      <Text color="#5A7E64" fontWeight="bold" mt={4} mb={2}>
        Intereses
      </Text>
      <Text color="#8898AA" fontWeight="bold" mb={2}>
        Elige las áreas que sean de tu interés:
      </Text>

      <Controller
        name="interests"
        control={control}
        render={({ field: { value, onChange } }) => (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={["Deportes", "Salud y Bienestar", "Viajes", "Parrilladas"]}
            keyExtractor={(item) => item}
            ItemSeparatorComponent={() => <View w={2} />}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  const newValue = [...value];
                  if (newValue.includes(item)) {
                    newValue.splice(newValue.indexOf(item), 1);
                  } else {
                    newValue.push(item);
                  }
                  onChange(newValue);
                }}
              >
                <Badge
                  colorScheme="success"
                  style={{
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: "#F96332",
                    backgroundColor: value.includes(item) ? "#F96332" : "#fff",
                  }}
                >
                  <Text color={value.includes(item) ? "#fff" : "#9393AA"}>
                    {item}
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
        render={({ field: { onChange, value } }) => (
          <HStack space={2} alignItems="center" my={4}>
            <Checkbox
              accessibilityLabel="check"
              defaultIsChecked={value}
              isChecked={value}
              onChange={(val) => onChange(val)}
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
        rounded="full"
        _text={{
          fontSize: 14,
          fontWeight: "bold",
        }}
        disabled={!isValid}
        backgroundColor={isValid ? "#DB7F50" : "#D8D8D8"}
        onPress={handleSubmit(onSubmit)}
      >
        QUIERO UNIRME
      </Button>
    </KeyboardAvoidingView>
  );
};

export default RegisterForm;
