import { useState } from "react";
import {
  Box,
  VStack,
  Text,
  HStack,
  Icon,
  Image,
  AspectRatio
} from "native-base";

import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const ComercioCard = ({ image, name, type, rating }) => {

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
      my='2'
    >
      <VStack space="2" >
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: image
              }}
              alt={name}
            />
          </AspectRatio>
        </Box>
        <Box px="2">
          <Text bold>
            {name.length > 22 ? name.substring(0, 22 - 3)
              + '...' : name
            }
          </Text>
        </Box>
        <HStack justifyContent='space-between'>
          <Box px="2">
            <Text color='grey'>
              {type.length > 16 ? type.substring(0, 16 - 3)
                + '...' : type
              }
            </Text>
          </Box>
          <Box px="2" pb="2" mr='2'>
            <HStack alignItems='center' space={2}>
              <Icon as={FontAwesome} name="star" color='yellow.500' />
              <Text>
                {rating}
              </Text>
            </HStack>
          </Box>
        </HStack>
      </VStack>
    </Box>
  )
}


export default ComercioCard;
