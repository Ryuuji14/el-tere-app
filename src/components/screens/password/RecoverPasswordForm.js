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
import {
  passwordDefaultValues,
  passwordSchema,
} from "../../../utils/formValidations/passwordFormValidation";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useCustomToast from "../../../hooks/useCustomToast";
import useLoading from "../../../hooks/useLoading";
import { authAPI } from "../../../api/authAPI";
import { ICONS_PROPS } from "../../../themes/iconStyles"
import { INPUT_PROPS } from "../../../themes/inputStyles"

const RecoverPasswordForm = ({ navigation }) => {
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
          ENVIAR CORREO
        </Button>
      </VStack>
    </KeyboardAvoidingView>
  );
};

export default RecoverPasswordForm;
