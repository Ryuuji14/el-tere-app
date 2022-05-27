import { Box, VStack, Text, HStack, Image, AspectRatio } from "native-base";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const PromocionCard = ({
  image = "",
  name,
  description,
  id,
  price,
  discount,
}) => {
  const Navigation = useNavigation();

  const generateImage = () => {
    if (!image || !image.includes("https")) {
      return "https://via.placeholder.com/300.png?text=no+image";
    }
    return image;
  };

  const isPromo = discount > 0;

  return (
    <TouchableOpacity
      onPress={() =>
        Navigation.navigate("ConsultarPromocion", {
          name: name,
          image: image,
          price: price,
          id: id,
        })
      }
    >
      <Box
        width={220}
        maxW="80"
        rounded="lg"
        overflow="hidden"
        borderColor={isPromo ? "#DB7F50" : "#41634A"}
        borderWidth="1.5"
        shadow={2}
        bgColor="white"
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
      >
        <HStack space="2">
          <VStack w="100px" alignItems="center" justifyContent="center">
            <Text
              bold
              fontWeight="700"
              fontSize="lg"
              textAlign="center"
              color="#000"
              lineHeight={18}
            >
              {name}
            </Text>
            <Box px="2" height="50px">
              <Text
                color="#252020"
                maxWidth="100px"
                fontSize="10"
                textAlign="center"
                fontWeight="500"
              >
                {description}
              </Text>
            </Box>
          </VStack>
          <VStack w="120px" position="relative">
            <HStack
              bgColor="#FFFFFF"
              position="absolute"
              top={2}
              w="60px"
              right={5}
              zIndex={10}
              h="20px"
              borderRadius="lg"
            >
              <Image
                h={6}
                w={6}
                left={-10}
                bottom={0.5}
                source={require("../../../assets/LOGO-EL-TERE-2.png")}
                alt="pinche prop requirida"
              />
              <Text zIndex={10} right={2} bottom={0.5}>
                {isPromo ? "Promo" : "Evento"}
              </Text>
            </HStack>
            {/* 
            <Box
              position="absolute"
              h="full"
              w="full"
              bgColor="white"
              opacity={0.3}
              top={0}
              left={0}
              zIndex={1}
            ></Box> */}

            <AspectRatio ratio={1}>
              <Image
                opacity={0.7}
                source={{
                  uri: generateImage(),
                }}
                alt="pinche prop requirida"
              />
            </AspectRatio>
          </VStack>
        </HStack>
      </Box>
    </TouchableOpacity>
  );
};

export default PromocionCard;
