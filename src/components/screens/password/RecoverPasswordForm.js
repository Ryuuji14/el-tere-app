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

const RecoverPasswordForm = () => {
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

    resolver: yupResolver(passwordSchema),
    defaultValues: passwordDefaultValues,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (_, selectedDate) => {
    setShowDatePicker(false);
    const currentDate = selectedDate || new Date();
    setValue("birthday", currentDate);
  };

  const onSubmit = async (values) => {
    startLoading();
    try {
      console.log("submit", values);
      const data = await authAPI.password(values);
      showSuccesToast("Registro exitoso");
      reset(passwordDefaultValues);
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
          ENVIAR CORREO
        </Button>
      </VStack>
    </KeyboardAvoidingView>
  );
};

export default RecoverPasswordForm;
