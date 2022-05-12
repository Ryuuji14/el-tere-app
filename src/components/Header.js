import { HStack, IconButton, Icon } from "native-base";
import React from "react";
import { Entypo } from "@expo/vector-icons";

export const Header = ({ navigation, ...props }) => {
  if (!navigation) return null;

  return (
    <HStack zIndex={100} {...props}>
      <IconButton
        onPress={() => navigation?.goBack()}
        icon={<Icon as={Entypo} name="chevron-left" size={12} color="white" />}
        size={10}

        // bgColor="black"
      />
    </HStack>
  );
};
