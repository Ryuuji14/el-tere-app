import { Modal, Text } from "native-base";
import { useState, useEffect } from "react";

export const useVerifyProductByCompanyId = (companyId = "", cartItems = []) => {
  /*
   * Se puede agregar el producto al carrito de compras
   * Solo si en el carrito no hay otro producto que tenga otro company_id
   */

  const [canAddProduct, setCanAddProduct] = useState(false);
  const [alertDialogIsOpen, setShowAlertDialog] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0) {
      setCanAddProduct(true);
    }

    if (cartItems.length > 0 && companyId) {
      const isAnotherCompanyInCart = cartItems.findIndex(
        (item) => item.product.company_id === companyId
      );

      const candAddProduct = isAnotherCompanyInCart !== -1;

      setCanAddProduct(candAddProduct);
    }
  }, [companyId, cartItems]);

  const showAlertDialog = () => setShowAlertDialog(true);

  const AlertDialog = () => {
    return (
      <Modal
        isOpen={alertDialogIsOpen}
        onClose={() => setShowAlertDialog(false)}
      >
        <Modal.Content maxWidth="400px" py={4}>
          <Modal.CloseButton
            bgColor="#DB7F50"
            color="#fff"
            _icon={{
              color: "#fff",
            }}
          />
          <Modal.Header borderBottomWidth={0}></Modal.Header>

          <Modal.Body>
            <Text
              textAlign="center"
              color="#41634A"
              fontSize={30}
              fontWeight={700}
              lineHeight="xs"
              mb={5}
              mt={4}
            >
              Procesa tu pedido primero
            </Text>

            <Text
              textAlign="center"
              color="#9393AA"
              fontWeight={400}
              fontSize={16}
            >
              Para poder agregar este producto a tu carrito, debes completar tu
              pedido en curso con los productos que ya has agregado al carrito
              debido a que son distintos comercios.
            </Text>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    );
  };

  return {
    canAddProduct,
    showAlertDialog,
    AlertDialog,
  };
};
