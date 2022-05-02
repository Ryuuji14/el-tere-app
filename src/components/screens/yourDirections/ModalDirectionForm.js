import React, { useState } from "react";
import { Button, Input, Modal } from "native-base";
import useLoading from "../../../hooks/useLoading";

export const ModalDirectionForm = ({ isOpen, onClose, addressInfo }) => {
  const [address, setAddress] = useState("");
  const { isLoading, startLoading, stopLoading } = useLoading();

  const title = addressInfo ? "Editar dirección" : "Agregar dirección";
  const buttonText = addressInfo ? "Editar" : "Agregar";

  const onSubmit = () => {
    startLoading();
    try {
      console.log(address);
      if (addressInfo) {
        // update address
      } else {
        // add address
      }
      onClose();
    } catch (error) {
      console.log(error);
    }
    stopLoading();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />

        <Modal.Header borderBottomWidth={0}>{title}</Modal.Header>
        <Modal.Body>
          <Input
            borderColor="#DB7F50"
            onChangeText={setAddress}
            multiline
            numberOfLines={5}
            value={address}
          />
        </Modal.Body>
        <Modal.Footer borderTopWidth={0}>
          <Button
            isDisabled={isLoading || address.trim().length === 0}
            onPress={onSubmit}
            w="full"
            py={1}
            rounded="full"
            bgColor="#DB7F50"
            shadow="2"
            _text={{
              color: "#FFF",
              fontSize: 20,
            }}
          >
            {buttonText}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
