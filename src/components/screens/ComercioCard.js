
import {
  Box,
  VStack,
  Text,
  HStack,
  Icon,
  Image,
  AspectRatio,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  FontAwesome,
} from "@expo/vector-icons";

const ComercioCard = (props) => {
  const Navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity="0"
      style={{
        width: 175,
      }}
      onPress={() =>
        Navigation.navigate("Comercio", {
          id: props.id,
          image: props.image,
          name: props.name,
          type: props.type,
          rating: props.rating,
          horaApertura: props.horaApertura,
          horaCierre: props.horaCierre,
          delivery: props.delivery,
        })
      }
    >
      <Box
        mr={2}
        width={175}
        maxW="80"
        rounded="lg"
        overflow="hidden"
        borderColor="#5A7E64"
        borderWidth="1"
        shadow={2}
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
        my="2"
      >
        <VStack space="2">
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                source={{
                  uri: props.image,
                }}
                alt={props.name}
              />
            </AspectRatio>
          </Box>
          <Box px="2">
            <Text bold>
              {props.name.length > 22
                ? props.name.substring(0, 22 - 3) + "..."
                : props.name}
            </Text>
          </Box>
          <HStack justifyContent="space-between">
            <Box px="2">
              <Text color="grey">
                {props.horaApertura.split("",5)} am-{props.horaCierre.split("",5)} pm
              </Text>
            </Box>
            <Box px="2" pb="2" >
              <HStack alignItems="center" space={1}>
                <Icon as={FontAwesome} name="star" color="yellow.500" />
                <Text>{props.rating}</Text>
              </HStack>
            </Box>
          </HStack>
        </VStack>
      </Box>
    </TouchableOpacity>
  );
};

export default ComercioCard;
