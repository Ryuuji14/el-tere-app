import React, { useEffect, useState } from "react";
import { Button, Input, Modal } from "native-base";
import useLoading from "../../../hooks/useLoading";
import { userAddressAPI } from "../../../api/userAddress";
import userAuthContext from "../../../hooks/useAuthContext";
import useCustomToast from "../../../hooks/useCustomToast";

export const ModalDirectionForm = ({
  isOpen,
  onClose,
  addressInfo,
  afterSubmit,
}) => {
  const {
    state: { user },
  } = userAuthContext();
  const [address, setAddress] = useState("");
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { showErrorToast, showSuccesToast } = useCustomToast();

  const title = addressInfo ? "Editar dirección" : "Agregar dirección";
  const buttonText = addressInfo ? "Editar" : "Agregar";

  const onSubmit = async () => {
    startLoading();
    try {
      if (addressInfo) {
        // update address
      } else {
        // add address
        const { data } = await userAddressAPI.addUserAddress(user?.id, address);
        afterSubmit?.(data);
        showSuccesToast("¡Dirección agregada con exito!");
      }
      onClose();
    } catch (error) {
      showErrorToast("Error");
    }
    stopLoading();
  };

  useEffect(() => {
    if (addressInfo?.id) {
      setAddress(addressInfo.address);
    }
  }, [addressInfo]);

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
