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
  
  const EventoCard = ({ image, name, description }) => {
  
    return (
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
    )
  }
  
  
  export default EventoCard;
  