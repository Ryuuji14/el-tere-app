import { useState } from "react";
import {
  Badge,
  Button,
  KeyboardAvoidingView,
  Stack,
  Input,
  FormControl,
  HStack,
  Select,
  Text,
  View,
  Checkbox,
  FlatList,
  VStack,
} from "native-base";
import { Icon } from "native-base";
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native";
/*import {
  newpasswordDefaultValues,
  newpasswordSchema,
} from "../../../utils/formValidations/newpasswordFormValidation";*/
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useCustomToast from "../../../hooks/useCustomToast";
import useLoading from "../../../hooks/useLoading";
import { authAPI } from "../../../api/authAPI";
import { ICONS_PROPS } from "../../../themes/iconStyles"
import { INPUT_PROPS } from "../../../themes/inputStyles"

const NewPasswordForm = ({ navigation }) => {
  const { showErrorToast, showSuccesToast } = useCustomToast();
  const { isLoading, startLoading, stopLoading } = useLoading();

 const {
    control,
    handleSubmit,

    formState: { isValid, errors },
    reset,
  } = useForm({
    mode: "onChange",

   // resolver: yupResolver(newpasswordSchema),
  //  defaultValues: newpasswordDefaultValues,
  });

  const onSubmit = async (values) => {
    startLoading();
    try {
      const data = await authAPI.requestPasswordReset(values);
      reset(passwordDefaultValues);
      showSuccesToast("Se envió un correo para recuperar su contraseña");
      navigation?.goBack();
    } catch (error) {
      console.log(error?.response?.data);
      showErrorToast("Error al registrar");
    }
    stopLoading();
  };
  console.log(errors);

  return (
    <KeyboardAvoidingView enabled>
      <Stack space={4}>
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
                dígitos, números y un símbolo especial
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
    </KeyboardAvoidingView>
  );
};

export default NewPasswordForm;
