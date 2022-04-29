import { Entypo, FontAwesome } from "@expo/vector-icons";
import {
  Box,
  VStack,
  Text,
  HStack,
  Icon,
  Image,
  Button,
  AspectRatio,
  Center,
  IconButton
} from "native-base";
import { TouchableOpacity } from "react-native";

const PromocionCard = (props) => {

  return (
    <TouchableOpacity>
      <Box
        width={175}
        maxW="80"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        shadow={2}
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700"
        }}
        _web={{
          shadow: 2,
          borderWidth: 0
        }}
        _light={{
          backgroundColor: "gray.50"
        }}
        my='2'
      >
        <VStack space="2" >
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                source={{
                  uri: props.image
                }}
                alt={props.name}
              />
            </AspectRatio>
          </Box>
          <Box px="2">
            <Text bold>
              {props.name.length > 22 ? props.name.substring(0, 22 - 3)
                + '...' : props.name
              }
            </Text>
          </Box>
          <HStack justifyContent='space-between' alignItems='center'>
            <Box px="2" pl='3'>
              <Text color='grey'>
                {props.price.length > 16 ? props.price.substring(0, 16 - 3)
                  + '...' : props.price
                }
              </Text>
            </Box>
            <Box pr='2' pb='2'>
              <IconButton
                icon={
                  <Icon
                    as={Entypo}
                    name='shopping-basket'
                    color='white'
                  />
                }
                size='sm'
                borderRadius='full'
                bgColor='#DB7F50'
                onPress={() => console.log(`Hola, soy el producto ${props.name}`)}
              />
            </Box>
          </HStack>
        </VStack>
      </Box>
    </TouchableOpacity>
  )
}


export default PromocionCard;
