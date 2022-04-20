import { Dimensions } from "react-native";
import { useToast, View } from "native-base";

const { width } = Dimensions.get("window");

const Toast = (id, text = "r") => (
  <View h={100} w={width} bottom={-50} backgroundColor="red.100">
    <Text>{text || ""}</Text>
  </View>
);

const useCustomToast = () => {
  const toast = useToast();

  const showSuccesToast = (text = "") => {
    toast.show({
      title: text,
    });
  };

  const showErrorToast = (text = "") => {
    toast.show({
      title: text,
    });
  };

  return {
    showSuccesToast,
    showErrorToast,
  };
};

export default useCustomToast;
