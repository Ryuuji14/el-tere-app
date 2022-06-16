import {
  Button,
  KeyboardAvoidingView,
  Stack,
  Input,
  Link,
  VStack,
  Divider,
  Text,
  ScrollView,
  
} from "native-base";
import { Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  loginDefaultValues,
  loginSchema,
} from "../../../utils/formValidations/loginFormValidation";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useCustomToast from "../../../hooks/useCustomToast";
import useLoading from "../../../hooks/useLoading";
import { authAPI } from "../../../api/authAPI";
import { ICONS_PROPS } from "../../../themes/iconStyles"
import { INPUT_PROPS } from "../../../themes/inputStyles"
import useAuthContext from "../../../hooks/useAuthContext";
import {RefreshControl} from "react-native";

const LoginForm = ({ navigation }) => {
  const { dispatch } = useAuthContext();
  const { showErrorToast } = useCustomToast();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const {
    control,
    handleSubmit,
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
      const data = await authAPI.login(values);

      const token = data?.data?.token;
      if (token) {
        await AsyncStorage.setItem("@token", token);
        dispatch({
          type: "LOGIN",
          payload: {
            token,
            user: {
              email: values.email,
              id: data?.data?.id,
            },
          },
        });
      }
      reset(loginDefaultValues);
    } catch (error) {
      showErrorToast("Datos Incorrectos");
      console.log(error);
    }
    stopLoading();
  };

  return (
    <KeyboardAvoidingView behavior="padding" enabled>
      <ScrollView
      showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
          />
        }>
        <Stack space={4}>
          <Controller
            name="email"
            control={control}
            render={({
              field: { onChange, ...field },
              fieldState: { error },
            }) => (
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
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({
              field: { onChange, ...field },
              fieldState: { error },
            }) => (
              <Input
                {...field}
                secureTextEntry
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
            )}
          />
        </Stack>
        <VStack alignItems="center" space={4} mt={4}>
          <Button
            disabled={!isValid || isLoading}
            isLoading={isLoading}
            onPress={handleSubmit(onSubmit)}
            width={240}
            rounded="full"
            padding={2}
            _text={{
              fontSize: 19,
              color: "#FFFFFF",
            }}
            backgroundColor="#DB7F50"
          >
            INICIAR SESIÓN
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

          <Link
            onPress={() => navigation?.navigate("RecoverPassword")}
            _text={{
              textDecoration: "none",
              color: "#DB7F50",
            }}
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginForm;
