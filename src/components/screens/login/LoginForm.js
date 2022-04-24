import { useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  Stack,
  Input,
  Link,
  VStack,
  Divider,
  Text,
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
  loginDefaultValues,
  loginSchema,
} from "../../../utils/formValidations/loginFormValidation";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useCustomToast from "../../../hooks/useCustomToast";
import useLoading from "../../../hooks/useLoading";
import { authAPI } from "../../../api/authAPI";

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

const LoginForm = () => {
  const { showErrorToast, showSuccesToast } = useCustomToast();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid },
    reset,
  } = useForm({
    mode: "onChange",

    resolver: yupResolver(loginSchema),
    defaultValues: loginDefaultValues,
  });

  const onSubmit = async (values) => {
    startLoading();
    try {
      console.log("submit", values);
      const data = await authAPI.login(values);
      showSuccesToast("Registro exitoso");
      reset(loginDefaultValues);
    } catch (error) {
      console.log(error?.response?.data);
      showErrorToast("Error al registrar");
    }
    stopLoading();
  };

  return (
    <KeyboardAvoidingView behavior="padding" enabled>
      <Stack space={4}>
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
      </Stack>
      <VStack alignItems="center" space={4} mt={4}>
        <Button
          width={240}
          rounded="full"
          padding={2}
          _text={{
            fontSize: 19,
            color: "#FFFFFF",
          }}
          backgroundColor="#DB7F50"
        >
          INICIAR SESION
        </Button>
        <Button
          width={240}
          rounded="full"
          _text={{
            fontSize: 19,
            color: "#DB7F50",
          }}
          backgroundColor="#FFFFFF"
          onPress={() => navigation?.navigate("Register")}
        >
          UNETE AL TERE
        </Button>
        
      <Link>¿Olvidaste tu contraseña?</Link>
        <Divider backgroundColor="rgba(219,127,80,0.5)" />
        <Text color="#8898AA" fontSize={16} alignSelf="center">
          ¿Primera vez usando la App?
        </Text>
        <Button
          width={240}
          rounded="full"
          _text={{
            fontSize: 14,
            color: "#DB7F50",
          }}
          backgroundColor="#FFFFFF"
        >
          ENTRA COMO INVITADO/A
        </Button>
      </VStack>
    </KeyboardAvoidingView>
  );
};

export default LoginForm;
