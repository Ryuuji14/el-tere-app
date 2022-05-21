import {
  Box,
  VStack,
  Text,
  HStack,
  Image,
  AspectRatio,
} from "native-base";
import { useNavigation } from "@react-navigation/native";

import { TouchableOpacity } from "react-native";

const PromocionCard = ({ image, name, description }) => {

  const Navigation = useNavigation();

  return (
    <TouchableOpacity
    onPress={ () =>
      Navigation.navigate("ConsultarPromocion", {
     name: props.name,
     image: props.image,
     price: props.price,
     id: props.id,
      })
    }
    >
    <Box
      width={200}
      maxW="80"
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      shadow={2}
      bgColor='white'
      _web={{
        shadow: 2,
        borderWidth: 0
      }}
    >
      <HStack space="2">
        <VStack>
          <Box >
            <AspectRatio w="75" ratio={0.75}>
              <Image
                source={{
                  uri: image
                }}
                alt={name}
              />
            </AspectRatio>
          </Box>
        </VStack>
        <VStack w='125px'>
          <Box>
            <Text bold fontSize="sm" px="2" textAlign='center' maxWidth='115px'>
              {name}
            </Text>
          </Box>
          <Box px="2" height='50px'>
            <Text color='gray.500' maxWidth='100px' fontSize='10' textAlign='center'>
              {description}
            </Text>
          </Box>
        </VStack>


      </HStack>
    </Box>
    </TouchableOpacity>
  )
}


export default PromocionCard;
