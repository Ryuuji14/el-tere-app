import {
  Box,
  VStack,
  Text,
  HStack,
  Icon,
  Image,
  AspectRatio,
  Center
} from "native-base";

import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const PromocionCard = ({ image, name, description }) => {

  return (
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
        <VStack>
          <Box>
            <Text bold fontSize="sm" mr="12" px="2" textAlign='center'>
              {name}
            </Text>
          </Box>
          <Box px="2" height='50px'>
            <Text color='gray.500' maxWidth='75px' fontSize='10' textAlign='center'>
              {description}
            </Text>
          </Box>
        </VStack>


      </HStack>
    </Box>
  )
}


export default PromocionCard;
