import {
  Button,
  Stack,
  Input,
  FormControl,
  VStack,
} from "native-base";
import { Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import {
  passwordSchema,
  passwordDefaultValues,
} from "../../../utils/formValidations/changePasswordFormValidation"
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useCustomToast from "../../../hooks/useCustomToast";
import useLoading from "../../../hooks/useLoading";
import useAuthContext from "../../../hooks/useAuthContext";
import { ICONS_PROPS } from "../../../themes/iconStyles"
import { INPUT_PROPS } from "../../../themes/inputStyles"
import { userAPI } from "../../../api/userAPI";

const ChangePasswordForm = ({ navigation }) => {
  const { showErrorToast, showSuccesToast } = useCustomToast();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(passwordSchema),
    defaultValues: passwordDefaultValues,
  });

  const {
    state: { user },
  } = useAuthContext();

  const onSubmit = async (values) => {
    startLoading();
    try {
      const data = await userAPI.changeOldPassword(user.id, {
        old_password: values.current_password,
        new_password: values.password,
        confirm_password: values.password_confirmation,
      });
      showSuccesToast("Contraseña cambiada correctamente");
      reset(passwordDefaultValues);
      navigation?.goBack();
    } catch (error) {
      console.log(error?.response?.data);
      showErrorToast("Error al cambiar contraseña");
    }
    stopLoading();
  };
  console.log(errors);

  return (
    <>
      <Stack space={3}>
        <Controller
          name="current_password"
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
                placeholder="Tu Contraseña anterior"
                {...INPUT_PROPS}
                InputLeftElement={
                  <Icon
                    as={MaterialIcons}
                    name="lock"
                    {...ICONS_PROPS(Boolean(error?.message))}
                  />
                }
              />
              <FormControl.ErrorMessage ml={4}>
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
                placeholder="Tu nueva Contraseña"
                {...INPUT_PROPS}
                InputLeftElement={
                  <Icon
                    as={MaterialIcons}
                    name="lock"
                    {...ICONS_PROPS(Boolean(error?.message))}
                  />
                }
              />
              <FormControl.ErrorMessage ml={4}>
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
                placeholder="Repite tu Contraseña"
                {...INPUT_PROPS}
                InputLeftElement={
                  <Icon
                    as={MaterialIcons}
                    name="lock"
                    {...ICONS_PROPS(Boolean(error?.message))}
                  />
                }
              />
              <FormControl.HelperText ml={4} mr={4}>
                La contraseña debe contener: mayúscula, minúscula, mínimo 8
                dígitos, números y un símbolo especial.
              </FormControl.HelperText>
              <FormControl.ErrorMessage ml={4}>
                {error?.message}
              </FormControl.ErrorMessage>
            </FormControl>
          )}
        />

      </Stack>
      <VStack alignItems="center" space={4} mt={4}>
        <Button
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || isLoading}
          isLoading={isLoading}
          width={240}
          rounded="full"
          padding={2}
          _text={{
            fontSize: 19,
            color: "#FFFFFF",
          }}
          backgroundColor="#DB7F50"
        >
          CAMBIAR CONTRASEÑA
        </Button>
      </VStack>
    </>
  );
};

export default ChangePasswordForm;
