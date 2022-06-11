import {
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  MODIFY_PRODUCT_QUANTITY,
} from "../constants";

export const addToCart = (payload) => {
  return {
    type: ADD_TO_CART,
    payload,
  };
};

export const addMultipleProducts = (payload) => {
  return {
    type: ADD_MULTIPLE_TO_CART,
    payload,
  };
};

export const modifyProductQuantity = (payload) => {
  return {
    type: MODIFY_PRODUCT_QUANTITY,
    payload,
  };
};

export const removeFromCart = (payload) => {
  return {
    type: REMOVE_FROM_CART,
    payload,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};
